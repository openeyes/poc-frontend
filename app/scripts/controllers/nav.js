'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
		$scope.isActive = function (location) {
			return location === $location.path();
		};
	}]);
