'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Patient
 * @description
 * # Patient
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Patient', ['$http', '$q', function($http, $q) {

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
      }
    };
  }]);
