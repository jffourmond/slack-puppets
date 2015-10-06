'use strict';

app.controller('TalkCtrl', ['$scope', 'talkService', function ($scope, talkService) {

     $scope.token = 'xoxb-10286813046-VjlNLkHvqnpL0CeozQ3Lxa40';

     var SAISIE = 1;
     var ENVOI = 2;
     var OK = 3;
     var KO = 4;
     
    $scope.isStatutEnvoi = function (){
      return $scope.statut === ENVOI;
    };

    $scope.isStatutOK = function (){
      return $scope.statut === OK;
    };

    $scope.isStatutKO = function (){
      return $scope.statut === KO;
    };

    function setStatut(statut){
      $scope.statut = statut;
    }

    $scope.passerEnModeSaisie = function (){
       if ($scope.isStatutOK() || $scope.isStatutKO()){
	 $scope.text = undefined;
       }
       setStatut(SAISIE);
    };

    $scope.passerEnModeSaisie();

    $scope.posterMessage = function () {
        setStatut(ENVOI);
        talkService.posterMessage($scope.token, $scope.channel, $scope.username, $scope.iconUrl, $scope.text).
        then(function success(response){
           setStatut(OK);
        }, function error(response){
           setStatut(KO);
           $scope.errorMessage = response.data;
        });
    };

}]);
