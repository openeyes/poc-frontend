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
      getInjectionQuestions: function(disorderId, secondaryToDisorderId) {

        console.info('Getting injection questions. DisorderID:', disorderId, 'SecondaryToDisorderId', secondaryToDisorderId);

        var data = disorderId === 1 ? [
          {
            label: 'CRT Increase <100',
            id: 1,
            order: 1
          },
          {
            label: 'CRT >= 100',
            id: 2,
            order: 2
          },
          {
            label: 'Loss of 5 letters',
            id: 3,
            order: 3
          },
          {
            label: 'Loss of letter >5',
            id: 4,
            order: 4
          }
        ] : [];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getRisks: function() {
        var data = [
          {
            id: 1,
            label: 'Pre-existing glaucoma',
            order: 1
          },
          {
            id: 2,
            label: 'CVARemove',
            order: 2
          },
          {
            id: 3,
            label: 'Previous glaucoma surgery (trabeculectomy bleb, glaucoma draining device)',
            order: 3
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
