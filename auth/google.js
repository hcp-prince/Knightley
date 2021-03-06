//imports passport and passport google-oauth20 modules
//to authenticate users via google
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

//imports the express module and
//creates router variable so we can create routes for our site


//imports config page and init to serialize/deseralize passport
//allows us to store API and and Secret Key elsewhere
var config = require('../_config');
var init = require('./init');

var enterUser = require("./enterUser");

//creates a new passport stratagey to authenticate users
//holds API Key, holds client secret, and callback link
//callback link must be the same as link google developers uses...
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret:  config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  (accessToken, refreshToken, profile, cb) => {
    return enterUser(profile, cb);
  }));

//serialize user into session
init();

module.exports = passport;
