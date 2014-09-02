'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Sites
 * @description
 * # patientSearch
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Sites', ['$http', 'ENV', function($http, ENV) {

    return {
      getSites: function(){
        return $http({
          method: 'GET',
          url: ENV.host + ENV.apiEndpoints.sites
        });
      },
      getLasersForSite: function(id){
        var apiCall = (ENV.name === 'dev') ? ENV.host + ENV.apiEndpoints.siteLasers.replace('<id>', id) : ENV.apiEndpoints.siteLasers + id;
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      getLaserOperators: function(){
        return $http({
          method: 'GET',
          url: ENV.host + ENV.apiEndpoints.laserOperators
        });
      },

    };

  }]);