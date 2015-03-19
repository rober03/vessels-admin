
var services = angular.module('vessel.services',[]);

services.service("VesselShare", function(){
    var _vessels = []

    this.setVessels = function (vessels) {
        _vessels = vessels;
    }

    this.getVessels = function () {
        return _vessels;
    }
})

services.service("VesselService", function($http,$q){
    this.add = function(vessel) {
        return $http.post("/vessel",vessel).then(handleSuccess,handleError);
    }

    this.edit = function(vessel) {
        return $http.put("/vessel/"+vessel.id,vessel).then(handleSuccess,handleError);
    }

    this.get = function(){
        return $http.get("/vessels").then(handleSuccess,handleError);
    }

    this.remove = function(vessel) {
        return  $http.delete("/vessel/"+vessel.id,
            {   dataType: "json",
                data: vessel,
                headers: {"Content-Type": "application/json"}
            }).then(handleSuccess,handleError);
    }


    // Useful functions

    function handleError( response ) {
        // The API response from the server should be returned in a
        // normalized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (! angular.isObject( response.data ) ||! response.data.message ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }

    function handleSuccess( response ) {
        return( response.data );
    }
})