'use strict';

angular.module('openeyesApp')
  .factory('Complications', ['$http', '$q', function($http, $q) {
    return {
      getInjectionComplications: function(){
        var data = [
          {
            id: 1,
            label: 'Subconjunctival haemorrhage',
            order: 1,
            other: false
          },
          {
            id: 2,
            label: 'Conjunctival damage (e.g. tear)',
            order: 2,
            other: false
          },
          {
            id: 3,
            label: 'Corneal abrasion',
            order: 3,
            other: false
          },
          {
            id: 4,
            label: 'Lens damage',
            order: 4,
            other: false
          },
          {
            id: 5,
            label: 'Retinal damage',
            order: 5,
            other: false
          },
          {
            id: 6,
            label: 'Other',
            order: 6,
            other: true
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
