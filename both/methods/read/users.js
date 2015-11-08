// Meteor.methods( {
//   isUsernameAvailable: function ( username ) {
//     console.log('firing isUsernameAvailable method.')
//     check( username, String );
//     var userExistsId = Settings.find( {
//     }, {
//       fields: {
//         '_id': 1,
//         "profile.username": username
//       }
//     } );
//     // If exists
//     if ( userExistsId && userExistsId.userId != Meteor.userId() ) {
//       return {
//         _id: userExistsId
//       };
//     } else {
//       return false;
//     }
//   }
// } );
