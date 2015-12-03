var coordinatesValidator = Match.Where(function (coordinates) {
  check(coordinates.lat, Number);
  check(coordinates.lng, Number);
  return true;
});

Meteor.methods({
  upsertMarker(obj) {
    if (!this.userId || obj.ownerId !== this.userId) {
      setTimeout(function () {
        throw new Meteor.Error(500, 'There was an error processing your request');
      }, 0);
    }
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
        ownerId: obj.ownerId
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
