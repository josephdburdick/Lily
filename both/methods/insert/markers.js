Meteor.methods( {
  insertMarker( obj ) {
    check( obj, Object );
    check( obj.ownerId, String );
    check( obj.type, String );
    check( obj.lat, Number);
    check( obj.lng, Number);

    try {
      var documentId = Markers.insert( obj );
      return documentId;
    } catch ( exception ) {
      return exception;
    }
  }
} );
