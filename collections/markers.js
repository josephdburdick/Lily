Markers = new Meteor.Collection( 'Markers' );

Markers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Markers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let MarkersSchema = new SimpleSchema({
  "ownerId": {
    type: String,
    label: "The ID of the owner of this document"
  },
  "type": {
    type: String,
    label: "The kind of marker (user, venue, etc)"
  },
  "lat": {
    type: Number,
    decimal: true,
    unique: true,
    label: "Marker Latitude"
  },
  "lng": {
    type: Number,
    decimal: true,
    unique: true,
    label: "Marker Longitude"
  },
  "created": {
    type: Date,
    label: "Date created Marker in System",
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date ();
      }
    }
  },
  "updated": {
    type: Date,
    label: "Date updated Marker in System",
    optional: true,
    autoValue: function () {
      if ( this.isInsert ) {
        return new Date ();
      }
    }
  }
});

Markers.attachSchema( MarkersSchema );
