Meteor.methods({
  insertNetwork(obj) {
    check(obj, Object);
    check(obj.ownerId, String);
    check(obj.name, String);
    check(obj.password, Match.any);
    check(obj.hasPassword, Boolean);
    check(obj.isPublic, Boolean);
    check(obj.verified, Boolean);
    try {
      var documentId = Networks.insert(obj);
      return documentId;
    } catch (exception) {
      return exception;
    }
  }
});
