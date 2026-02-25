import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Order "mo:core/Order";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Submission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  public type Filter = {
    searchTerm : ?Text;
    sortBy : ?SortBy;
  };

  public type SortBy = {
    #timestampAsc;
    #timestampDesc;
    #nameAsc;
    #nameDesc;
  };

  public type UserProfile = {
    name : Text;
  };

  var nextId = 0;
  let submissions = List.empty<Submission>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Contact form submission - publicly accessible (no auth required)
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : Submission = {
      id = nextId;
      name;
      email;
      message;
      timestamp = Time.now();
    };

    submissions.add(submission);
    nextId += 1;
  };

  // Admin-only: View all submissions with filtering
  public query ({ caller }) func getAllSubmissions(filter : ?Filter) : async [Submission] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can view submissions");
    };

    let filtered = submissions.filter(func(submission : Submission) : Bool { matchesFilter(submission, filter) });
    let sorted = filtered.toArray().sort(
      func(a, b) {
        compareSubmissions(a, b, filter);
      }
    );

    sorted;
  };

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Helper functions
  func matchesFilter(submission : Submission, filter : ?Filter) : Bool {
    switch (filter) {
      case (null) { true };
      case (?f) {
        switch (f.searchTerm) {
          case (null) { true };
          case (?term) {
            submission.name.contains(#text term) or
            submission.email.contains(#text term) or
            submission.message.contains(#text term);
          };
        };
      };
    };
  };

  // Returns Order for sorting
  func compareSubmissions(a : Submission, b : Submission, filter : ?Filter) : Order.Order {
    switch (filter) {
      case (null) { compareTimestamps(b.timestamp, a.timestamp) };
      case (?f) {
        switch (f.sortBy) {
          case (null) { compareTimestamps(b.timestamp, a.timestamp) };
          case (?(#timestampAsc)) { compareTimestamps(a.timestamp, b.timestamp) };
          case (?(#timestampDesc)) { compareTimestamps(b.timestamp, a.timestamp) };
          case (?(#nameAsc)) { a.name.compare(b.name) };
          case (?(#nameDesc)) { b.name.compare(a.name) };
        };
      };
    };
  };

  // Compare helper for timestamps using core.Order
  func compareTimestamps(a : Int, b : Int) : Order.Order {
    if (a < b) { #less } else if (a > b) { #greater } else { #equal };
  };
};
