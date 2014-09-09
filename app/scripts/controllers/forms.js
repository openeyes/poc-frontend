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
				required: true
			}
		};

		$scope.formName = 'form';

		// Form submit handler
		$scope.submit = function() {
			$scope.submitted = true;
			if (!$scope.hasFormErrors()) {
				$window.alert('form will be submitted');
			}
		};

		// Check if an object has any true values (used in checkbox groups)
		$scope.hasObjectSelection = function(model, fieldName) {
			var field = $scope[$scope.formName][fieldName];
			return isDirty(field) && Object.keys(model).some(function(key) {
				return (model[key] === true);
			});
		};

		$scope.formErrors = function() {
			return $scope.submitted ? $scope[$scope.formName].$error : {};
		};

		$scope.hasFormErrors = function() {
			return $scope.submitted && $scope[$scope.formName].$invalid;
		};
	}]);

