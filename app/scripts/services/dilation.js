'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Dilation
 * @description
 * # Dilation
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Dilation', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    console.log(ENV);

    return {
      getDilationMeds: function(){
        var data = [
          'Cyclopentolate 0.5%',
          'Cyclopentolate 1 %',
          'Phenylephrine 2.5%',
          'Tropicamide 0.5 %',
          'Tropicamide 1%'
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
