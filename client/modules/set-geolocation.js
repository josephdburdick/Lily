var setGeolocation = function setGeolocation( bool, template ) {
  let
    geolocation = null,
    geolocationWatchId = null,
    askPermission = Modules.client.askPermission,
    bertStatus = ( permission ) => {
      return {
        text: !!permission ? 'On' : 'Off',
        color: !!permission ? 'success' : 'warning'
      };
    };

  // setGeolocation: TRUE
  if ( !!bool ) {
    let permitted = askPermission();
    if ( !!permitted ) {
      geolocation = new Modules.client.geolocation( 3000, false );
      geolocationWatchId = navigator.geolocation.watchPosition( function ( response ) {
        let locationTracking = !!!response.PERMISSION_DENIED,
          status = bertStatus( locationTracking );

        // Tracking allowed
        if ( locationTracking ) {
          let coords = {
            lat: response.coords.latitude,
            lng: response.coords.longitude
          };

          if ( template && template.cords ) {
            template.coords.set( coords );
          }

          Session.set( 'userCoords', coords );
          Session.set( 'locationTracking', locationTracking );

          Meteor.call( 'setLocationTracking', locationTracking, ( err, result ) => {
            if ( !err ) {
              Bert.alert( `Location tracking ${status.text}.`, status.color );
            } else {
              Bert.alert( err, 'error' );
            }
          } );

          Meteor.call( 'insertMarker', {
            ownerId: Meteor.userId(),
            type: 'User',
            lat: coords.lat,
            lng: coords.lng,
            created: new Date()
          }, function ( err, result ) {
            if ( !err ) {
              console.log( `Marker added at [${coords.lat}, ${coords.lng}]` );
            }
          } );

          return template;
        }

        // Tracking disallowed
        if ( !locationTracking ) {
          // error response
          Bert.alert( response.message, 'error' );
          Session.set( 'locationTracking', locationTracking );
          Meteor.call( 'setLocationTracking', locationTracking, ( err, result ) => {
            if ( !err ) {
              Bert.alert( `Location tracking ${status.text}.`, status.color );
            } else {
              Bert.alert( err, 'error' );
            }
          } );
          return false;
        }
      } );
      Session.set('geolocationWatchId', geolocationWatchId);
    } else {
      // Bert.alert( 'Location tracking cancelled.', 'warning' );
      Meteor.call( 'setLocationTracking', false, ( err, result ) => {
        if ( !err ) {
          Bert.alert( `Location tracking cancelled.`, 'warning' );
          return false;
        } else {
          Bert.alert( err, 'error' );
        }
      } );
      return false;
    }
    // setGeolocation: FALSE
  } else {
    navigator.geolocation.clearWatch( Session.get('geolocationWatchId') );

    Meteor.call( 'setLocationTracking', false, ( err, result ) => {
      if ( !err ) {
        Bert.alert( `Location tracking off.`, 'warning' );
        return false;
      } else {
        Bert.alert( err, 'error' );
      }
    } );
  }
};

Modules.client.setGeolocation = setGeolocation;
