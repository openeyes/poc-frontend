'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Site
 * @description
 * # patientSearch
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Procedure', ['$http', 'ENV', function($http, ENV) {

    return {
      getProcedures: function(){
        return $http({
          method: 'GET',
          url: ENV.host + ENV.apiEndpoints.procedures
        });
      }
    };

  }]);
