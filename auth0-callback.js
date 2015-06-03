var passport = require('passport');

module.exports = function(app) {
// Auth0 callback handler
	app.get('/callback',
  	passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  	function(req, res) {
	    if (!req.user) {
    	  throw new Error('user null');
    	}
    	res.redirect("/user");
  	});
}