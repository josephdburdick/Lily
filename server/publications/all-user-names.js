Meteor.publish('allUserNames', function () {
  if (this.userId) {
    return Meteor.users.find({}, {
      fields: {
        'username': 1
      }
    });
  }
  this.ready();
});
