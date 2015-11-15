Meteor.publish('allUserMarkers', function () {
  if (this.userId) {
    return Markers.find({
      ownerId: this.userId
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
  this.ready();
});

Meteor.publish('lastUserMarker', function () {
  if (this.userId) {
    return Markers.find({
      ownerId: this.userId
    }, {
      sort: {
        createdAt: -1
      },
      limit: 1,
    });
  }
  this.ready();
});

Meteor.publish('allPublicMarkers', function () {
  if (this.userId) {
    return Markers.find({
      // ownerId: !this.userId
    }, {
      sort: {
        createdAt: -1
      },
      limit: 40
    });
  }
  this.ready();
});

Meteor.publish('nearestMarkers', function (coords) {
  check(coords, [Number]);
  // if (!!params && !!params.coordinates && !!params.limit) {
  if (!!coords){
    return Markers.find({
      'coordinates': {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: coords
          },
          $maxDistance: Math.round(3218.688), //Math.round(params.distanceLimit),
          spherical: true
        }
      }
    }, {
      limit: 40
    });
  }
});
