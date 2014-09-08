'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('SearchCtrl', ['$scope', 'PatientSearch', function ($scope, PatientSearch) {

		$scope.patients = [];
		$scope.searchValue = '';
		$scope.currentTerm = '';

		$scope.getSearchResults = function(){
			$scope.currentTerm = $scope.searchValue;
			PatientSearch.findPatients($scope.searchValue)
				.success(function(data) {
					$scope.searchPerformed = true;
					$scope.patients = data;
				})
				.error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
		};

		$scope.hasResults = function(){
			return $scope.patients.length;
		};

	}]);
