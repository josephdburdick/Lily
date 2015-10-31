if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
  Template.locationMap.events({
    // 'click [data-role="permission-on"]': function ( event ) {
    //   event.preventDefault();
    //   debugger;
    //
    //   Session.set('permission', true);
    //   Bert.alert( 'User Location On', 'success' );
    //   Modules.client.setGeolocation();
    // }
  });
  Template.locationMap.helpers({
    exampleMapOptions: function( params ) {
      // Make sure the maps API has loaded
      if ( GoogleMaps.loaded() ) {
        // Map initialization options
        // if (typeof Session.get('permission') !== object){
        //   let coords = Session.get('coords');
        //   return {
        //     center: new google.maps.LatLng(coords.lat, coords.lng),
        //     zoom: 14
        //   };
        // } else if (!Session.get('permission')) {
        //
        // }

        return {
          center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),
          zoom: 12
        };
      }
    }
  });

  Template.locationMap.onCreated(function(){
    this.coords = new ReactiveVar( false );
  });

  Template.locationMap.onRendered(function() {
    if (Session.get('permission') === true){
      Modules.client.setGeolocation();
    } else {
      Bert.alert( 'Operating without User Location. <a href="/settings">Turn on in Settings</a>', 'warning' );
    }

    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function( map ) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });

    });
  });

}
