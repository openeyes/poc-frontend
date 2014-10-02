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
      },
      getRetinalScans: function() {

        var images = [
          '/images/retinal-scans/1.png',
          '/images/retinal-scans/2.png',
          '/images/retinal-scans/3.png',
          '/images/retinal-scans/4.png',
          '/images/retinal-scans/5.png',
          '/images/retinal-scans/6.png'
        ];

        var response = {
          data: {
            rightEye: {
              crt: '40mm',
              st: '20mm',
              images: images
            },
            leftEye: {
              crt: '40mm',
              st: '20mm',
              images: images
            }
          }
        };

        var deferred = $q.defer();
        deferred.resolve(response);

        return deferred.promise;
      }
    };

  }]);
