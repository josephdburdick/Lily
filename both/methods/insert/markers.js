Meteor.methods( {
  insertMarker( obj ) {
    check( obj, Object );
    // check( obj.ownerId, String );
    // check( obj.type, String );

    try {
      var documentId = Markers.insert( obj );
      return documentId;
    } catch ( exception ) {
      return exception;
    }
  }
} );
