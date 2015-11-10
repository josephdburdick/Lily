Networks = new Meteor.Collection( 'networks' );

Networks.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Networks.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let NetworkSchema = new SimpleSchema({
  "ownerId" : {
    type: String,
    label: "Networks Owner"
  },
  "name" : {
    type: String,
    label: "Networks name"
  },
  "password" : {
    type: [String, Boolean],
    label: "Networks password"
  },
  "isPublic" : {
    type: String,
    label: "Networks isPublic"
  },
  "verified" : {
    type: Boolean,
    label: "Networks verified"
  }
});

Networks.attachSchema( NetworkSchema );
