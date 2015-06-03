// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var passport = require('passport');

// This is the file we created in step 2.
// This will configure Passport to use Auth0
var strategy = require('./setup-passport');

// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');

// configuration ===========================================
	
// config files
/*
var passport = require('passport');
	var Auth0Strategy = require('passport-auth0');

	var strategy = new Auth0Strategy({
    	domain:       'gettogetherusers.auth0.com',
    	clientID:     'DvVb0iJIFk7b9xr9hDVk6IyGflK4CI1C',
    	clientSecret: 'Ybyy2VZFRqHKpbbn8s3UqBCavI8FPsLp84gC-uD8CIe-j2yhd0lxrGua56OudHPy',
    	callbackURL:  '/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
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
*/
app.use(cookieParser());
app.use(session({ secret: 'shhhhhhhhh' }));

app.use(passport.initialize());
app.use(passport.session());

var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);
console.log('Make sure C:\\Program Files\\MongoDB\\Server\\3.0\\bin\\mongod.exe is running first.');
console.log('Web server is running.');	
console.log('Open a Web browser to the URL: localhost:' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app