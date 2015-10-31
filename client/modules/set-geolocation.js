var setGeolocation = function setGeolocation() {
  let geolocation = new Modules.client.geolocation();
  geolocation.watchPosition(function(response) {
    if ( !response.PERMISSION_DENIED ) {
      Bert.alert( `Watching User Location at [${[response.coords.latitude, response.coords.latitude]}]`, 'success' );
      Session.set('coords', {
        lat: response.coords.latitude,
        lng: response.coords.longitude
      });
    }
    if ( !!response.PERMISSION_DENIED ) {
      // error response
      Bert.alert( response.message, 'error' );
    }
  });
};

Modules.client.setGeolocation = setGeolocation;
