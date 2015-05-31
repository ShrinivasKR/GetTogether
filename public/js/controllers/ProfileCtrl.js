angular.module('ProfileCtrl', ['ngMaterial', 'ngMessages']).controller('ProfileController', function ($scope) {
        $scope.user = {
            username: 'Enter Username',
            password: 'Enter Password',
        };

        $scope.Times = [];
        $scope.TimesLength = 105;

        for (i = 0; i <= $scope.TimesLength; i++) {
            $scope.Times[i] = false;
        }

        $scope.setColor = function (btn, num) {
            var property = document.getElementById(btn);
            if ($scope.Times[num] == true) {
                property.style.backgroundColor = "#FFFFFF"
                $scope.Times[num] = false;
            } else {
                property.style.backgroundColor = "#76FF03"
                $scope.Times[num] = true;
            }
        }
        
    })
    .config(function ($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();
    });
