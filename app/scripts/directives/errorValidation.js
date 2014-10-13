'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:ErrorValidationCtrl
 * @description
 * # ErrorValidationCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('ErrorValidationCtrl', ['$scope', '$timeout', function($scope, $timeout){

    var self = this;

    $scope.$on('error.invalidForm', function(){
      self.element.addClass('show-validation');
      //when the form is invalid add the class that makes it show
      $timeout(function(){
        self.element.addClass('fadeout-validation');
      },1000); //after 1 sec start fading out

      //then remove the class and fade out
      $timeout(function(){
        self.element.removeClass('show-validation');
      },2000); //after 2 secs remove from screen
    });

    this.init = function(element){
      this.element = element;
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:oeErrorValidation
   * @description
   * # oeErrorValidation
   * Directive of the openeyesApp
   */
  .directive('oeErrorValidation', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      controller: 'ErrorValidationCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, ErrorValidationCtrl) {
        ErrorValidationCtrl.init(element);
      }
    };
  }]);
