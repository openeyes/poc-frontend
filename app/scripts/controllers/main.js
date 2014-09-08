'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('MainCtrl', ['$scope', function ($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	}]);
