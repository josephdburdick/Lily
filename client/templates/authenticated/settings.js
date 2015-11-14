Template.settings.events({
  'change #user-geolocation': (ev, template) => {
    template.locationTracking.set(ev.target.checked);
    // let result = Modules.client.setGeolocation( template.locationTracking.get() );
    // if ( !result ) {
    //   template.locationTracking.set( result );
    //   ev.target.checked = result;
    // }
    console.log(template.locationTracking.get());
  },
  'blur #user-name': (ev, template) => {
    ev.currentTarget.value = ev.currentTarget.value.trim().split(' ').join('');
  },
  'submit #user-settings': (ev, template) => {
    ev.preventDefault();
    if (!$(ev.currentTarget).find('.error').length){
      let userSettings = {
        username: template.find('#user-name').value,
        locationTracking: $(template).find('#user-geolocation').is(':checked')
      };
      Meteor.call('updateUserSettings', userSettings, function (error, result) {
        if (!error) Bert.alert('Updated user settings', 'success');
        if (error) Bert.alert(error.reason, 'danger');
      });
    }
  }
});

Template.settings.helpers({
  checked: function () {
    return !!Template.instance().locationTracking.get() ? 'checked' : '';
  }
});

Template.settings.onCreated(() => {

  let self = Template.instance();
  self.locationTracking = new ReactiveVar(false);
  self.formChanged = new ReactiveVar(false);
  self.subscribe('userSettings');
  self.subscribe('allUserNames');

  Tracker.autorun((computation) => {
    if (!!Settings.findOne()) {
      let locationTracking = Settings.findOne().settings.locationTracking;
      self.locationTracking.set(locationTracking);
    }
  });
});

Template.settings.onRendered(() => {
  $('#user-settings').validate({
    rules: {
      userName: {
        isUniqueUsername: true,
        regex: "^[a-zA-Z'.\\s]{1,40}$",
        required: true,
        minlength: 3,
        maxlength: 24
      },
      emailAddress: {
        required: true,
      }
    },
    messages: {
      userName: {
        isUniqueUsername: "Username already taken.",
        regex: "Invalid character in username.",
        required: "You must input a username.",
        minlength: "Username must be at least 3 characters.",
        maxlength: "Username must not exceed 24 characters."
      },
      emailAddress: {
        required: "Email address is required."
      }
    }
  });
});

Template.settings.onDestroyed(() => {
  self.stop();
});
