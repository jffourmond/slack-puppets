'use strict';

app.controller('CalculCtrl', ['$scope', 'calculService', function ($scope, calculService) {

	$scope.token = 'xoxb-10286813046-VjlNLkHvqnpL0CeozQ3Lxa40';

    $scope.posterMessage = function () {

        calculService.posterMessage($scope.token, $scope.channel, $scope.username, $scope.iconUrl, $scope.text);
    };

}]);
