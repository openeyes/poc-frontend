'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('SearchCtrl', function ($scope, patientSearch) {

		$scope.patients = [];
		$scope.searchValue = '';

		$scope.getSearchResults = function(){
			console.log('getSearchResults called...', $scope.searchValue);

			patientSearch.findPatients($scope.searchValue)
				.success(function(data) {
					$scope.patients = data;
				})
				.error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
		};

		$scope.hasResults = function(){
			return $scope.patients.length;
		};

	});
