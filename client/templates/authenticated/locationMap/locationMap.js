if ( Meteor.isClient ) {
  Meteor.startup( () => {
    GoogleMaps.load();
  } );
  Template.locationMap.events( {

  } );
  Template.locationMap.helpers( {
    exampleMapOptions: ( params ) => {
      // Make sure the maps API has loaded
      if ( GoogleMaps.loaded() ) {
        let self = Template.instance();
        // Map initialization options
        if ( self.locationTracking.get() ) {
          let coords = self.coords.get();
          if ( !!coords ) {
            return {
              center: new google.maps.LatLng( coords.lat, coords.lng ),
              zoom: 16
            };
          }
        } else {
          return {
            center: new google.maps.LatLng( 40.783435, -73.966249 ),
            zoom: 12
          };
        }
      }
    }
  } );

  Template.locationMap.onCreated( () => {

    let self = Template.instance();

    self.locationTracking = new ReactiveVar( false );
    self.coords = new ReactiveVar( false );
    self.subscribe( 'userSettings' );
    self.subscribe( 'allUserMarkers' );
    Tracker.autorun( function () {
      if ( !!Settings.findOne() ) {
        let locationTracking = Settings.findOne().settings.locationTracking;
        self.locationTracking.set( locationTracking );

        if ( self.locationTracking.get() ) {
          if ( !Geolocation.latLng() ) {
            Modules.client.setGeolocation( true, self );
          }
          self.coords.set( Geolocation.latLng() );
        }
      }
    } );
  } );

  Template.locationMap.onRendered( () => {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready( 'exampleMap', ( map ) => {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker( {
        position: map.options.center,
        map: map.instance
      } );
    } );
  } );

}
