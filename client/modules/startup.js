let startup = () => {
  _geolocation();
  _setGeolocation();
};

var _geolocation = () => Modules.client.Geolocation;

var _setGeolocation = () => Modules.client.setGeolocation();

Modules.client.startup = startup;
