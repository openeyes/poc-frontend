'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Patient
 * @description
 * # Patient
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Patient', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    return {

      getExistingAllergies: function(patientId){
        console.log(patientId);

        var data = [
          {name: 'Atropine', comment: ''},
          {name: 'Fluorescin', comment: ''}
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },

      getPatientsForStep: function(step) {
        var searchTerm = 'u';
        var apiCall = ENV.host + ENV.apiEndpoints.patients.replace(':term', searchTerm);
        return $http({
          method: 'GET',
          url: apiCall,
          cache: true
        });
      }
    };
  }]);
