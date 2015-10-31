if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.locationMap.helpers({
    exampleMapOptions: function( params ) {
      // Make sure the maps API has loaded
      if ( GoogleMaps.loaded() ) {
        // Map initialization options
        if (typeof Session.get('coords') === undefined){
          return {
            center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),
            zoom: 12
          };
        } else {
          let coords = Session.get('coords');
          return {
            center: new google.maps.LatLng(coords.lat, coords.lng),
            zoom: 14
          };
        }

        // else if ( params.trackingUser && params.locationTracking === true ) {
        //   console.log( ' Not tracking user. ' )
        // } else if ( params.locationTracking && params.locationTracking === false ) {
        //   // To do: detect if location tracking is disabled -> return false
        // } else {
        //
        // }
      }
    }

  });

  Template.locationMap.onCreated(function(){
    this.coords = new ReactiveVar( false );
  });

  Template.locationMap.onRendered(function() {
    let geolocation = new Modules.client.geolocation();

    geolocation.watchPosition(function(response) {
      if ( !response.PERMISSION_DENIED ) {
        Bert.alert( `Watching User Location at [${[response.coords.latitude, response.coords.latitude]}]`, 'success' );
        Session.set('coords', {
          lat: response.coords.latitude,
          lng: response.coords.longitude
        });
        this.coords = {
          lat: response.coords.latitude,
          lng: response.coords.longitude
        }
      }
      if ( !!response.PERMISSION_DENIED ) {
        // error response
        Bert.alert( response.message, 'error' );
      }
    });

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
