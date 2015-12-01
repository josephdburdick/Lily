Meteor.publish('userSettings', function () {
  if (this.userId) {
    return Settings.find({
      userId: this.userId
    }, {
      fields: {
        'settings': 1
      }
    });
  }
  this.ready();
});
