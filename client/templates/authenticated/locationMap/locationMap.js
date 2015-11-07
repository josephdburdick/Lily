if ( Meteor.isClient ) {
  Meteor.startup( function () {
    GoogleMaps.load();
  } );
  Template.locationMap.events( {

  } );
  Template.locationMap.helpers( {
    exampleMapOptions: function ( params ) {
      // Make sure the maps API has loaded
      if ( GoogleMaps.loaded() ) {
        // Map initialization options
        if ( Session.get( 'userCoords' ).lat ) {
          return{
            center: new google.maps.LatLng( Session.get( 'userCoords' ).lat, Session.get( 'userCoords' ).lng ),
            zoom: 14
          };
        } else {
          return {
            center: new google.maps.LatLng( 40.69847032728747, -73.9514422416687 ),
            zoom: 12
          };
        }
      }
    }
  } );

  Template.locationMap.onCreated( function () {
    var coords = new ReactiveVar( false );

    let self = Template.instance();

    Tracker.autorun( function () {
      self.subscribe( 'userSettings' );
    } );

  } );

  Template.locationMap.onRendered( function () {
    if ( Session.get( 'permission' ) === true ) {
      Modules.client.setGeolocation();
    } else {
      Bert.alert( 'Operating without User Location. <a href="/settings">Turn on in Settings</a>', 'warning' );
    }

    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready( 'exampleMap', function ( map ) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker( {
        position: map.options.center,
        map: map.instance
      } );

    } );
  } );

}
