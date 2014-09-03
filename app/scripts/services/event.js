'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Event
 * @description
 * # Event
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Event', ['$http', 'ENV', function($http, ENV) {

    return {
      getEventsForPatient: function(patientId){
        var apiCall = (ENV.name === 'dev') ? ENV.host + ENV.apiEndpoints.patientEvents.replace('<id>', patientId) : ENV.apiEndpoints.patientEvents + patientId;
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      getEvent: function(patientId, eventId){
        var apiCall = (ENV.name === 'dev') ? ENV.host + ENV.apiEndpoints.event.replace('<pid>', patientId).replace('<eid>', eventId) : ENV.apiEndpoints.event + patientId + '/' + eventId;
        return $http({
          method: 'GET',
          url: apiCall
        });
      }
    };

  }]);