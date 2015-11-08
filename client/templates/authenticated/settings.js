Template.settings.events( {
  'change #user-geolocation': ( ev, template ) => {
    template.locationTracking.set( ev.target.checked );
    let result = Modules.client.setGeolocation( template.locationTracking.get() );
    if ( !result ) {
      template.locationTracking.set( result );
      ev.target.checked = result;
    }
  },
  'keypress #user-name': (ev, template) => {
    var keypressTimer = setTimeout(() => {
      console.log(ev.currentTarget.value)
    }, 500);
  }
} );

Template.settings.helpers( {
  checked: function () {
    return !!Template.instance().locationTracking.get() ? 'checked' : '';
  }
} );

Template.settings.onCreated( () => {
  let self = Template.instance();
  self.locationTracking = new ReactiveVar( false );
  self.subscribe( 'userSettings' );

  Tracker.autorun( ( computation ) => {
    if ( !!Settings.findOne() ) {
      let locationTracking = Settings.findOne().settings.locationTracking;
      self.locationTracking.set( locationTracking );
    }
  } );
} );

Template.settings.onRendered( () => {
});

Template.settings.onDestroyed( () => {
  self.stop();
} );
