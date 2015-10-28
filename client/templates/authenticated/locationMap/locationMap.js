if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.locationMap.helpers({
    exampleMapOptions: function( params ) {
      // Fastest to return a passed object or a new one
      params = !!params ? params : {};

      params.coords = () => {
        return this.reactive.geolocation.coords ;
      };
      // Make sure the maps API has loaded
      if ( GoogleMaps.loaded() ) {

        // Map initialization options
        return {
          center: new google.maps.LatLng(40.69847032728747, -73.9514422416687),
          zoom: 14
        };

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


  // Template.locationMap.onCreated( function() {
  // if ( this.data ) {
  //   this.data.reactive = {};
  //   let reactive = this.data.reactive;
  //
  //   // Initialize geolocation
  //   reactive.geolocation = { };
  //   reactive.geolocation.coords = new ReactiveVar(Geolocation.latLng() || { lat: 0, lng: 0 });
  //   reactive.geolocation.trackingUser = new ReactiveVar(false);
  //
  //   Meteor.setInterval(function() {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       reactive.geolocation.coords.lat = position.coords.latitude;
  //       reactive.geolocation.coords.lng = position.coords.longitude;
  //     });
  //   }, 5000);
  // }
  Template.locationMap.onCreated(function(){
    this.coords = new ReactiveVar( false );
  });

  Template.locationMap.onRendered(function() {
    /**/
    let geolocation = new Modules.client.geolocation();
    // geolocation.getPosition(notify);

    geolocation.watchPosition(function(response) {
      if ( !response.PERMISSION_DENIED ) {
        // this.coords = 'filsdjflkdsj';
        // debugger;
        Bert.alert( `Watching User Location at [${[response.coords.latitude, response.coords.latitude]}]`, 'success' );
        // Template.coords = {
        //   lat: response.coords.latitude,
        //   lng: response.coords.longitude
        // };

        // return Template.coords;
        // debugger;
        // this.reactive.geolocation.coords()
        // success response
        /*
          coords: Coordinates
          accuracy: 38
          altitude: null
          altitudeAccuracy: null
          heading: null
          latitude: 40.693689
          longitude: -73.9321772
          speed: null
        */
      }
      if ( !!response.PERMISSION_DENIED ) {
        // error response
        Bert.alert( response.message, 'error' );
        /*
        code: 1
        message: "User denied Geolocation"
        __proto__: PositionError
          PERMISSION_DENIED: 1
          POSITION_UNAVAILABLE: 2
          TIMEOUT: 3
          code: (...)
          get code: ()
          constructor: PositionError()
          message: (...)
          get message: ()
        __proto__: Object
        */
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
