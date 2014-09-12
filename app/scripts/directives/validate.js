(function() {

	'use strict';

	angular.module('openeyesApp')
		.directive('input', function() {
			return {
				restrict: 'E',
				require: [
					'^oeValidate',
					'^ngModel'
				],
				link: function(scope, element, attrs, controllers) {

					var oeValidate = controllers[0];
					var ngModel = controllers[1];

					oeValidate.register(ngModel);

					if (attrs.type === 'checkbox') {
						scope.$watch(function() {
							return ngModel.$modelValue;
						}, oeValidate.validateCheckboxGroup);
						// In case we are adding and removing checkboxes dynamically we need to tidy up after outselves.
						scope.$on('$destroy', function() {
							oeValidate.deregister(ngModel);
						});
					}
				}
			};
		})
		.directive('select', function() {
			return {
				restrict: 'E',
				require: [
					'^oeValidate',
					'^ngModel'
				],
				link: function(scope, element, attrs, controllers) {
					var oeValidate = controllers[0];
					var ngModel = controllers[1];
					oeValidate.register(ngModel);
				}
			};
		})
		.directive('oeValidate', [function() {
			return {
				restrict: 'A',
				require: ['^form','^oeValidate'],
				scope: true,
				controller: function($scope, $element, $attrs) {

					var self = this;
					var minRequired;
					var ngModels = [];
					var checkboxGroupRules = {};

					self.register = function(ngModel) {
						ngModels.push(ngModel);
					};

					self.deregister = function(ngModel) {
						var index = self.ngModels.indexOf(ngModel);
						if (index !== -1) {
							self.ngModels.splice(index, 1);
						}
					};

					self.getModels = function() {
						return ngModels;
					};

					self.validateCheckboxGroup = function() {

						var rules = JSON.parse($attrs.oeValidateCheckboxGroup);

						if (!rules || !rules.required) {
							return;
						}

						var checkedCount = 0;
						angular.forEach(ngModels, function(ngModel) {
							if (ngModel.$modelValue) {
								checkedCount++;
							}
						});

						var minRequiredValidity;
						if (rules.required === '*') {
							minRequiredValidity = checkedCount === ngModels.length;
						} else {
							minRequiredValidity = checkedCount >= rules.required;
						}

						angular.forEach(ngModels, function(ngModel) {
							ngModel.$setValidity('checkbox-group-required', minRequiredValidity, self);
						});
					};

					$scope.hasError = function(rule) {

						var invalidModels = ngModels.filter(function(model) {
							var isDirty = ($scope.submitted || model.$dirty);
							return isDirty && (!rule ? model.$invalid : model.$error[rule]);
						});

						return ngModels.length && invalidModels.length === ngModels.length;
					}
				},
				link: function(scope, element, attr, controllers) {

					function updateClass() {
						var className = attr.oeValidateClassName;
						if (scope.hasError()) {
							element.addClass(className);
						} else {
							element.removeClass(className);
						}
					}

					function watchModel(callback) {

						var oeValidateController = controllers[1];
						var models = oeValidateController.getModels();

						var collection = ['submitted'];

						angular.forEach(models, function(model) {
							collection.push(scope.formName + '.' + model.$name + '.$valid');
							collection.push(scope.formName + '.' + model.$name + '.$dirty');
						});

						collection = '[' + collection.join(',') + ']';

						// Watch for model validity changes.
						scope.$watchCollection(collection, callback);
					}

					watchModel(function() {
						if (attr.oeValidateClassName) {
							updateClass();
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
				templateUrl: 'views/directives/validate-msg.html'
			};
		}])
		.directive('oeValidateFormErrors', function() {
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
			};
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

					var rules = scope.$eval(attrs.oeValidateRules);

					Object.keys(rules).forEach(function(rule) {
						var val = rules[rule];
						switch(rule) {
							case 'checkboxGroupRequired':
								element.attr('oe-validate-checkbox-group', getVal(val));
							break;
							case 'required':
								element.attr('ng-required', getVal(val));
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

					// Remove attribute to prevent infinite loop.
					element.removeAttr('oe-validate-rules');

					$compile(element)(scope);
				}
			};
		}]);
}());
