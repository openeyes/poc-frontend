'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Event
 * @description
 * # Event
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Element', ['$http', '$q', 'ENV', 'MODEL_DOMAIN', function($http, $q, ENV, MODEL_DOMAIN) {

    console.log(ENV);

    return {
      getElements: function(patientId, eType, date){
        console.log(patientId, eType, date);
        // var apiCall = ENV.host + ENV.apiEndpoints.getElement.replace(':id', patientId);
        // return $http({
        //   method: 'GET',
        //   url: apiCall
        // });
        var data = {};
        data[MODEL_DOMAIN + 'VisualAcuity'] = [
          {
            type: '',
            rightEye: {
              readings: [
                { value: 1.0, correction: 'Glasses' }
              ],
              comment: ''
            },
            leftEye: {
              readings: [
                { value: 2.0, correction: 'Contact lenses' }
              ],
              comment: ''
            }
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data[eType]);

        return deferred.promise;

      }
    };

  }]);
