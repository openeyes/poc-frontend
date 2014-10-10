'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:History
 * @description
 * # History
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('History', ['$http', '$q', function($http, $q) {

    return {
      getSlugs: function(){
        var data = {
          history: [
            {
              id: 1,
              label: 'Blurred vision'
            },
            {
              id: 1,
              label: 'Difficulty with reading'
            },
            {
              id: 1,
              label: 'Follow up visit'
            },
            {
              id: 1,
              label: 'Glare'
            },
            {
              id: 1,
              label: 'Gradual deterioration of vision'
            },
            {
              id: 1,
              label: 'Pseudophakia'
            },
          ],
          severity: [
            {
              id: 1,
              label: 'Mild'
            },
            {
              id: 1,
              label: 'Moderate'
            },
            {
              id: 1,
              label: 'Severe'
            },
          ],
          onset: [
            {
              id: 1,
              label: 'Gradual onset'
            },
            {
              id: 1,
              label: 'Noticed by optometrist'
            },
            {
              id: 1,
              label: 'Noticed by parent'
            },
            {
              id: 1,
              label: 'Sudden onset'
            },
          ],
          eye: [
            {
              id: 1,
              label: 'Both eyes'
            },
            {
              id: 1,
              label: 'Left eye'
            },
            {
              id: 1,
              label: 'Left more than right'
            },
            {
              id: 1,
              label: 'Right eye'
            },
            {
              id: 1,
              label: 'Right more than left'
            },
          ],
          duration: [
            {
              id: 1,
              label: '1 day'
            },
            {
              id: 1,
              label: '2-3 days'
            },
            {
              id: 1,
              label: '1 week'
            },
            {
              id: 1,
              label: '2 weeks'
            },
            {
              id: 1,
              label: '1 month'
            },
            {
              id: 1,
              label: '6 months'
            },
            {
              id: 1,
              label: 'More than 6 months'
            },
          ],
        };

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
