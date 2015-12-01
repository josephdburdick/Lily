Meteor.methods({
  setLocationTracking: (locationTracking) => {
    if (!Meteor.user()) {
      throw new Meteor.Error(401, 'You need to be signed in to continue.');
    }
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
    if (!Meteor.user()) {
      throw new Meteor.Error(401, 'You need to be signed in to continue.');
    }

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

    } else {
      changedTracking = Meteor.call('setLocationTracking', userSettings.locationTracking);
    }
  }
});
