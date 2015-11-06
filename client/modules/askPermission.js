var askPermission = function askPermission () {
  var permission = confirm( "Allow better functionality by reporting your location?" );
  if ( !!permission ) {
    this._options = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 7000
    };
    return Geolocation;
  } else {
    return false;
  }
};

Modules.client.askPermission = askPermission;
