angular.module('NerdCtrl', []).controller('NerdController', function($scope) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.visible = false;

    $scope.hide = function()
    {
        $scope.visible = !$scope.visible;
    }


});