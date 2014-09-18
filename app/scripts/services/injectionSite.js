'use strict';

angular.module('openeyesApp')
  .factory('InjectionSite', ['$http', '$q', function($http, $q) {

    return {
      getLensStatuses: function() {

        var data = [
          {
            label: 'Phakic',
            defaultDistance: '4.0',
            id: 1,
            order: 1
          },
          {
            label: 'Aphakic',
            defaultDistance: '3.5',
            id: 2,
            order: 2
          },
          {
            label: 'Pseudophakic',
            defaultDistance: '3.5',
            id: 3,
            order: 3
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
