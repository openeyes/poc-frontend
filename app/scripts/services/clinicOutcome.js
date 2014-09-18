'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Treatment
 * @description
 * # Treatment
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('ClinicOutcome', ['$http', '$q', function($http, $q) {

    return {
      getStatuses: function() {

        var data = [
          {
            label: 'Follow-up',
            id: 1,
            order: 1,
            followUp: true
          },
          {
            label: 'Discharge',
            id: 2,
            order: 2,
            followUp: false
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getRoles: function() {
        var data = [
          {
            label: 'Consultant',
            id: 1,
            order: 1,
            other: false
          },
          {
            label: 'Non Consultant Doctor',
            id: 2,
            order: 2,
            other: false
          },
          {
            label: 'Optometrist',
            id: 3,
            order: 3,
            other: false
          },
          {
            label: 'Clinic Nurse',
            id: 4,
            order: 4,
            other: false
          },
          {
            label: 'Any Clinician',
            id: 5,
            order: 5,
            other: false
          },
          {
            label: 'Other',
            id: 6,
            order: 6,
            other: true
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getQuantities: function() {

        var data = [];
        for(var i = 1; i < 13; i++) {
          data.push({
            id: i,
            label: i
          });
        }

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getPeriods: function() {

        var data = [
          {
            label: 'days',
            id: 1,
            order: 1
          },
          {
            label: 'weeks',
            id: 2,
            order: 2
          },
          {
            label: 'months',
            id: 3,
            order: 3
          },
          {
            label: 'years',
            id: 4,
            order: 4
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
