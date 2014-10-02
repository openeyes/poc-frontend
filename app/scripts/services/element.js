'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Element
 * @description
 * # Element
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Element', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    return {
      getElements: function(patientId, eType, date){
        var apiCall = ENV.host + ENV.apiEndpoints.getElements.replace(':patientId', patientId).replace(':elementType', eType).replace(':date', date);
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      getOCTImages: function(){

        var images = [
          '/images/oct-slices/sprite.jpg'
        ];

        var response = {
          data: {
            rightEye: images,
            leftEye: images
          }
        };

        var deferred = $q.defer();
        deferred.resolve(response);

        return deferred.promise;
      }
    };

  }]);
