Meteor.publish('userSettings', function (maxRows) {
  debugger;
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, { fields: {'settings':1}});
  }
  this.ready();
});
