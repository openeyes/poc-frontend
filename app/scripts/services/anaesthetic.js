'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Treatment
 * @description
 * # Treatment
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Anaesthetic', ['$http', '$q', function($http, $q) {

    return {
      getTypes: function() {

        var data = [
          {
            label: 'Topical',
            id: 1,
            order: 1
          },
          {
            label: 'LA',
            id: 2,
            order: 2
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getDeliveries: function() {
        var data = [
          {
            label: 'Retrobulbar',
            id: 1,
            order: 1
          },
          {
            label: 'Peribulbar',
            id: 2,
            order: 2
          },
          {
            label: 'Subtenons',
            id: 3,
            order: 3
          },
          {
            label: 'Subconjunctival',
            id: 4,
            order: 4
          },
          {
            label: 'Topical',
            id: 5,
            order: 5
          },
          {
            label: 'Other',
            id: 6,
            order: 6
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getAgents: function() {
        var data = [
          {
            label: 'G Amethocaine',
            id: 1,
            order: 1
          },
          {
            label: 'G Benoxinate',
            id: 2,
            order: 2
          },
          {
            label: 'G Proxymetacaine',
            id: 3,
            order: 3
          },
          {
            label: 'Lignocaine 1%',
            id: 4,
            order: 4
          },
          {
            label: 'Bupivocaine',
            id: 5,
            order: 5
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
