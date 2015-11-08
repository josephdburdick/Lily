// var Geolocation = function Geolocation() {
var Geolocation = function Geolocation( maximumAge, accurate ) {
  this.settings = {
    'maximumAge': maximumAge,
    'accurate': accurate
  };
};

Geolocation.prototype = {
  position: {
    latitude: null,
    longitude: null,
    altitude: null,
    accuracy: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  },
  lastCheck: null,
  callback: null,
  watchId: null,
  onSuccess: function ( position ) {
    this.position.latitude = position.coords.latitude;
    this.position.longitude = position.coords.longitude;
    this.position.altitude = position.coords.altitude;
    this.position.accuracy = position.coords.accuracy;
    this.position.altitudeAccuracy = position.coords.altitudeAccuracy;
    this.position.heading = position.coords.heading;
    this.position.speed = position.coords.speed;
    this.lastCheck = new Date( position.timestamp );

    var pos = {
      latitude: this.position.latitude,
      longitude: this.position.longitude
    };
    // call callback with position and accuracy parameters
    this.callback( pos, this.position.accuracy );
  },
  onError: function ( error ) {
    console.log( error.code + ' ' + error.message );
  },
  getCoordinates: function ( callback ) {
    // Helper function to bind scope to callback function as seen at http://stackoverflow.com/questions/183214/javascript-callback-scope
    function bind( scope, fn ) {
      return function () {
        fn.apply( scope, arguments );
      };
    }
    // Assign the callback function to the local member
    this.callback = callback;
    // watchPosition is a method that gets called each time the position changes. Making sure it's only getting called once (watchId can be used to stop the function when necessary
    if ( this.watchId === null ) {
      // notice usage of the bind function here
      this.watchId = navigator.geolocation.watchPosition( bind( this, this.onSuccess ), bind( this, this.onError ), {
        maximumAge: this.settings.maximumAge,
        enableHighAccuracy: this.settings.accurate
      } );
    }
  }
};

// let watchID,
//     geoLoc,
//
// showLocation = function showLocation( position ) {
//   var latitude = position.coords.latitude;
//   var longitude = position.coords.longitude;
//   alert( "Latitude : " + latitude + " Longitude: " + longitude );
// },
//
// errorHandler = function errorHandler( err ) {
//   if ( err.code == 1 ) {
//     alert( "Error: Access is denied!" );
//   } else if ( err.code == 2 ) {
//     alert( "Error: Position is unavailable!" );
//   }
// },
//
// getLocationUpdate = function getLocationUpdate() {
//   if ( navigator.geolocation ) {
//     // timeout at 60000 milliseconds (60 seconds)
//     var options = {
//       enableHighAccuracy: true,
//       maximumAge: 10000,
//       timeout: 6000
//     };
//     geoLoc = navigator.geolocation;
//     watchID = geoLoc.watchPosition( showLocation, errorHandler, options );
//   } else {
//     alert( "Sorry, browser does not support geolocation!" );
//   }
// },
// getWatch = function getWatch() {
//   return watchID;
// },
// stopWatch = function stopWatch() {
//   geoLoc.clearWatch( watchID );
// };
//
// return {
//   showLocation : showLocation,
//   errorHandler : errorHandler,
//   getLocationUpdate : getLocationUpdate,
//   stopWatch : stopWatch,
//   getWatch : watchID
// };


// Geolocation.prototype = {
//   get watchID() {
//     return this._watchID;
//   },
//   set watchID( watchID ) {
//     this._watchID = watchID;
//   },
//   get options() {
//     return this._options;
//   },
//   // hasCapability: function() { return "geolocation" in navigator; },
//   _promise: function ( promise, cb ) {
//     var geolocation = this;
//     return new Promise( function ( ok, err ) {
//       if ( promise == "getPosition" )
//         navigator.geolocation.getCurrentPosition( cb, cb,
//           geolocation.options
//         );
//       else if ( promise == "watchPosition" )
//         geolocation.watchID = navigator.geolocation.watchPosition(
//           cb, cb, geolocation.options
//         );
//     } );
//   },
//   getPosition: function ( cb ) {
//     return this._promise( "getPosition", cb );
//   },
//   watchPosition: function ( cb ) {
//     this.clearWatch();
//     return this._promise( "watchPosition", cb );
//   },
//   clearWatch: function () {
//     if ( !this.watchID ) return;
//     navigator.geolocation.clearWatch( this.watchID );
//     this.watchID = null;
//   }
// };
//
// /* Testing functions from another module */
// function log( Data ) {
//   console.log( Date() + " " + Data );
// }
//
// function logOk( {
//   coords: {
//     lat: lat,
//     lng: lng
//   }
// } ) {
//   log( "lat: " + lat + " - lng: " + lng );
// }
//
// function logError( {
//   code: code,
//   message: message
// } ) {
//   log( "error geo " + code + " - " + message );
// }
//
// /* Callback from another module */
// function notify( event ) {
//   return new Promise( function ( ok, err ) {
//     return event.coords ? ok( event ) : err( event );
//   } ).then( logOk ).catch( logError );
// }
// };

Modules.client.geolocation = Geolocation;
