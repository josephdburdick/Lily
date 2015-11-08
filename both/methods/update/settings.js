Meteor.methods( {
  setLocationTracking: function ( locationTracking ) {
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
  }
} );
