var setGeolocation = function setGeolocation(bool, template) {
  let
    geolocation = null,
    geolocationWatchId = null,
    askPermission = Modules.client.askPermission,
    bertStatus = (permission) => {
      return {
        text: !!permission ? 'On' : 'Off',
        color: !!permission ? 'success' : 'warning'
      };
    };

  // setGeolocation: TRUE
  if (!!bool) {
    let permitted = askPermission();
    if (!!permitted) {
      console.log('permission: ' + permitted);
      geolocation = new Modules.client.geolocation(3000, false);
      geolocationWatchId = navigator.geolocation.watchPosition(function (response) {
        let locationTracking = !!!response.PERMISSION_DENIED,
          status = bertStatus(locationTracking);

        // Tracking allowed
        if (locationTracking) {
          let coords = {
            lat: response.coords.latitude,
            lng: response.coords.longitude
          };

          if (template && template.cords) {
            template.coords.set(coords);
          }

          Session.set('userCoords', coords);
          Session.set('locationTracking', locationTracking);

          Meteor.call('insertMarker', {
            ownerId: Meteor.userId(),
            type: 'User',
            lat: coords.lat,
            lng: coords.lng,
            created: new Date()
          }, (error, result) => {
            if (!error) {
              console.log(`Marker added at [${coords.lat}, ${coords.lng}]`);
            }
          });

          return true;

        }

        // Tracking disallowed
        if (!locationTracking) {
          // error response
          Bert.alert(response.message, 'error', 'growl-top-right');
          // Session.set( 'locationTracking', locationTracking );
          Meteor.call('setLocationTracking', locationTracking, (err, result) => {
            if (!err) {
              Bert.alert(`Location tracking ${status.text}.`, status.color, 'growl-top-right');
            } else {
              Bert.alert(err, 'error', 'growl-top-right');
            }
          });
          return false;
        }
      });
      Session.set('geolocationWatchId', geolocationWatchId);
    } else {
      Bert.alert('Location tracking cancelled.', 'warning', 'growl-top-right');
      Meteor.call('setLocationTracking', false, (error, result) => {
        if (!error) {
          Bert.alert(`Location tracking cancelled.`, 'warning', 'growl-top-right');
          if (result === 1) {
            console.log('User cancelled tracking.');
          }
          return false;
        }
        if (error) {
          Bert.alert(error.reason, 'error', 'growl-top-right');
          return false;
        }
      });
      return false;
    }
    // setGeolocation: FALSE
  } else {
    navigator.geolocation.clearWatch(Session.get('geolocationWatchId'));

    Meteor.call('setLocationTracking', false, (error, result) => {
      if (!error) {
        Bert.alert(`Location tracking off.`, 'warning', 'growl-top-right');
        return false;
      }
      if (error) {
        Bert.alert(error.reason, 'error', 'growl-top-right');
        return error.reason;
      }
    });
  }
};

Modules.client.setGeolocation = setGeolocation;
