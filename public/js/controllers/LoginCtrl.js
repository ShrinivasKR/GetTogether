angular.module('LoginCtrl', []).controller('LoginController', function($scope) {
    $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
    };
  })
  .config( function($mdThemingProvider){

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

  });



