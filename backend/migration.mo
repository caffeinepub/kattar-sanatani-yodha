import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  // Old (legacy) submission type from previous canister version
  type Submission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    phoneNumber : Text;
    whatsappNumber : Text;
    timestamp : Int;
  };

  // Gender type from new canister
  type Gender = {
    #male;
    #female;
    #other;
  };

  // File data type from new canister
  type FileData = {
    base64Data : Text;
    fileName : Text;
    fileSize : Nat;
  };

  // Member record type from new canister
  type Member = {
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

  // UserProfile type from new canister
  type UserProfile = {
    name : Text;
  };

  // Old actor (legacy) with only stable variables from previous version
  type OldActor = {
    submissions : List.List<Submission>;
    nextId : Nat;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  // New actor type after migration (new canister version)
  type NewActor = {
    members : Map.Map<Nat, Member>;
    nextMemberId : Nat;
    nextId : Nat;
    userProfiles : Map.Map<Principal, UserProfile>;
    loginActivities : List.List<{ memberId : Nat; timestamp : Int; successful : Bool }>;
    idCardRequests : List.List<{ memberId : Nat; timestamp : Int; requestedBy : ?Principal }>;
  };

  // Explicit migration function to transform legacy state into new actor state
  public func run(old : OldActor) : NewActor {
    let members = old.submissions.toArray().map<Submission, (Nat, Member)>(
      func(submission) {
        (
          submission.id,
          {
            id = submission.id;
            firstName = submission.name;
            lastName = "";
            occupation = "";
            fullAddress = "";
            contactNumber = submission.phoneNumber;
            whatsappNumber = submission.whatsappNumber;
            email = submission.email;
            tehsil = "";
            policeStation = "";
            gramPanchayat = "";
            village = "";
            country = "";
            state = "";
            district = "";
            gender = #male; // Default value
            photo = {
              base64Data = "";
              fileName = "";
              fileSize = 0;
            };
            aadhaarCardPhoto = {
              base64Data = "";
              fileName = "";
              fileSize = 0;
            };
            timestamp = submission.timestamp;
            hashedPassword = "";
            ownerPrincipal = null;
          },
        );
      }
    );
    let membersMap = Map.fromIter<Nat, Member>(members.values());

    {
      members = membersMap;
      nextMemberId = old.nextId;
      nextId = 0;
      userProfiles = old.userProfiles;
      loginActivities = List.empty<{ memberId : Nat; timestamp : Int; successful : Bool }>();
      idCardRequests = List.empty<{ memberId : Nat; timestamp : Int; requestedBy : ?Principal }>();
    };
  };
};
