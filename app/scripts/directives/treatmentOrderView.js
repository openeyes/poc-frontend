'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:TreatmentOrderViewCtrl
 * @description
 * # TreatmentOrderViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('TreatmentOrderViewCtrl', ['$scope', '$routeParams', 'Element', 'MODEL_DOMAIN', function($scope, $routeParams, Element, MODEL_DOMAIN){

    this.init = function(){

      $scope.model = {};

      // Request element for todays date
      var today = Date.now();
      var eType = MODEL_DOMAIN + 'TreatmentOrder';

      Element.getElements($routeParams.patientId, eType, today)
        .then(function(data) {
          $scope.model = data.data[0];
        }, function(error) {
          console.log(error);
        });
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:oeTreatmentOrderView
   * @description
   * # oeTreatmentOrderView
   * Directive of the openeyesApp
   */
  .directive('oeTreatmentOrderView', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/treatmentOrderView.html',
      controller: 'TreatmentOrderViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, TreatmentOrderViewCtrl) {
        TreatmentOrderViewCtrl.init();
      }
    };
  }]);
