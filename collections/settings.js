Settings = new Meteor.Collection( 'Settings' );

Settings.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Settings.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let SettingsSchema = new SimpleSchema({
  "userId": {
    type: String,
    label: "The ID of the owner of this document"
  },
  "settings.locationTracking": {
    type: Boolean,
    label: "Allow geolocation tracking"
  }
});

Settings.attachSchema( SettingsSchema );
