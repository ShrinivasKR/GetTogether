angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

    .when('/nerds', {
        templateUrl: 'views/nerd.html',
        controller: 'NerdController'
    })

    .when('/geeks', {
        templateUrl: 'views/geek.html',
        controller: 'GeekController'
    })

    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })

    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
    })

    .when('/time', {
        templateUrl: 'views/time.html',
        controller: 'TimeController'
    })

    .when('/place', {
        templateUrl: 'views/place.html',
        controller: 'PlaceController'
    });
    $locationProvider.html5Mode(true);

}]);