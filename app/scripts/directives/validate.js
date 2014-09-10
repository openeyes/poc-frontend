(function() {

	'use strict';

	function isDirty($scope, field) {
		return ($scope.submitted || field.$dirty);
	}

	function hasError($scope, name, rule) {

		var field = $scope[$scope.formName][name];
		var hasError = (isDirty($scope, field) && field.$invalid);
		var hasErrorForRule = hasError && (rule ? field.$error[rule] : true);

		return hasErrorForRule;
	}

	var ValidationCtrl = function(attrName) {
		return [
			'$scope','$element','$attrs',
			function ValidationCtrl($scope, $element, $attrs) {

				$scope.hasError = function(rule) {
					return hasError($scope, $attrs[attrName], rule);
				};

				// Check if an object has any true values (used in checkbox groups)
				$scope.hasObjectSelection = function(model, fieldName) {
					var field = $scope[$scope.formName][fieldName];
					return isDirty(field) && Object.keys(model).some(function(key) {
						return (model[key] === true);
					});
				};
			}
		];
	};

	angular.module('openeyesApp')
		.directive('oeValidate', [function() {
			return {
				restrict: 'A',
				require: '^form',
				scope: true,
				link: function(scope, element, attr) {

					var fieldName = attr.oeValidate;
					var className = attr.oeValidateClassName || 'has-error';

					if (!fieldName) {
						throw new Error('oeValidate: field name not specified.')
					}

					scope.$watchCollection('[' + [
						'form.' + fieldName + '.$valid',
						'form.' + fieldName + '.$dirty',
						'submitted'
					].join(',') + ']', function updateClass() {
						if (hasError(scope, fieldName)) {
							element.addClass(className);
						} else {
							element.removeClass(className);
						}
					});
				}
			};
		}])
		.directive('oeValidateMsg', [function() {
			return {
				restrict: 'E',
				replace: true,
				scope: true,
				templateUrl: 'views/directives/validate-msg.html',
				controller: ValidationCtrl('name')
			}
		}])
		.directive('oeValidateFormErrors', function($location, $anchorScroll) {
			return {
				restrict: 'E',
				require: '^form',
				replace: true,
				scope: true,
				templateUrl: 'views/directives/validate-form-errors.html',
				controller: function($scope) {
					$scope.formErrors = function() {
						return $scope.submitted ? $scope[$scope.formName].$error : {};
					};
					$scope.hasFormErrors = function() {
						return $scope.submitted && $scope[$scope.formName].$invalid;
					};
				}
			}
		})
		.directive('oeValidateRules', ['$compile',function($compile) {
			function getVal(val) {
				return angular.isObject(val) ? val.value : val;
			}
			return {
				restrict: 'A',
				replace: false,
				// Skip other directives with lower priority (we'll be using $compile to compile other directives)
				terminal: true,
				// Execute before other directives
				priority: 1000,
				link: function(scope, element, attrs) {

					var rules = scope.$eval(attrs['oeValidateRules']);

					Object.keys(rules).forEach(function(rule) {
						var val = rules[rule];
						switch(rule) {
							case 'required':
								element.attr('required', getVal(val));
							break;
							case 'pattern':
								element.attr('ng-pattern', getVal(val));
							break;
							case 'minlength':
								element.attr('ng-minlength', getVal(val));
							break;
							case 'maxlength':
								element.attr('ng-maxlength', getVal(val));
							break;
							case 'min':
								element.attr('min', getVal(val));
							break;
							case 'max':
								element.attr('max', getVal(val));
							break;
						}
					});

					element.removeAttr('oe-validate-rules');

					$compile(element)(scope);
				}
			};
		}]);
}());
