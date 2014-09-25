'use strict';

angular.module('openeyesApp')
  .factory('Ticket', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    return {

      getTickets: function(workflowId, stepIndex) {

        var apiCall = ENV.host + ENV.apiEndpoints.getTickets
          .replace(':workflowId', workflowId)
          .replace(':stepIndex', stepIndex || 0);

        return $http({
          method: 'GET',
          url: apiCall
        });
      },

      getTicket: function(ticketId) {

        var apiCall = ENV.host + ENV.apiEndpoints.getTicket
          .replace(':ticketId', ticketId);

        return $http({
          method: 'GET',
          url: apiCall
        });
      }
    };
  }]);
