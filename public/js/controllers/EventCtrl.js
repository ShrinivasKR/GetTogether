//, 'rgkevin.datetimeRangePicker', 'vr.directives.slider', 'ngTouch'], [require('angular-touch')]
angular.module('EventCtrl', ['ngMaterial', 'ngMessages']).controller('EventController', ["$scope", "EventFactory", function ($scope, eventFactory) {
    // stripped out: , 'ui.bootstrap'

    /* ======= Scope variables  ======= */
    $scope.user = {
        username: 'Enter Username',
        password: 'Enter Password',
    };
    $scope.mytime = new Date(); // This will be the time used to create the final event 
    $scope.myLocation = { latitude: null, longitude: null }; // As above, for the location
    $scope.userId = ['556a4f80ecff2b7c03a2fa71']; // Example of our user creating the event
    $scope.usersData = ['name1', 'name2', 'name3']; // Example
    var usersData = ['556a4f80ecff2b7c03a2fa71', '556a4f88ecff2b7c03a2fa72', '556a4f8decff2b7c03a2fa73']; // Also example

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;

    /* ======= Maps variables ======= */
    var map;
    var initialZoom = 15;
    var zoomIncriment = 2;
    var expanionNum = 0;
    var maxExpansionNum = 4;
    $scope.locationStatus = "Please enter users in order to auto-generate a place";

    /* ======= Scope functions ======= */
    $scope.toggleMode = function () {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.mytime = d;
    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function () {
        $scope.mytime = null;
    };

    $scope.createEvent = function ()
    {
        // Create an event
        var event = {
            date: $scope.mytime,
            location: $scope.myLocation,
            users: usersData, // People attending
            creator: $scope.userId // The person creating
        };
        eventFactory.createEvent(event);
    };

    $scope.suggestLocation = function()
    {
        eventFactory.suggestEventLocaiton(usersData)
            .success(function (locationData) {
                myLocation = locationData;
                $scope.locationStatus = "Retrived Location: " + locationData.latitude + ", " + locationData.longitude;

                //$scope.nerdData = nerdList;
            })
            .error(function (error) {
                $scope.locationStatus = 'Unable to load location: ' + error.message;
            });
    }

    /*$scope.getEventLocation = function () // Should probably take paramaters
    {
        
        var eventID = '556a43bf27c78d1011059d2b';
        eventFactory.getEventLocation(eventID)
            .success(function (locationData) {
                $scope.locationStatus = "Retrived Location: " + locationData.latitude + ", " + locationData.longitude;

                //$scope.nerdData = nerdList;
            })
            .error(function (error) {
                $scope.locationStatus = 'Unable to load location: ' + error.message;
            });
    };*/
}])
.config(function ($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
});