var Nerd = require('./models/nerd');

module.exports = function (app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

    app.get('/api/EventLocation', function (req, res) {

        res.json({lat: -33.8665433, long: 151.1956316}); // Dummy response for location API

    });

    app.post('/api/EventLocation', function (req, res) {

        // enter method to do back-end location finding here
        res.json({ lat: -33.8665433, long: 151.1956316 }); // Dummy response for location API
    });

    // sample api route
    app.get('/api/nerds', function (req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function (err, nerds) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    app.post('/api/nerds', function (req, res) {
        
        var nerd = new Nerd();      // create a new instance of the Nerd model
        nerd.name = req.body.name;  // set the nerd's name (comes from the request)

        // save the nerd and check for errors
        nerd.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Nerd named "' + req.body.name + '" created!' });
        });
        
    });

    // route to handle delete goes here (app.delete)

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};