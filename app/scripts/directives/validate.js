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

  var DEFAULT_ERROR_MSG = 'This field has an error.';

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

      var element = null;
      var model = null;
      var rules = {};
      var err = {};

      this.init = function(_rules) {
        rules = _rules;
      };

      this.registerModel = function(ngModel, attrs, _element) {

        element = _element;
        model = ngModel;

        // We do this to force the validated related watches to update on blur.
        element.on('blur', function() {
          $scope.$apply(function() {
            model.$setViewValue(model.$viewValue);
          });
        });
      };

      this.hasError = function(rule) {

        var ruleName = rule || 'none';

        // If focused, return the previous validation state.
        if (element.is(':focus')) {
          return err[ruleName];
        }

        var isDirty = ($scope.form.submitted || model.$dirty);
        err[ruleName] = isDirty && (!rule ? model.$invalid : model.$error[rule]);

        return err[ruleName];
      };

      this.getErrorMessage = function(rule) {
        if (rule && rules[rule] && rules[rule].msg) {
          return rules[rule].msg;
        }
        return oeValidateInvalidMessages[rule] || DEFAULT_ERROR_MSG;
      };

      $scope.hasError = this.hasError.bind(this);
      $scope.getErrorMessage = this.getErrorMessage.bind(this);
    }])
    // Our main validate directive. Will adjust the UI based on the validity of
    // registered models.
    .directive('oeValidate', [function() {
      return {
        restrict: 'A',
        controller: 'oeValidateCtrl',
        require: ['oeValidate'],
        scope: true
      };
    }])
    // Angular's form validation doesn't work with dynamically named fields. So we need to
    // add the name attribute before other directives are compiled.
    .directive('oeName', ['$compile','$interpolate', function ($compile, $interpolate) {
      return {
        priority: 9999,
        scope: false,
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
          var interpolatedName = $interpolate($attrs.oeName)($scope);
          if (interpolatedName) {
            $attrs.$set('name', interpolatedName);
          }
        }]
      };
    }])
    // Shows contextual validation messages.
    .directive('oeValidateMsg', [function() {
      return {
        restrict: 'E',
        replace: true,
        scope: true,
        priority: 999,
        require: 'oeValidate',
        templateUrl: 'views/directives/validate-msg.html'
      };
    }])
    // Accepts rules for specific fields and recompiles the field elements with
    // the correct validation attribute directives.
    .controller('oeValidateRulesCtrl', function($scope, $element, $compile) {

      this.rules = {};

      function getVal(val) {
        return angular.isObject(val) ? val.value : val;
      }

      this.init = function(rules) {
        this.rules = rules;
        this.bindValidationDirectives();
      };

      this.bindValidationDirectives = function() {
        Object.keys(this.rules).forEach(function(rule) {
          var val = this.rules[rule];
          switch(rule) {
            case 'required':
              $element.attr('ng-required', getVal(val));
            break;
            case 'pattern':
              $element.attr('ng-pattern', getVal(val));
            break;
            case 'minlength':
              $element.attr('ng-minlength', getVal(val));
            break;
            case 'maxlength':
              $element.attr('ng-maxlength', getVal(val));
            break;
            case 'min':
              $element.attr('min', getVal(val));
            break;
            case 'max':
              $element.attr('max', getVal(val));
            break;
          }
        }.bind(this));

        // Remove attribute to prevent infinite loop.
        $element.removeAttr('oe-validate-rules');

        $compile($element)($scope);
      };
    })
    .directive('oeValidateRules', ['$compile','$parse', function($compile, $parse) {
      return {
        restrict: 'A',
        replace: false,
        require: ['^oeValidate', '^oeValidateRules'],
        controller: 'oeValidateRulesCtrl',
        scope: true,
        terminal: true,
        priority: 1000,
        link: function(scope, element, attrs, controllers) {

          var oeValidateCtrl = controllers[0];
          var oeValidateRulesCtrl = controllers[1];
          var rules = $parse(attrs.oeValidateRules)(scope);

          if (!rules) {
            console.warn('Attempted to bind validation directives without any rules, skipping validation.');
            return;
          }
          oeValidateRulesCtrl.init(rules);
          oeValidateCtrl.init(rules);
        }
      };
    }])
    // Register all input models with the validateController.
    .directive('input', function() {
      return {
        restrict: 'E',
        require: [
          '?^oeValidate',
          '?^ngModel'
        ],
        link: function(scope, element, attrs, controllers) {
          var oeValidateCtrl = controllers[0];
          var ngModel = controllers[1];
          if (oeValidateCtrl && ngModel && ngModel.$name) {
            oeValidateCtrl.registerModel(ngModel, attrs, element);
          }
        }
      };
    })
    // Register all select models with the validateController.
    .directive('select', function() {
      return {
        restrict: 'E',
        require: [
          '?^oeValidate',
          '?^ngModel'
        ],
        // terminal: true,
        link: function(scope, element, attrs, controllers) {
          var oeValidateCtrl = controllers[0];
          var ngModel = controllers[1];
          if (oeValidateCtrl && ngModel && ngModel.$name) {
            oeValidateCtrl.registerModel(ngModel, attrs, element);
          }
        }
      };
    })
    ;
}());
