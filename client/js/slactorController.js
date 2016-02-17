'use strict';

app.controller('SlactorCtrl', ['$scope', 'slactorService', function ($scope, slactorService) {

    var SAISIE = 1;
    var ENVOI = 2;
    var OK = 3;
    var KO = 4;

    $scope.isStatutEnvoi = function () {
        return $scope.statut === ENVOI;
    };

    $scope.isStatutOK = function () {
        return $scope.statut === OK;
    };

    $scope.isStatutKO = function () {
        return $scope.statut === KO;
    };

    function setStatut(statut) {
        $scope.statut = statut;
    }

    $scope.passerEnModeSaisie = function () {
        if ($scope.isStatutOK() || $scope.isStatutKO()) {
            $scope.text = undefined;
        }
        setStatut(SAISIE);
    };

    $scope.posterMessage = function () {
        setStatut(ENVOI);
        slactorService.posterMessage($scope.channel, $scope.username, $scope.iconUrl, $scope.text, $scope.password).
            then(function success(response) {
                setStatut(OK);
            }, function error(response) {
                setStatut(KO);
                $scope.errorMessage = response.data;
            });
    };

    $scope.channel = '#general';
    $scope.passerEnModeSaisie();

}]);
