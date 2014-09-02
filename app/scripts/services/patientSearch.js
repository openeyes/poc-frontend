'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:patientSearch
 * @description
 * # patientSearch
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('patientSearch', ['$http', function($http) {

    return {
      findPatients: function(searchTerm){
        console.log('searching...', searchTerm);
        return $http({
          method: 'GET',
          url: 'http://localhost:9000/data/patients.json'
        });
      },
      getPatient: function(id){
        console.log('retrieving...', id);
        return $http({
          method: 'GET',
          url: 'http://localhost:9000/data/patient-' + id + '.json'
        });
      }
    };

  }]);