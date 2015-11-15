Meteor.methods( {
  insertMarker( obj ) {
    check( obj, {
      ownerId: String,
      type: String,
      lat: Number,
      lng: Number,
      coordinates: [Number]
    } );

    try {
      var documentId = Markers.insert( obj );
      return documentId;
    } catch ( exception ) {
      return exception;
    }
  }
} );
