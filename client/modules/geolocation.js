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

Modules.client.geolocation = Geolocation;
