'use strict';

app.controller('CalculCtrl', ['$scope', 'calculService', function ($scope, calculService) {

    $scope.posterMessage = function () {

        calculService.posterMessage($scope.token, $scope.channel, $scope.username, $scope.iconUrl, $scope.text);
    };

}]);