'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:PatientCtrl
 * @description
 * # PatientCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('PatientCtrl', function ($scope, $routeParams, PatientSearch, Event) {
    
		$scope.patient = null;
		$scope.patientId = $routeParams.patientId;
		PatientSearch.getPatient($scope.patientId)
      .success(function(data) {
				$scope.patient = data;
      })
      .error(function(data, status, headers, config) {
				console.log(data, status, headers, config);
	    });

	  Event.getEventsForPatient($scope.patientId)
			.success(function(data) {
				$scope.events = data;
      })
      .error(function(data, status, headers, config) {
				console.log(data, status, headers, config);
	    });
  });
