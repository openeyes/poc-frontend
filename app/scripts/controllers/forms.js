'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.directive('validate', ['$compile',function($compile) {
		return {
			restrict: 'A',
			replace: false,
			// Skip other directives with lower priority (we'll be using $compile to compile other directives)
			terminal: true,
			// Execute before other directives
			priority: 1000,
			link: function(scope, element, attrs) {

				var rules = scope.$eval(attrs.validate);

				Object.keys(rules).forEach(function(rule) {
					var val = rules[rule];
					switch(rule) {
						case 'required':
							element.attr('required', val);
						break;
						case 'pattern':
							element.attr('ng-pattern', val);
						break;
						case 'minlength':
							element.attr('ng-minlength', val);
						break;
						case 'maxlength':
							element.attr('ng-maxlength', val);
						break;
						case 'min':
							element.attr('min', val);
						break;
						case 'max':
							element.attr('max', val);
						break;
					}
				});

				element.removeAttr('validate');

				$compile(element)(scope);
			}
		};
	}])
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
				required: true,
				pattern: '/^[^0-9]+$/'
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

		// Has the field value changed, or has the form attempted to be submitted?
		function isDirty(field) {
			return ($scope.submitted || field.$dirty);
		}

		// Check if a field has any errors
		$scope.hasFieldError = function(field, rule) {

			if (typeof field === 'string') {
				field = $scope[$scope.formName][field];
			}

			var isInvalid = (isDirty(field) && field.$invalid);

			return isInvalid && (rule ? field.$error[rule] : true);
		};

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

