Meteor.users.deny({
  update: function () {
    return true;
  }
});
let _createUsernameFromEmail = (email) => {
  return email.split('@')[0].toLowerCase();
};
let extendAccounts = () => {
  Accounts.onCreateUser(function (options, user) {

    // We still want the default hook's 'profile' behavior.
    if (options.profile)
      user.profile = options.profile;

    if (!user.username)
      user.username = _createUsernameFromEmail(user.emails[0].address);

    let settingsId = Settings.insert({
      userId: user._id
    });

    Settings.update({
      _id: settingsId
    }, {
      $set: {
        settings: {
          locationTracking: true
        }
      }
    });

    return user;
  });
};

Modules.server.extendAccounts = extendAccounts;
