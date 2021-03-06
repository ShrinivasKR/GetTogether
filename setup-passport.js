var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain:       'gettogetherusers.auth0.com',
    clientID:     'ZF9t8KToxIOVKSJe8a6CJdD9oqvh8Rup',
    clientSecret: 'R3JX57AUrGMIy2WxJHN_7DtKWoqX1hX_cJhfN2bVml_YTpaHsw5evqUZ3Te6p24w',
    callbackURL:  '/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;