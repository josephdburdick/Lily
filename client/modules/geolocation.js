var Geolocation = function Geolocation() {
  if (Session.get('permission') === undefined){
    var permission = confirm("Allow better functionality by reporting your location?");
    if (permission){
      this._options = {
        enableHighAccuracy: true,
        maximumAge        : 10000,
        timeout           : 7000
      };
      Session.set('permission', true);
    }
    else{
      Session.set('permission', false);
      return false;
    }
  }
};

Geolocation.prototype = {
  get watchID() { return this._watchID; },
  set watchID(watchID) { this._watchID = watchID; },
  get options() { return this._options; },
  // hasCapability: function() { return "geolocation" in navigator; },
  _promise: function(promise, cb) {
    var geolocation = this;
    return new Promise(function(ok, err) {
      if (promise == "getPosition")
        navigator.geolocation.getCurrentPosition(cb, cb,
          geolocation.options
        );
      else if (promise == "watchPosition")
        geolocation.watchID = navigator.geolocation.watchPosition(
          cb, cb, geolocation.options
        );
    });
  },
  getPosition: function(cb) { return this._promise("getPosition", cb); },
  watchPosition: function(cb) {
    this.clearWatch();
    return this._promise("watchPosition", cb);
  },
  clearWatch: function() {
    if (!this.watchID) return;
    navigator.geolocation.clearWatch(this.watchID);
    this.watchID = null;
  }
};

/* Testing functions from another module */
function log(Data) { console.log(Date() + " " + Data); }
function logOk({coords: {lat: lat, lng: lng}}) {
  log("lat: " + lat + " - lng: " + lng);
}
function logError({code: code, message: message}) {
  log("error geo " + code + " - " + message);
}

/* Callback from another module */
function notify(event) {
  return new Promise(function(ok, err) {
    return event.coords ? ok(event) : err(event);
  }).then(logOk).catch(logError);
}

Modules.client.geolocation = Geolocation;
