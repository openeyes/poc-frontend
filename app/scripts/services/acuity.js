'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Acuity
 * @description
 * # Acuity
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Acuity', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    return {
      getAcuityFields: function(){
				var data = {
					measurements: [],
					corrections: [
						'Unaided',
						'Glasses',
						'Contact lens',
						'Pinhole',
						'Auto-refraction',
						'Formal refraction'
					]
				};

				for(var i = 0;i < 81;i++){
					data.measurements.push(i);
				}

				var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
			}
    };

  }]);
