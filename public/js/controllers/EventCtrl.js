//, 'rgkevin.datetimeRangePicker', 'vr.directives.slider', 'ngTouch'], [require('angular-touch')]
angular.module('EventCtrl', ['ngMaterial', 'ngMessages']).controller('EventController', ["$scope", "EventFactory", function ($scope, eventFactory) {
        // stripped out: , 'ui.bootstrap'

        $scope.user = {
            username: 'Enter Username',
            password: 'Enter Password',
        };
        $scope.date = new Date(); // This will be the time used to create the final event
        $scope.myLocation = {
            latitude: null,
            longitude: null
        }; // As above, for the location

        $scope.setTime = function () {

        }

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
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

        /* Location stuff */
        $scope.locationStatus = "Please enter users in order to auto-generate a place";

        $scope.createEvent = function () // Should take paramaters, probably
            {
                // Create an example event
                var eventDate = $scope.mytime;

                var locationID = '55621a44fc7fc4b006d34ca3';
                var event = {
                    date: eventDate,
                    location: locationID

                };
                eventFactory.createEvent(event);
            };

        $scope.getEventLocation = function () // Should take paramaters
            {
                var eventID = '55676b1a846524bc14f2efa2';
                eventFactory.getEventLocation(eventID)
                    .success(function (locationData) {
                        $scope.locationStatus = "Retrived Location: " + locationData.latitude + ", " + locationData.longitude;

                        //$scope.nerdData = nerdList;
                    })
                    .error(function (error) {
                        $scope.locationStatus = 'Unable to load location: ' + error.message;
                    });
            };
}])
    .config(function ($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });
