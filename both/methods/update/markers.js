Meteor.methods( {
  upsertMarker( obj ) {
    check( obj, {
      _id: String,
      ownerId: String,
      type: String,
      lat: Number,
      lng: Number,
      coordinates: [ Number ]
    });

    try {
      var documentId = Markers.update( {
        _id: obj._id,
        ownerId: obj.ownerId
      }, {
        $set: {
          lat: obj.lat,
          lng: obj.lng
        }
      } );
      return documentId;
    } catch ( exception ) {
      return exception;
    }
  }
} );
