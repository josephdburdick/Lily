var setGeolocation = function setGeolocation( bool, template ) {
  let geolocationWatchId,
    geolocation = new Modules.client.geolocation(),
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

      var watchID;
      var geoLoc;

      function showLocation( position ) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        alert( "Latitude : " + latitude + " Longitude: " + longitude );
      }

      function errorHandler( err ) {
        if ( err.code == 1 ) {
          alert( "Error: Access is denied!" );
        } else if ( err.code == 2 ) {
          alert( "Error: Position is unavailable!" );
        }
      }

      function getLocationUpdate() {
        if ( navigator.geolocation ) {
          // timeout at 60000 milliseconds (60 seconds)
          var options = {
            timeout: 60000
          };
          geoLoc = navigator.geolocation;
          watchID = geoLoc.watchPosition( showLocation, errorHandler, options );
        } else {
          alert( "Sorry, browser does not support geolocation!" );
        }
      }

      function stopWatch() {
        geoLoc.clearWatch( watchID );
      }
      // geolocationWatchId = geolocation.watchPosition( function ( response ) {
      //   console.log(response);
      //
      //   /*
      //   response.message = error (denied)
      //   */
      //
      //   let locationTracking = !!!response.PERMISSION_DENIED,
      //     status = bertStatus( locationTracking );
      //
      //   // Tracking allowed
      //   if ( locationTracking ) {
      //
      //     let coords = {
      //       lat: response.coords.latitude,
      //       lng: response.coords.longitude
      //     };
      //
      //     if ( template && template.cords ) {
      //       template.coords.set( coords );
      //     }
      //
      //     Session.set( 'userCoords', coords );
      //     Session.set( 'locationTracking', locationTracking );
      //
      //     Meteor.call( 'setLocationTracking', locationTracking, ( err, result ) => {
      //       if ( !err ) {
      //         Bert.alert( `Location tracking ${status.text}.`, status.color );
      //       } else {
      //         Bert.alert( err, 'error' );
      //       }
      //     } );
      //     Meteor.call( 'insertMarker', {
      //       ownerId: Meteor.userId(),
      //       type: 'User',
      //       lat: coords.lat,
      //       lng: coords.lng,
      //       created: new Date()
      //     }, ( err, result ) => {
      //       if ( !err ) {
      //         console.log( `Marker added at [${coords.lat}, ${coords.lng}]` );
      //       }
      //     } );
      //     return template;
      //   }
      //
      //   // Tracking disallowed
      //   if ( !locationTracking ) {
      //     // error response
      //     Bert.alert( response.message, 'error' );
      //     Session.set( 'locationTracking', locationTracking );
      //     Meteor.call( 'setLocationTracking', locationTracking, ( err, result ) => {
      //       if ( !err ) {
      //         Bert.alert( `Location tracking ${status.text}.`, status.color );
      //       } else {
      //         Bert.alert( err, 'error' );
      //       }
      //     } );
      //     return false;
      //   }
      // } );
      console.log( geolocationWatchId );
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
    Geolocation = null;
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
