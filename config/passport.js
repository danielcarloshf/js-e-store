/**
 * File: src/config/passport.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Define passport local strategies for authentication.
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/User');
var CartItem = require('../app/models/CartItem');
var Address = require('../app/models/Address');

module.exports = function(passport) {

  // Serialize the user for the session:
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the user:
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local signup:
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback : true
  }, function(req, username, password, done) {
    process.nextTick(function() {
      User.findOne({
        'username' : username
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {
          var newUser = new User();

          // set the user's local credentials
          newUser.username = username;
          newUser.password = newUser.generateHash(password);
          newUser.firstname = req.param('firstname');
          newUser.lastname = req.param('lastname');

          // save the user
          newUser.save(function(err) {
            if (err) throw err;

            var newAddr = new Address();

            newAddr.street = req.param('street');
            newAddr.city = req.param('city');
            newAddr.number = req.param('number');
            newAddr.zipcode = req.param('zipcode');
            newAddr.state = req.param('state');
            newAddr.country = req.param('country');
            newAddr.username = username;

            newAddr.save(function(err) {
              if(err) throw err;
              return done(null, newUser);
            });
          });
        }
      });
    });
  }));

  // Login:
  passport.use('login', new LocalStrategy({
    passReqToCallback : true
  }, function(req, username, password, done) {
    User.findOne({ 'username' :  username }, function(err, user) {
      if (err)
        return done(err);

      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'));

      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

      return done(null, user);
    });
  }));
};
