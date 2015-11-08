var askPermission = function askPermission() {
  var permission = false;

  if ( !Settings.findOne().settings.locationTracking ) {
    permission = confirm( "Allow better functionality by reporting your location?" );
    console.log(`user chose ${permission}`);
    if ( !!permission ) {
      this._options = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 7000
      };
      return true;
    } else {
      return false;
    }
  } else {
    console.log('already true.');
    this._options = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 7000
    };
    return true;
  }

};

Modules.client.askPermission = askPermission;
