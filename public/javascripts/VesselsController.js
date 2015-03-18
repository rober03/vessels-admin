var vesselsAdminApp = angular.module('VesselsAdminApp', []);

vesselsAdminApp.controller('VesselController', function($scope,$http){
    $scope.loadVessels = function() {
        $http.get("/vessels").success(function(vesselList){
            $scope.vessels = vesselList[0];
        });
    };

    $scope.deleteVessel = function(vessel) {
        $http.delete("/vessel/"+vessel.id).success(function(status){
            $scope.status = status;
            $scope.loadVessels();
        });
    };

    $scope.newVessel = function(vessel) {
        $http.post("/vessel",vessel).success(function(status){
            $scope.status = status;
            $scope.loadVessels();
        });
    }

    $scope.editVessel = function(vessel) {
        $http.put("/vessel/"+vessel.width+"/"+vessel.length+"/"+vessel.draft,vessel).success(function(status){
            $scope.status = status;
            $scope.loadVessels();
        });
    }

});