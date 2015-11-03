Template.settings.events({
  'change #user-geolocation': (ev) => {
    debugger;
  }
});

Template.settings.helpers({
  // checked: function(){
  //
  // },
  // userSettings: function(){
  //   // return
  // }
});

Template.settings.onCreated( () => {
  let self = this;

  Tracker.autorun( () => {
    self.subscribe('userSettings',  () => {

    });
	});

});
