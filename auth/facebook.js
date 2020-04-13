
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

//imports config page and init to serialize/deseralize passport
//allows us to store API and and Secret Key elsewhere
var config = require('../_config');
var init = require('./init');

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


//serialize user into session
init();

module.exports = passport;