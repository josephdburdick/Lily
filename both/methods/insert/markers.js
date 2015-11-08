Meteor.methods({
  insertMarker( obj ) {
    check( obj, Object );

    try {
      var documentId = Markers.insert( obj );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
