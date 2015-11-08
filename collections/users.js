Meteor.users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

/*
  Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.online': true }} );
*/
