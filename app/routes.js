var mongoose = require('mongoose');
var Location = require('./models/gps');
var Event = require('./models/event');
var User = require('./models/user');
var Group = require('./models/group');

module.exports = function (app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

    //Create an event and return the event ID as a response
    app.post('/api/Event', function (req, res) {
        var event = new Event();
        //event.Number = 1; // Events id's are auto-created
        event.date = req.body.date; // This will be a date object sent from body
        event.location = mongoose.Types.ObjectId(req.body.location); // This will be an ID sent from body

        event.save(function (err) {
            console.log("Creating new event");
            if (err)
                res.send(err);
            console.log("EventId: " + event.id);
            res.json({
                message: 'Event created!',
                eventId: event.id
            });
        })
    });


    // This method finds ALL of the events.
    // Avoid using this.
    app.get('/api/Event', function (req, res) {
        Event.find(function (err, events) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(events); // return all locations in JSON format
        });
    });

    app.get('/api/EventLocation', function (req, res) {

        res.json({ latitude: -33.8665433, longitude: 151.1956316 }); // Dummy response for location API

    });

    app.get('/api/EventLocation/:event_ID', function (req, res) {

        if (req.params.event_ID == "test")
        {
            console.log("Location test 1..");
            var location1 = { latitude: 47.7594, longitude: -122.1911 }; // UW Bothell
            var location2 = { latitude: 47.6550, longitude: -122.3080 }; // UW Seattle
            var location3 = { latitude: 47.9633, longitude: -122.2006 }; // City of Everett
            var locations = [location1, location2, location3];

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
        else if(req.params.event_ID == "test2")
        {
            Location.find(function (err, locations)
            {
                console.log("Location test 2..");
                var returnLocation = { latitude: 0, longitude: 0 };
                for (var i = 0; i < locations.length && i < 10; i++) // No more than 10 locations, just in case
                {
                    returnLocation.latitude += locations[i].latitude;
                    returnLocation.longitude += locations[i].longitude;
                }
                returnLocation.latitude /= locations.length;
                returnLocation.longitude /= locations.length;
                res.json(returnLocation);
            });
        }
        else {
            Event.findOne({ '_id': req.params.event_ID }).populate("location").exec( function (err, event) {

                // if there is an error retrieving, send the error. 
                // nothing after res.send(err) will execute
                if (err) // This means that our location didn't exist
                    res.send(err); // This is effectively a 'return'

                console.log("Event: " + event);
                console.log("Location: " + event.location);
                console.log("Latitude: " + event.latitude);

                res.json(event.location); // return single location in JSON format
            });
        }
    })

    app.post('/api/EventLocation/:event_ID', function (req, res) {
        // The request is currently an event ID-- group ID might make sense too
        // enter method to do back-end location finding here
        res.json({ latitude: 47.7594, longitude: -122.1911 });
    });

    // This method gets ALL locations stored in the database.
    // Avoid using this. Use the :location_ID method instead.
    app.get('/api/Location', function (req, res) {
        Location.find(function (err, locations) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(locations); // return all locations in JSON format
        });
    });

    app.get('/api/Location/:location_ID', function (req, res) {
        Location.findOne({ '_id': req.params.location_ID }, function (err, location) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(location); // return single location in JSON format
        });
    });

    // sample api route
    // This finds ALL users. Avoid using this.
    app.get('/api/users', function (req, res) {
        // use mongoose to get all users in the database
        User.find(function (err, users) {
            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    // route to handle creating goes here (app.post)
    app.post('/api/users', function (req, res) {
        
        var user = new User();      // create a new instance of the User model
        user.name = req.body.name;  // set the user's name (comes from the request)

        // save the user and check for errors
        user.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'User named "' + req.body.name + '" created!' });
        });
        
    });

    // route to handle delete goes here (app.delete)

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};