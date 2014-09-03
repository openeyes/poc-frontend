'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:patientSearch
 * @description
 * # patientSearch
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('PatientSearch', ['$http', 'ENV', function($http, ENV) {

    return {
      findPatients: function(searchTerm){
        // var apiCall = (ENV.name === 'dev') ? ENV.host + ENV.apiEndpoints.patients : ENV.apiEndpoints.patients + '=' + searchTerm;
        var apiCall = ENV.host + ENV.apiEndpoints.patients;
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      getPatient: function(id){
        // var apiCall = (ENV.name === 'dev') ? ENV.host + ENV.apiEndpoints.patient.replace('<id>', id) : ENV.apiEndpoints.patient + id;
        var apiCall = ENV.host + ENV.apiEndpoints.patient.replace('<id>', id);
        return $http({
          method: 'GET',
          url: apiCall
        });
      }
    };

  }]);