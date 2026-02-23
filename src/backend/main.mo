import Text "mo:core/Text";

actor {
  public shared ({ caller }) func submitContactForm(_name : Text, _email : Text, _message : Text) : async () {
    // In a real world scenario, this would trigger an email or notification.
    // For this static site, we just acknowledge receipt.
  };
};
