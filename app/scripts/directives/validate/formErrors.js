/* LEGACY CODE */

angular.module('openeyesApp')
  .controller('oeValidateFormErrorsCtrl', function($scope, $attrs, $parse, oeValidateInvalidMessages) {

      var rules = {};

      this.init = function() {
        rules = $parse($attrs.rules)($scope);
      };

      this.formatErrors = function(errors) {

        var formattedErrors = [];
        var names = [];

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
      };

      this.formErrors = function() {
        return this.formatErrors($scope.form.submitted ? $scope.form.$error : {});
      };

      this.hasFormErrors = function() {
        return ($scope.form.submitted && $scope.form.$invalid);
      };

      this.getErrorMessage = function(name, rule) {
        if (rule && rules[name] && rules[name][rule] && rules[name][rule].msg) {
          return rules[name][rule].msg;
        }
        return oeValidateInvalidMessages[rule] || 'This field has an error.';
      };

      this.scroll = function($event, model) {

        $event.preventDefault();

        var element = angular.element('[name="' + model.$name + '"]');

        if (!element.length) {
          console.warn('Attempting to scroll to an element that does not exist.');
          return;
        }

        var parentNode = element[0];
        while((parentNode = parentNode.parentNode)) {
          if (angular.element(parentNode).hasClass('form-group')) {
            break;
          }
        }
        if (parentNode) {
          parentNode.scrollIntoView(true);
        } else {
          console.warn('Unable to find form-group wrapper for this field.');
        }
      };

      $scope.formErrors = this.formErrors.bind(this);
      $scope.hasFormErrors = this.hasFormErrors.bind(this);
      $scope.getErrorMessage = this.getErrorMessage.bind(this);
      $scope.scroll = this.scroll.bind(this);
    })
    // Show form validation errors.
    .directive('oeValidateFormErrors', function() {
      return {
        restrict: 'E',
        replace: false,
        scope: true,
        templateUrl: 'views/directives/validate-form-errors.html',
        controller: 'oeValidateFormErrorsCtrl',
        link: function(scope, element, attr, oeValidateFormErrorsCtrl) {
          oeValidateFormErrorsCtrl.init();
        }
      };
    });