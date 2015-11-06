Meteor.methods({
  setLocationTracking: function(locationTracking) {
    check(locationTracking, Boolean);
    try {
      var documentId = Settings.update({
        userId: Meteor.userId()
      }, {
        $set: {
          "settings.locationTracking": locationTracking
        }
      });
      // var documentId = Meteor.users.update({
      //   _id: Meteor.userId()
      // }, {
      //   $set: {
      //     "settings.locationTracking": locationTracking
      //   }
      // });
      return documentId;
    } catch (exception) {
      return exception;
    }
  }
});
