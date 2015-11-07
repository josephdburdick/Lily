Template.settings.events( {
  'change #user-geolocation': ( ev, template ) => {
    template.locationTracking.set(ev.target.checked);
    let result = Modules.client.setGeolocation(template.locationTracking.get());
    if (!result) {
      template.locationTracking.set(result);
      ev.target.checked = result;
    }
  }
} );

Template.settings.helpers( {
  checked: function () {
    return !!Template.instance().locationTracking.get() ? 'checked' : '';
  }
} );

Template.settings.onCreated( () => {
  let self = Template.instance();
  self.locationTracking = new ReactiveVar(false);

  Tracker.autorun( () => {
    self.subscribe( 'userSettings' );
    if (!!Settings.findOne()){
      let locationTracking = Settings.findOne().settings.locationTracking;
      self.locationTracking.set(locationTracking);
    }
  });
} );
