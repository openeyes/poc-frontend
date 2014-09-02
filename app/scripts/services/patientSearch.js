'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:patientSearch
 * @description
 * # patientSearch
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('patientSearch', ['$http', 'ENV', function($http, ENV) {

    return {
      findPatients: function(searchTerm){
        console.log('searching...', searchTerm);
        console.log(ENV);
        return $http({
          method: 'GET',
          url: ENV.host + ENV.apiEndpoints.patients
        });
      },
      getPatient: function(id){
        console.log('retrieving...', id);
        var apiCall = (ENV.name === 'dev') ? ENV.host + ENV.apiEndpoints.patient.replace('<id>', id) : ENV.apiEndpoints.patient + id;
        return $http({
          method: 'GET',
          url: apiCall
        });
      }
    };

  }]);