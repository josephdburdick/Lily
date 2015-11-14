Meteor.methods( {
  setLocationTracking: ( locationTracking ) => {
    check( locationTracking, Boolean );
    if ( !Meteor.userId() ) {
      throw new Meteor.Error( "not-authorized" );
    }
    try {
      var documentId = Settings.update( {
        userId: Meteor.userId()
      }, {
        $set: {
          "settings.locationTracking": locationTracking
        }
      } );
      return documentId;
    } catch ( exception ) {
      return exception;
    }
  },
  updateUserSettings: function (userSettings) {
    if (!this.userId) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    check(userSettings, Object);
    check(userSettings.username, String);
    check(userSettings.locationTracking, Boolean);
    let newUsername = userSettings.username,
        changedUsername;
    if (newUsername !== Meteor.user().username){
      changedUsername = Meteor.call('changeUsername', newUsername);
    }
    Meteor.call('setLocationTracking', userSettings.locationTracking);
  }
} );
