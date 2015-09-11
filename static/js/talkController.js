'use strict';

app.controller('TalkCtrl', ['$scope', 'talkService', function ($scope, talkService) {

	$scope.token = 'xoxb-10286813046-VjlNLkHvqnpL0CeozQ3Lxa40';

    $scope.posterMessage = function () {

        talkService.posterMessage($scope.token, $scope.channel, $scope.username, $scope.iconUrl, $scope.text);
    };

}]);
