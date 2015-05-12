angular.module('NerdCtrl', []).controller('NerdController', ["$scope","NerdFactory", function ($scope, nerdFactory) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    $scope.visible = false;
    $scope.nerdData = "Get nerds.."

    $scope.hide = function()
    {
        $scope.visible = !$scope.visible;
    }

    $scope.getNerdsList = function ()
    {
        nerdFactory.getAllNerds()
            .success(function (nerdList) {
                $scope.nerdData = nerdList;
            })
            .error(function (error) {
                $scope.status = 'Unable to load nerd data: ' + error.message;
            });
    }

    $scope.create = function()
    {

    }
}]);