//, 'rgkevin.datetimeRangePicker', 'vr.directives.slider', 'ngTouch'], [require('angular-touch')]
angular.module('EventCtrl', ['ngMaterial', 'ngMessages']).controller('EventController', function ($scope, $log) {
    // stripped out: , 'ui.bootstrap'
        $scope.tagline = 'The square root of life is pi!';
        $scope.user = {
            username: 'Enter Username',
            password: 'Enter Password',
        };
        $scope.mytime = new Date();

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
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function () {
            $scope.mytime = null;
        };
    })
    .config(function ($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });