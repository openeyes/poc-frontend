'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Allergies
 * @description
 * # Allergies
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Allergies', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    console.log(ENV);

    return {
      getAllergyMeds: function(){
        var data = [
          'Acetazolamide',
          'Atropine',
          'Carbamezapine',
          'Cephalosporins',
          'Fluorescin',
          'Iodine',
          'Latex'
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
