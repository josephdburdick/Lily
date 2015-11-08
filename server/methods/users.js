Meteor.methods( {
  isUsernameAvailable: function( username ) {
    if ( !this.userId ) {
      throw new Meteor.Error( 401, 'not-authorized' );
    }
    check( username, String );

    var userExistsId = Meteor.users.findOne( {
      username: username
    } );
    if ( userExistsId && userExistsId._id != Meteor.userId() ) {
      return false;
    } else {
      return true;
    }
  },
  changeUsername: function( username ) {
    if ( !this.userId ) {
      throw new Meteor.Error( 401, 'not-authorized' );
    }
    check( username, String );
    let available = Meteor.call('isUsernameAvailable', username);
    if ( available ) {
      Meteor.users.update( {
        _id: Meteor.userId()
      }, {
        $set: {
          'username': username
        }
      } );
      return true;
    } else {
      throw new Meteor.Error( 401, `Username <strong>${username}</strong> is already taken.` );
    }
  }
} );
