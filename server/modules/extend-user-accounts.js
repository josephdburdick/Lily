Meteor.users.deny({
  update: function() {
    return true;
  }
});

let extendAccounts = () => {
  Accounts.onCreateUser(function(options, user) {

    // We still want the default hook's 'profile' behavior.
    if (options.profile)
      user.profile = options.profile;
    else {
      user.settings = {};
    }
    return user;
  });
};

Modules.server.extendAccounts = extendAccounts;
