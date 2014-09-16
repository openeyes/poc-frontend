'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Conditions
 * @description
 * # Conditions
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Conditions', ['$http', '$q', 'ENV', function($http, $q, ENV) {

		console.log(ENV);

    return {
      getCommorbidities: function(){
				var data = [
					{
						id: 1,
						label: 'Angina'
					},
					{
						id: 1,
						label: 'Asthma'
					},
					{
						id: 1,
						label: 'Blood Loss'
					},
				];

				var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
			}
    };

  }]);