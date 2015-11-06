var setGeolocation = function setGeolocation( bool ) {
  let geolocationWatchId,
    geolocation = new Modules.client.geolocation(),
    askPermission = Modules.client.askPermission,
    bertStatus = (permission) => {
      return {
        text: !!permission ? 'On' : 'Off',
        color: !!permission ? 'success' : 'warning'
      };
    };

  if ( !!bool ) {
    var permission = askPermission();
    if ( !!permission ) {
      geolocationWatchId = geolocation.watchPosition( (response) => {
        let locationTracking = !!!response.PERMISSION_DENIED,
            status = bertStatus(locationTracking);

        // Tracking allowed
        if ( locationTracking ) {
          Session.set( 'userCoords', {
            lat: response.coords.latitude,
            lng: response.coords.longitude
          } );

          Session.set( 'locationTracking', locationTracking );
          Meteor.call( 'setLocationTracking', locationTracking, ( err, result ) => {
            if ( !err ) {
              Bert.alert( `Location tracking ${status.text}.`, status.color );
            } else {
              Bert.alert( err, 'error' );
            }
          } );
          return true;
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
    } else {
      Bert.alert( 'Location tracking cancelled.', 'warning' );
      return false;
    }
  } else {
    geolocation.clearWatch();
    console.log(geolocation);
    Meteor.call( 'setLocationTracking', false, ( err, result ) => {
      if ( !err ) {
        Bert.alert( `Location tracking off.`, 'warning' );
      } else {
        Bert.alert( err, 'error' );
      }
    } );
  }
};

Modules.client.setGeolocation = setGeolocation;
