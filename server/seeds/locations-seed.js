Meteor.startup( function () {
  console.log( Venues.find().count() + ' venues' );
  console.log( Meteor.users.find().count() + ' users' );

  // Seed Venues database
  if ( Venues.find().count() === 0 ) {
    var items = JSON.parse( Assets.getText( 'seeds/locations--nyc-hotspots.json' ) );
    _.each( items, function ( item ) {
      // handle dirty seed data
      /* jshint ignore:start */
      if ( [ "", null ].indexOf( item.location.name ) > -1 || item.location.name.match( /^[0-9]+$/ ) != null ) {
        item.location.name = "Free Hotspot";
      } else {
        item.location.name = item.location.name.trim();
      }
      /* jshint ignore:end */

      // Create and add Venue
      Meteor.call( 'insertVenue', {
        name: item.location.name,
        address: item.location.address,
        type: item.location.type,
        city: item.location.city
      }, function ( error, response ) {
        if ( error ) {
          throw new Meteor.Error( 500, error );
        }
        if ( !error ) {
					console.log(`Venue: ${response}`);
          var venueId = response;

          // // Create, add, and link Network to Venue
          Meteor.call( 'insertNetwork', {
            ownerId: venueId,
            name: item.network.name,
            isPublic: item.network.isPublic,
            password: item.network.password,
            verified: item.network.verified
          }, function ( error, response ) {
            if ( !error ) {
              console.log(`Network: ${response}`);
            }
          } );

          // Create, add, and link Marker to Venue
          Meteor.call( 'insertMarker', {
            ownerId: venueId,
            type: "Venue",
            lat: item.location.lat,
            lng: item.location.lng
          }, function ( error, response ) {
            if ( !error ) {
              console.log(`Marker: ${response}`);
            }
          } );

        }
      } );
    } );

  }

} );
