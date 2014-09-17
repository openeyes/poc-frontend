'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Treatment
 * @description
 * # Treatment
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('InjectionManagement', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    return {
      getNoTreatmentReasons: function() {
        var data = [
          {
            label: 'DNA',
            other: false,
            id: 1,
            order: 1
          },
          {
            label: 'Infection',
            other: false,
            id: 2,
            order: 2
          },
          {
            label: 'CVA',
            other: false,
            id: 3,
            order: 4
          },
          {
            label: 'MI',
            other: false,
            id: 4,
            order: 5
          },
          {
            label: 'Spontaneous improvement',
            other: false,
            id: 5,
            order: 6
          },
          {
            label: 'Other',
            other: true,
            id: 6,
            order: 7
          }
        ];
        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
