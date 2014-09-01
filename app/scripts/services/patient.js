'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:patientService
 * @description
 * # patientService
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('patientService', ['$http', function($http) {

    var patientSearch = function(searchTerm) {
      console.log('searching...', searchTerm);
      return $http({
        method: 'GET',
        url: 'http://localhost:9000/data/patients.json'
      });
    };

    return {
      findPatients: function(searchTerm) { return patientSearch(searchTerm); },
    };
  }]);