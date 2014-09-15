/**
 * These validation directives handle validation state in the UI as well as handling
 * dynamic field validation.
 *
 * Features:
 * - toggle validation classes
 * - show contextual validation messages
 * - show grouped validation messages for the entire form
 * - demonstrate custom validation to validate groups of models
 *
 * Dependency tree:
 * -- FormController
 *   -- oeValidateFormErrors directive
 *   -- oeValidateController
 *     -- oeValidateDirective
 *       -- input directive
 *       -- select directive
 *       -- oeValidateMsg directive
 *       -- oeValidateRules directive
 *
 * The oeValidate directive provides the oeValidateController and thus is required.
 * All other directives are optional.
 */

(function() {

	'use strict';

	angular.module('openeyesApp')
		// Default validation messages.
		.constant('oeValidateInvalidMessages', {
			required: 'This field is required.',
			minlength: 'This field is not long enough.',
			maxlength: 'This field is too long.',
			pattern: 'This field is not in the correct format.',
			'group-required': 'This group is required.'
		})
		// The controller manages all models and provides friendly API methods for
		// determining the validity of such models.
		.controller('oeValidateCtrl', [ '$scope','$element','$attrs','oeValidateInvalidMessages', function($scope, $element, $attrs, oeValidateInvalidMessages) {

			// List of models to be validated.
			var ngModels = [];

			// Model validation rules.
			var rules = {};

			this.registerModel = function(ngModel) {
				ngModels.push(ngModel);
			};

			this.deregisterModel = function(ngModel) {
				var index = this.ngModels.indexOf(ngModel);
				if (index !== -1) {
					this.ngModels.splice(index, 1);
				}
			};

			this.registerRules = function(_rules) {
				rules = _rules;
			};

			this.getModels = function() {
				return ngModels;
			};

			this.getRules = function() {
				return rules;
			}

			this.validateGroup = function() {

				var rules = JSON.parse($attrs.oeValidateGroup);

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
					ngModel.$setValidity('group-required', minRequiredValidity, self);
				});
			};

			$scope.hasError = function(rule) {

				var invalidModels = ngModels.filter(function(model) {
					var isDirty = ($scope.submitted || model.$dirty);
					return isDirty && (!rule ? model.$invalid : model.$error[rule]);
				});

				return ngModels.length && (invalidModels.length === ngModels.length);
			};

			$scope.getErrorMessage = function(rule) {

				if (rule && rules[rule] && rules[rule].msg) {
					return rules[rule].msg;
				}

				return oeValidateInvalidMessages[rule] || 'This field has an error.';
			};
		}])
		// Our main validate directive. Will adjust the UI based on the validity of
		// registered models.
		.directive('oeValidate', [function() {
			return {
				restrict: 'A',
				controller: 'oeValidateCtrl',
				require: ['^form', 'oeValidate'],
				scope: true,
				link: function(scope, element, attr, controllers) {

					var oeValidateCtrl = controllers[1];

					function updateClass() {
						var className = attr.oeValidateClassName;
						if (!className) {
							return;
						}
						if (scope.hasError()) {
							element.addClass(className);
						} else {
							element.removeClass(className);
						}
					}

					// Watch model validity changes.
					function watchModels(callback) {

						var models = oeValidateCtrl.getModels();

						var collection = ['submitted'];

						angular.forEach(models, function(model) {
							collection.push(scope.formName + '.' + model.$name + '.$valid');
							collection.push(scope.formName + '.' + model.$name + '.$dirty');
						});

						collection = '[' + collection.join(',') + ']';

						scope.$watchCollection(collection, callback);
					}

					scope.$watch('formName', function() {
						// Watch all models registered with the controller.
						watchModels(function() {
							updateClass();
						});
					});
				}
			};
		}])
		// Register all inputs with the validateController.
		.directive('input', function() {
			return {
				restrict: 'E',
				require: [
					'?^oeValidate',
					'^ngModel'
				],
				link: function(scope, element, attrs, controllers) {

					var oeValidateCtrl = controllers[0];
					var ngModel = controllers[1];

					if (oeValidateCtrl) {

						oeValidateCtrl.registerModel(ngModel);

						if (attrs.type === 'checkbox') {

							// Set the validity of the group when any checkbox model changes.
							scope.$watch(function() {
								return ngModel.$modelValue;
							}, oeValidateCtrl.validateGroup);

							// In case we are adding and removing checkboxes dynamically we need to tidy up after ourselves.
							scope.$on('$destroy', function() {
								oeValidateCtrl.deregisterModel(ngModel);
							});
						}
					}
				}
			};
		})
		// Register all selects with the validateController.
		.directive('select', function() {
			return {
				restrict: 'E',
				require: [
					'?^oeValidate',
					'?^ngModel'
				],
				link: function(scope, element, attrs, controllers) {
					var oeValidateCtrl = controllers[0];
					var ngModel = controllers[1];
					if (oeValidateCtrl && ngModel) {
						oeValidateCtrl.registerModel(ngModel);
					}
				}
			};
		})
		// Shows contextual validation messages.
		.directive('oeValidateMsg', [function() {
			return {
				restrict: 'E',
				replace: true,
				scope: true,
				require: 'oeValidate',
				templateUrl: 'views/directives/validate-msg.html'
			};
		}])
		// Show all form errors.
		.directive('oeValidateFormErrors', function() {
			return {
				restrict: 'E',
				replace: false,
				scope: true,
				templateUrl: 'views/directives/validate-form-errors.html',
				link: function(scope, element, attrs) {
					scope.rules = attrs.rules;
				},
				controller: function($scope, $element, $attrs, oeValidateInvalidMessages) {

					var names;
					var formattedErrors;
					var rules = {};

					$scope.$watch('rules', function(val) {
						rules = JSON.parse(val);
					});

					function formatErrors(errors) {

						formattedErrors = [];
						names = [];

						Object.keys(errors).forEach(function(key) {

							var models = errors[key];

							if (!angular.isArray(models)) {
								return;
							}

							models.forEach(function(model) {
								if (names.indexOf(model.$name) === -1) {
									names.push(model.$name);
									formattedErrors.push(model);
								}
							});
						});

						return formattedErrors;
					}

					$scope.formErrors = function() {
						return formatErrors($scope.submitted ? $scope[$scope.formName].$error : {});
					};

					$scope.hasFormErrors = function() {
						return $scope.submitted && $scope[$scope.formName].$invalid;
					};

					$scope.getErrorMessage = function(name, rule) {

						if (rule && rules[name] && rules[name][rule] && rules[name][rule].msg) {
							return rules[name][rule].msg;
						}

						return oeValidateInvalidMessages[rule] || 'This field has an error.';
					};
				}
			};
		})
		// Accepts rules for specific fields and recompiles the field elements with
		// the correct validation attribute directives.
		.directive('oeValidateRules', ['$compile',function($compile) {
			function getVal(val) {
				return angular.isObject(val) ? val.value : val;
			}
			return {
				restrict: 'A',
				replace: false,
				require: '^oeValidate',
				// Skip other directives with lower priority (we'll be using $compile to compile other directives)
				terminal: true,
				// Execute before other directives
				priority: 1000,
				link: function(scope, element, attrs, oeValidateCtrl) {

					var rules = scope.$eval(attrs.oeValidateRules);

					oeValidateCtrl.registerRules(rules);

					Object.keys(rules).forEach(function(rule) {
						var val = rules[rule];
						switch(rule) {
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
