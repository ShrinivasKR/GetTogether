﻿angular.module('EventService', []).factory('EventFactory', ['$http', function ($http) {

    var eventService = {};

    // This method will return a suggested location based on the input of
    //  an array of users
    eventService.suggestEventLocaiton = function(usersData)
    {
        console.log("Suggesting event for Users: " + usersData);
        var params = { users: usersData };
        return $http.post('api/EventLocation', params);
    }

    // Get an event by eventID -- Includes the event's location and creator data
    //  The atendees come over as IDs
    eventService.getEvent = function(eventID)
    {
        return $http.get('/api/Event/' + eventID);
    }

    // This method will get the event location of a particular event
    eventService.getEventLocation = function (eventID) // This might need to change to event name, or something
    {
        //return $http.post("/api/EventLocation/" + eventID, request);
        return $http.get("/api/EventLocation/" + eventID)//, request);
    }

    eventService.createLocation = function (locationData) {
        return $http.post('/api/Location', locationData);
    }

    eventService.createEvent = function (eventData) {
        console.log("Creating an event..");
        return $http.post('/api/Event', eventData);
    }

    return eventService;
}]);