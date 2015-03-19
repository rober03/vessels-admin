var vesselsAdminApp = angular.module('VesselsAdminApp', ['vessel.services','ngRoute','ui.bootstrap']);

vesselsAdminApp.controller('VesselViewController', function($scope,vessels, $modal){
    $scope.vessels = vessels[0];
    $scope.title = "Vessels List";

    $scope.showVesselOptions = function(vesselSelected) {
        $modal.open({
            templateUrl: '/assets/templates/modal-menu.html',
            controller: 'VesselMenuController',
            resolve: {
                vessel: function () {
                    return vesselSelected;
                }
            }
        });
    }
});

vesselsAdminApp.controller('VesselMenuController',
    function($scope,$modalInstance,$location,vessel,VesselShare,VesselService,$route){

    $scope.vessel = vessel;

    $scope.editVessel = function() {
        $scope.cancel();
        VesselShare.setVessels(vessel);
        $location.path('/edit/'+vessel.id);
    }

    function handleSuccess () {
        $route.reload();
    }

    $scope.deleteVessel = function() {
        $scope.cancel();
        VesselService.remove($scope.vessel,handleSuccess);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

vesselsAdminApp.controller('VesselNewController', function($scope,$location,VesselService){

    $scope.title = "Vessels Form";
    $scope.buttonName = "Add";
    $scope.idNonEditable = false;

    function handleSuccess () {
        $location.path('/');
    }

    $scope.submit = function() {
        VesselService.add($scope.vessel, handleSuccess);
    }

    $scope.cancel = function() {
        $location.path('/');
    }

});

vesselsAdminApp.controller('VesselEditController', function($scope,$location,vessel,VesselService){

    $scope.title = "Vessels Form";
    $scope.vessel = vessel;
    $scope.idNonEditable = true;
    $scope.buttonName = "Edit";

    function handleSuccess () {
        $location.path('/');
    }

    $scope.submit = function() {
        VesselService.edit($scope.vessel, handleSuccess);
    }

    $scope.cancel = function() {
        $location.path('/');
    }
});

vesselsAdminApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'VesselViewController',
            resolve: {
                vessels: function(VesselService) {
                    return VesselService.get();
                }
            },
            templateUrl:'/assets/templates/list.html'

        }).when('/new', {
            controller: 'VesselNewController',
            templateUrl:'/assets/templates/form.html'

        }).when('/edit/:vesselId', {
            controller: 'VesselEditController',
            resolve: {
                vessel: function(VesselShare) {
                    return VesselShare.getVessels();
                }
            },
            templateUrl:'/assets/templates/form.html'

        }).otherwise({redirectTo:'/'});
}]);
