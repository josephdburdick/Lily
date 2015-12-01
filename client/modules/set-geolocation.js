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
      geolocation = new Modules.client.geolocation(3000, true);
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

          let marker = Markers.find({
            ownerId: Meteor.userId()
          }).fetch()[0];

          if (!!marker) {
            Meteor.call('upsertMarker', {
              _id: marker._id,
              ownerId: Meteor.userId(),
              type: 'User',
              coordinates: {
                lat: coords.lat,
                lng: coords.lng
              },
              //created: new Date()
            }, (error, result) => {
              if (!error) {
                console.log(`Marker updated to [${coords.lat}, ${coords.lng}]`);
              }
            });
          } else {
            markerId = Meteor.call('insertMarker', {
              ownerId: Meteor.userId(),
              type: 'User',
              coordinates: {
                lat: coords.lat,
                lng: coords.lng
              },
              //created: new Date()
            }, (error, result) => {
              if (!error) {
                console.log(`Marker added at [${coords.lat}, ${coords.lng}]`);
              }
            });
          }

          return true;

        }

        // Tracking disallowed
        if (!locationTracking) {
          // error response
          Bert.alert(response.message, 'error', 'fixed-bottom');
          // Session.set( 'locationTracking', locationTracking );
          Meteor.call('setLocationTracking', locationTracking, (err, result) => {
            if (!err) {
              Bert.alert(`Location tracking ${status.text}.`, status.color, 'fixed-bottom');
            } else {
              Bert.alert(err, 'error', 'fixed-bottom');
            }
          });
          return false;
        }
      });
      Session.set('geolocationWatchId', geolocationWatchId);
    } else {
      Bert.alert('Location tracking cancelled.', 'warning', 'fixed-bottom');
      Meteor.call('setLocationTracking', false, (error, result) => {
        if (!error) {
          Bert.alert(`Location tracking cancelled.`, 'warning', 'fixed-bottom');
          if (result === 1) {
            console.log('User cancelled tracking.');
          }
          return false;
        }
        if (error) {
          Bert.alert(error.reason, 'error', 'fixed-bottom');
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
        Bert.alert(`Location tracking off.`, 'warning', 'fixed-bottom');
        return false;
      }
      if (error) {
        Bert.alert(error.reason, 'error', 'fixed-bottom');
        return error.reason;
      }
    });
  }
};

Modules.client.setGeolocation = setGeolocation;
