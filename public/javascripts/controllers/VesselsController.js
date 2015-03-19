var vesselsAdminApp = angular.module('VesselsAdminApp', ['vessel.services','ngRoute','ui.bootstrap']);


/**
 * Controller for principal view.
 */
vesselsAdminApp.controller('VesselViewController', function($scope,vessels, $modal){
    $scope.vessels = vessels[0];    //Vessels list, the [0] is because of an array of arrays is returned from server

    // Opens the modal when click in row. The appropriate vessel is passed to VesselMenuController
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

/**
 * Controls the Menu Modal.
 */
vesselsAdminApp.controller('VesselMenuController',
    function($scope,$modalInstance,$location,vessel,VesselShare,VesselService,$route){

    $scope.vessel = vessel; //Vessel selected

    /* Makes a drill down to the Vessel form.
    We use the VesselShare service in order to pass the corresponding vessel to the edit controller
     */
    $scope.editVessel = function() {
        $scope.cancel();
        VesselShare.setVessels(vessel);
        $location.path('/edit/'+vessel.id);
    };

    function handleSuccess () {
        $route.reload();
    }

    // Delete request. If is a success then whe reload de view.
    $scope.deleteVessel = function() {
        $scope.cancel();
        VesselService.remove($scope.vessel,handleSuccess);
    };

    // Close modal
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

/**
 * Control the new vessel additions.
 */
vesselsAdminApp.controller('VesselNewController', function($scope,$location,VesselService){

    $scope.buttonName = "Add";
    $scope.idNonEditable = false;

    function handleSuccess () {
        $location.path('/');
    }

    // Add request. If is a success then we return to the vessels list.
    $scope.submit = function() {
        VesselService.add($scope.vessel, handleSuccess);
    };

    //return to the vessels list.
    $scope.cancel = function() {
        $location.path('/');
    }

});

/**
 * Control vessel editions.
 */
vesselsAdminApp.controller('VesselEditController', function($scope,$location,vessel,VesselService){

    $scope.vessel = vessel;
    $scope.idNonEditable = true;
    $scope.buttonName = "Edit";

    function handleSuccess () {
        $location.path('/');
    }

    // Edit request. If is a success then we return to the vessels list.
    $scope.submit = function() {
        VesselService.edit($scope.vessel, handleSuccess);
    };

    //return to the vessels list.
    $scope.cancel = function() {
        $location.path('/');
    }
});

/**
 * Configurate app.
 */
vesselsAdminApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'VesselViewController',
            resolve: {
                // Obtaining a list of vessels from VesselService each time this route is located
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
