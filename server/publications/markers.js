Meteor.publish( 'allUserMarkers', function () {
  if ( this.userId ) {
    return Markers.find( {
      ownerId: this.userId
    }, {
      sort: {
        createdAt: -1
      }
    } );
  }
  this.ready();
} );
