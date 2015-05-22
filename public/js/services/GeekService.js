angular.module('GeekService', []).factory('GeekFactory', ['$http', function ($http)
{

    var locationService = {};

    // This method will get the event location of a particular event
    locationService.getEventLocation = function (eventID) // This might need to change to event name, or something
    {
        var request = {eID: eventID};
        return $http.post("/api/EventLocation", request);
    }

    return locationService;
}]);