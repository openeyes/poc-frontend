'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')

	.controller('FormsCtrl', ['$scope', '$window', function ($scope, $window) {

		$scope.submitted = false;

		$scope.user = {
			name: '',
			email: '',
			location: '',
			sex: '',
			hobbies: {
				reading: false,
				writing: false
			}
		};

		$scope.validations = {
			name: {
				minlength: 2,
				maxlength: 5,
				email: true,
				required: {
					value: true,
					msg: 'The name field is definately required'
				},
				pattern: {
					value: '/^[^0-9]+$/',
					msg: 'No numbers!'
				}
			},
			location: {
				required: true
			},
			sex: {
				required: true
			},
			hobbies: {
				required: '1'
			}
		};

		$scope.formName = 'form';

		// Form submit handler
		$scope.submit = function() {
			$scope.submitted = true;
			if ($scope[$scope.formName].$valid) {
				$window.alert('form will be submitted');
			}
		};
	}]);

