Meteor.methods({
  setLocationTracking: (locationTracking) => {
    // if (!Meteor.userId()) {
    //   throw new Meteor.Error(401, 'not-authorized');
    // }
    check(locationTracking, Boolean);
    try {
      var documentId = Settings.update({
        userId: Meteor.userId()
      }, {
        $set: {
          "settings.locationTracking": locationTracking
        }
      });
      return documentId;
    } catch (exception) {
      return exception;
    }
  },
  updateUserSettings: function (userSettings) {
    // if (!Meteor.userId()) {
    //   throw new Meteor.Error(401, 'not-authorized');
    // }
    
    check(userSettings, Object);
    check(userSettings._id, String);
    check(userSettings.username, String);
    check(userSettings.locationTracking, Boolean);

    let newUsername = userSettings.username,
        changedUsername,
        changedTracking;

    if (newUsername !== Meteor.user().username) {
      changedUsername = Meteor.call('changeUsername', newUsername);
      changedTracking = Meteor.call('setLocationTracking', userSettings.locationTracking);

      console.log(!!changedTracking && !!changedUsername);
    } else {
      changedTracking = Meteor.call('setLocationTracking', userSettings.locationTracking);
      console.log(!!changedTracking);
    }
  }
});
