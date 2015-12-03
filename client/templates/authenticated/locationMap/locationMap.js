if (Meteor.isClient) {
  Meteor.startup(() => {
    GoogleMaps.load();
  });
  Template.locationMap.events({

  });
  Template.locationMap.helpers({
    locationMapOptions: (params) => {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        let self = Template.instance();
        // Map initialization options
        if (self.locationTracking.get()) {
          let coords = self.coords.get() || Session.get('userCoords');
          if (!!coords) {
            return {
              center: new google.maps.LatLng(coords.lat, coords.lng),
              disableDefaultUI: true,
              zoomControl: true,
              scrollwheel: false,
              zoom: 16
            };
          }
        } else {
          return {
            center: new google.maps.LatLng(40.783435, -73.966249),
            disableDefaultUI: true,
            zoomControl: true,
            scrollwheel: false,
            zoom: 12
          };
        }
      }
    }
  });

  Template.locationMap.onCreated(() => {

    let self = Template.instance();

    self.locationTracking = new ReactiveVar(false);
    self.coords = new ReactiveVar(false);
    self.subscribe('userSettings');
    self.subscribe('lastUserMarker');

    if (Session.get('userCoords')) {
      self.subscribe('nearestMarkers', Session.get('userCoords'));
    }

    Tracker.autorun(function () {
      if (!!Settings.findOne()) {
        let locationTracking = Settings.findOne().settings.locationTracking;
        self.locationTracking.set(locationTracking);

        if (self.locationTracking.get()) {
          if (!Geolocation.latLng()) {
            self.coords.set(Modules.client.setGeolocation(true, self));
          }
        }
      }
    });
  });

  Template.locationMap.onRendered(() => {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('locationMap', (map) => {
      // Add markers once map is ready
      let
        lat = map.options.center.lat,
        lng = map.options.center.lng;

      var markers = {};
      Markers.find().observe({
        added: function (document) {
          // Create a marker for this document
          var infowindow = new google.maps.InfoWindow();
          var marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.coordinates.lat, document.coordinates.lng),
            map: map.instance,
            // We store the document _id on the marker in order
            // to update the document within the 'dragend' event below.
            _id: document._id,
            ownerId: document.ownerId
          });

          // marker.set('title', venue.name);
          marker.addListener('click', function (e) {
            infowindow.setContent(document.coordinates.lat.toString());
            infowindow.open(map.instance, marker);
          });


          $(window).on('resize', function () {
            map.instance.setCenter(new google.maps.LatLng(Session.get('lat'), Session.get('lon')));
          });

          // This listener lets us drag markers on the map and update their corresponding document.
          google.maps.event.addListener(marker, 'dragend', function (event) {
            Markers.update(marker._id, {
              $set: {
                coordinates: {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng()
                }
              }
            });
            console.log(event);
            Meteor.call('upsertMarker', {
              _id: marker._id,
              ownerId: Meteor.userId(),
              type: 'User',
              coordinates: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
              },
              updated: new Date()
            }, function(error, result) {
              if (!error) {
                Bert.alert('Marker updated', 'success', 'fixed-top');
              }
              if (error) {
                Bert.alert(error.reason, 'error', 'fixed-top');
              }
            });
          });

          // Store this marker instance within the markers object.
          markers[document._id] = marker;
        },
        changed: function (newDocument, oldDocument) {
          markers[newDocument._id].setPosition({
            lat: newDocument.coordinates.lat,
            lng: newDocument.coordinates.lng
          });
        },
        removed: function (oldDocument) {
          // Remove the marker from the map
          markers[oldDocument._id].setMap(null);

          // Clear the event listener
          google.maps.event.clearInstanceListeners(
            markers[oldDocument._id]);

          // Remove the reference to this marker instance
          delete markers[oldDocument._id];
        }
      });

    });
  });

}
