'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityViewCtrl
 * @description
 * # AcuityViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('AcuityViewCtrl', ['$scope', '$routeParams', 'Element', 'MODEL_DOMAIN', function($scope, $routeParams, Element, MODEL_DOMAIN){

    // var self = this;

    this.init = function(){

      $scope.model = {};

      // Request element for todays date
      var today = Date.now();
      var eType = MODEL_DOMAIN + 'VisualAcuity';

      Element.getElements($routeParams.patientId, eType, today)
        .then(function(data) {
          console.log(data);
          $scope.model = data[0];
        }, function(error) {
          console.log(error);
        });
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:oeAcuityView
   * @description
   * # oeAcuityView
   * Directive of the openeyesApp
   */
  .directive('oeVisualAcuityView', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/acuityView.html',
      controller: 'AcuityViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, AcuityViewCtrl) {
        AcuityViewCtrl.init();
      }
    };
  }]);
