var coordinatesValidator = Match.Where(function (coordinates) {
    check(coordinates.lat, Number);
    check(coordinates.lng, Number);
    return true;
});

Meteor.methods( {
  insertMarker( obj ) {
    check( obj, {
      ownerId: String,
      type: String,
      coordinates: coordinatesValidator
    } );

    try {
      var documentId = Markers.insert( obj );
      return documentId;
    } catch ( exception ) {
      return exception;
    }
  }
} );
