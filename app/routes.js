var Nerd = require('./models/nerd');

module.exports = function (app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

    app.get('/api/EventLocation', function (req, res) {

        res.json({ latitude: -33.8665433, longitude: 151.1956316 }); // Dummy response for location API

    });

    app.post('/api/EventLocation', function (req, res) {
        // The request is currently an event ID-- group ID might make sense too
        // enter method to do back-end location finding here
        if (req.body.type == "Test location") {
            var location1 = { latitude: 47.7594, longitude: -122.1911 }; // UW Bothell
            var location2 = { latitude: 47.6550, longitude: -122.3080 }; // UW Seattle
            var location3 = { latitude: 47.9633, longitude: -122.2006 }; // City of Everett
            var location4 = { latitude: 47.7717, longitude: -122.2044 }; // City of Bothell
            var locations = [location1, location2, location3, location4];

            var returnLocation = { latitude: 0, longitude: 0 };
            for (var i = 0; i < locations.length; i++)
            {
                returnLocation.latitude += locations[i].latitude;
                returnLocation.longitude += locations[i].longitude;
            }
            returnLocation.latitude /= locations.length;
            returnLocation.longitude /= locations.length;
            res.json(returnLocation);
        }
        else {
            res.json({ latitude: 47.7594, longitude: -122.1911 }); // Dummy response for location API; Google in Australia
        }
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