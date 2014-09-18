'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Treatment
 * @description
 * # Treatment
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('ClinicalManagement', ['$http', '$q', function($http, $q) {

    return {
      getMacros: function() {

        var data = [
          {
            label: 'Discharge',
            id: 1,
            order: 1,
          },
          {
            label: 'Listed for cataract surgery',
            id: 2,
            order: 2,
          },
          {
            label: 'Listed for glaucoma surgery',
            id: 3,
            order: 3
          },
          {
            label: 'Referred to optometrist for annual examination',
            id: 4,
            order: 4
          },
          {
            label: 'Requires change in medication',
            id: 5,
            order: 5
          },
          {
            label: 'Stable – continue with current medication',
            id: 6,
            order: 6
          },
          {
            label: 'Medication changed / initiated',
            id: 7,
            order: 7
          },
          {
            label: 'Stable; continue observation',
            id: 8,
            order: 8
          },
          {
            label: 'Listed for laser treatment',
            id: 9,
            order: 9
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
