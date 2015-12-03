var coordinatesValidator = Match.Where(function (coordinates) {
  check(coordinates.lat, Number);
  check(coordinates.lng, Number);
  return true;
});

Meteor.methods({
  upsertMarker(obj) {
    check(obj, {
      _id: String,
      ownerId: String,
      type: String,
      coordinates: coordinatesValidator,
      updated: Date
    });

    try {
      var documentId = Markers.update({
        _id: obj._id,
        ownerId: obj.ownerId,
        updated: obj.updated
      }, {
        $set: {
          coordinates: obj.coordinates
        }
      });
      return documentId;
    } catch (exception) {
      return exception;
    }
  }
});
