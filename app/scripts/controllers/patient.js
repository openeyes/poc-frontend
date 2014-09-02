'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:PatientCtrl
 * @description
 * # PatientCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('PatientCtrl', function ($scope, $routeParams, patientSearch) {
    
		$scope.patient = null;

		patientSearch.getPatient($routeParams.patientId)
      .success(function(data) {
				$scope.patient = data;
      })
      .error(function(data, status, headers, config) {
				console.log(data, status, headers, config);
	    });

		

  });
