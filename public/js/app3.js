(function(angular, undefined){
  "use strict";
  angular.module('demoApp', ['ngMaterial', "ngRoute"])
         .config(["$routeProvider", function($routeProvider) {
            $routeProvider.when("/view1", {templateUrl: "partials/view1.html"});
            $routeProvider.when("/view2", {templateUrl: "partials/view2.html"});
            $routeProvider.when("/view3", {templateUrl: "partials/view3.html"});
            $routeProvider.otherwise({redirectTo: "/view1"});
        }])
        /**
         *  Simple controller to build a `user` data model
         *  that will be used to databinding with `<tf-float>` directives
         */
        .controller('DemoController',function($scope, $location, $log){
            $scope.selectedIndex = 0;
    
            $scope.$watch('selectedIndex', function(current, old) {
              switch(current) {
                case 0: $location.url("/view1"); break;
                case 1: $location.url("/view2"); break;
                case 2: $location.url("/view3"); break;
                
              }
            });
        });
  
})(angular);