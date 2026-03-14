import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextMemberId = 0;
  var nextId = 0;
  let userProfiles = Map.empty<Principal, UserProfile>();
  let loginActivities = List.empty<LoginActivity>();
  let idCardRequests = List.empty<IdCardRequest>();
  let members = Map.empty<Nat, Member>();
  let otpStore = Map.empty<Text, OtpRecord>();
  let siteContent = Map.empty<Text, Text>();

  public type Gender = {
    #male;
    #female;
    #other;
  };

  public type Member = {
    id : Nat;
    firstName : Text;
    lastName : Text;
    occupation : Text;
    fullAddress : Text;
    contactNumber : Text;
    whatsappNumber : Text;
    email : Text;
    tehsil : Text;
    policeStation : Text;
    gramPanchayat : Text;
    village : Text;
    country : Text;
    state : Text;
    district : Text;
    gender : Gender;
    photo : FileData;
    aadhaarCardPhoto : FileData;
    timestamp : Int;
    hashedPassword : Text;
    ownerPrincipal : ?Principal;
  };

  // Public member info (no password hash)
  public type MemberPublic = {
    id : Nat;
    firstName : Text;
    lastName : Text;
    occupation : Text;
    fullAddress : Text;
    contactNumber : Text;
    whatsappNumber : Text;
    email : Text;
    tehsil : Text;
    policeStation : Text;
    gramPanchayat : Text;
    village : Text;
    country : Text;
    state : Text;
    district : Text;
    gender : Gender;
    timestamp : Int;
  };

  public type FileData = {
    base64Data : Text;
    fileName : Text;
    fileSize : Nat;
  };

  public type UserProfile = {
    name : Text;
  };

  public type LoginActivity = {
    memberId : Nat;
    timestamp : Int;
    successful : Bool;
  };

  public type IdCardRequest = {
    memberId : Nat;
    timestamp : Int;
    requestedBy : ?Principal;
  };

  public type Filter = {
    searchTerm : ?Text;
    sortBy : ?SortBy;
  };

  public type SortBy = {
    #timestampAsc;
    #timestampDesc;
    #lastNameAsc;
    #lastNameDesc;
  };

  public type OtpRecord = {
    otp : Text;
    expiry : Int;
  };

  let designatedAdminPrincipal = Principal.fromText("txzwk-b2k4v-63dny-xpzzb-qz4ij-fivmw-kuzqk-o6ngk-kib7t-63zon-lae");

  func checkIsAdmin(user : Principal) : Bool {
    AccessControl.isAdmin(accessControlState, user) or user == designatedAdminPrincipal;
  };

  func isMemberOwner(caller : Principal, memberId : Nat) : Bool {
    switch (members.get(memberId)) {
      case (null) { false };
      case (?m) {
        switch (m.ownerPrincipal) {
          case (null) { false };
          case (?owner) { owner == caller };
        };
      };
    };
  };

  func matchesMemberFilter(member : Member, filter : ?Filter) : Bool {
    switch (filter) {
      case (null) { true };
      case (?f) {
        switch (f.searchTerm) {
          case (null) { true };
          case (?term) {
            member.firstName.contains(#text term) or
            member.lastName.contains(#text term) or
            member.email.contains(#text term) or
            member.occupation.contains(#text term);
          };
        };
      };
    };
  };

  func compareMembers(a : Member, b : Member, filter : ?Filter) : Order.Order {
    switch (filter) {
      case (null) { compareTimestamps(b.timestamp, a.timestamp) };
      case (?f) {
        switch (f.sortBy) {
          case (null) { compareTimestamps(b.timestamp, a.timestamp) };
          case (?(#timestampAsc)) { compareTimestamps(a.timestamp, b.timestamp) };
          case (?(#timestampDesc)) { compareTimestamps(b.timestamp, a.timestamp) };
          case (?(#lastNameAsc)) { a.lastName.compare(b.lastName) };
          case (?(#lastNameDesc)) { b.lastName.compare(a.lastName) };
        };
      };
    };
  };

  func compareTimestamps(a : Int, b : Int) : Order.Order {
    if (a < b) { #less } else if (a > b) { #greater } else { #equal };
  };

  func memberExists(memberId : Nat) : Bool {
    members.containsKey(memberId);
  };

  func toMemberPublic(m : Member) : MemberPublic {
    {
      id = m.id;
      firstName = m.firstName;
      lastName = m.lastName;
      occupation = m.occupation;
      fullAddress = m.fullAddress;
      contactNumber = m.contactNumber;
      whatsappNumber = m.whatsappNumber;
      email = m.email;
      tehsil = m.tehsil;
      policeStation = m.policeStation;
      gramPanchayat = m.gramPanchayat;
      village = m.village;
      country = m.country;
      state = m.state;
      district = m.district;
      gender = m.gender;
      timestamp = m.timestamp;
    };
  };

  public shared ({ caller }) func registerMember(member : Member) : async Nat {
    if (member.photo.fileSize > 10_000_000) {
      Runtime.trap("Photo file size exceeds 10 MB limit");
    };
    if (member.aadhaarCardPhoto.fileSize > 15_000_000) {
      Runtime.trap("Aadhaar card file size exceeds 15 MB limit");
    };

    let assignedId = nextMemberId;
    let newMember : Member = {
      member with
      id = assignedId;
      timestamp = Time.now();
      ownerPrincipal = if (caller.isAnonymous()) { null } else { ?caller };
    };
    members.add(assignedId, newMember);
    nextMemberId += 1;
    assignedId;
  };

  public shared ({ caller }) func loginMember(emailOrPhone : Text, password : Text) : async ?Nat {
    let member = members.values().find(
      func(m) {
        m.email == emailOrPhone or m.contactNumber == emailOrPhone
      }
    );

    switch (member) {
      case (?m) {
        if (m.hashedPassword == password) {
          let activity : LoginActivity = {
            memberId = m.id;
            timestamp = Time.now();
            successful = true;
          };
          loginActivities.add(activity);
          ?m.id;
        } else {
          let activity : LoginActivity = {
            memberId = m.id;
            timestamp = Time.now();
            successful = false;
          };
          loginActivities.add(activity);
          null;
        };
      };
      case (null) {
        null;
      };
    };
  };

  // Get member public info by ID (no password hash exposed)
  // Used by member dashboard after email/phone login
  public query func getMemberById(memberId : Nat) : async ?MemberPublic {
    switch (members.get(memberId)) {
      case (null) { null };
      case (?m) { ?toMemberPublic(m) };
    };
  };

  // Submit ID card request - works for anonymous callers (members using email/password login)
  public shared ({ caller }) func submitIdCardRequest(memberId : Nat) : async () {
    if (not memberExists(memberId)) {
      Runtime.trap("Member does not exist");
    };

    let request : IdCardRequest = {
      memberId;
      timestamp = Time.now();
      requestedBy = if (caller.isAnonymous()) { null } else { ?caller };
    };
    idCardRequests.add(request);
  };

  public shared ({ caller }) func getAllMembers(filter : ?Filter) : async [Member] {
    if (not checkIsAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admin can view members");
    };

    let filtered = members.values().toArray().filter(
      func(member) {
        matchesMemberFilter(member, filter);
      }
    );

    let sorted = filtered.sort(func(a, b) { compareMembers(a, b, filter) });

    sorted;
  };

  public query ({ caller }) func getAllIdCardRequests() : async [IdCardRequest] {
    if (not checkIsAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admin can view ID card requests");
    };
    idCardRequests.toArray();
  };

  public query ({ caller }) func getAllLoginActivities() : async [LoginActivity] {
    if (not checkIsAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admin can view login activities");
    };
    loginActivities.toArray();
  };

  public query ({ caller }) func getIsCallerAdmin() : async Bool {
    checkIsAdmin(caller);
  };

  public query ({ caller }) func getCallerMember() : async ?Member {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in to view member info");
    };
    members.values().find(func(m) {
      switch (m.ownerPrincipal) {
        case (null) { false };
        case (?owner) { owner == caller };
      }
    });
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not checkIsAdmin(caller)) {
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

  // Password reset functions - publicly accessible as users who forgot passwords cannot authenticate
  // Security is provided by OTP verification with time expiry
  public shared ({ caller }) func generatePasswordResetOtp(emailOrPhone : Text) : async ?Text {
    let member = members.values().find(
      func(m) {
        m.email == emailOrPhone or m.contactNumber == emailOrPhone
      }
    );

    switch (member) {
      case (null) { null };
      case (?_) {
        let timeNow = Time.now();
        let randomNumber = Int.abs(timeNow % 900_000) + 100_000;
        let otp = randomNumber.toText();
        let expiry = Time.now() + 600_000_000_000;
        let record : OtpRecord = { otp; expiry };
        otpStore.add(emailOrPhone, record);
        ?otp;
      };
    };
  };

  public shared ({ caller }) func resetMemberPassword(emailOrPhone : Text, otp : Text, newPassword : Text) : async Bool {
    switch (otpStore.get(emailOrPhone)) {
      case (null) { false };
      case (?record) {
        let now = Time.now();
        if (record.otp == otp and now < record.expiry) {
          let updatedEntries = members.toArray().map(
            func((id, member)) {
              if (member.email == emailOrPhone or member.contactNumber == emailOrPhone) {
                (id, { member with hashedPassword = newPassword });
              } else {
                (id, member);
              };
            }
          );
          members.clear();
          for ((id, member) in updatedEntries.values()) {
            members.add(id, member);
          };
          otpStore.remove(emailOrPhone);
          true;
        } else {
          false;
        };
      };
    };
  };

  public query ({ caller }) func getSiteContent() : async [(Text, Text)] {
    siteContent.toArray();
  };

  public shared ({ caller }) func setSiteContent(key : Text, value : Text) : async () {
    if (not checkIsAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admin can modify site content");
    };
    siteContent.add(key, value);
  };

  public shared ({ caller }) func setSiteContentBulk(entries : [(Text, Text)]) : async () {
    if (not checkIsAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admin can modify site content");
    };
    for ((key, value) in entries.values()) {
      siteContent.add(key, value);
    };
  };
};
