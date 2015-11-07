Template.body.events({
  'click [data-role="permission-on"]': function ( event ) {
    event.preventDefault();
    debugger;

    Session.set('permission', true);
    Bert.alert( 'User Location On', 'success' );
    Modules.client.setGeolocation();
  }
});
