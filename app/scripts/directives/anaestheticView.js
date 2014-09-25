'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AnaestheticViewCtrl
 * @description
 * # AnaestheticViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('AnaestheticViewCtrl', ['$scope', '$routeParams', 'Element', 'MODEL_DOMAIN', function($scope, $routeParams, Element, MODEL_DOMAIN){

    this.init = function(){

      $scope.model = {};

      // Request element for todays date
      var today = Date.now();
      var eType = MODEL_DOMAIN + 'Anaesthetic';

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
   * @name openeyesApp.directive:oeAnaestheticView
   * @description
   * # oeAnaestheticView
   * Directive of the openeyesApp
   */
  .directive('oeAnaestheticView', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/anaestheticView.html',
      controller: 'AnaestheticViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, AnaestheticViewCtrl) {
        AnaestheticViewCtrl.init();
      }
    };
  }]);
