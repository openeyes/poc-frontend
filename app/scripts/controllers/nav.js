'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:PatientCtrl
 * @description
 * # PatientCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('NavCtrl', function ($scope, $location) {

		$scope.isActive = function (location) {
				return location === $location.path();
		};
	});
