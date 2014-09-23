'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:HistoryViewCtrl
 * @description
 * # HistoryViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('HistoryViewCtrl', ['$scope', '$routeParams', 'Element', 'MODEL_DOMAIN', function($scope, $routeParams, Element, MODEL_DOMAIN){

    this.init = function(){

      $scope.model = {};

      // Request element for todays date
      var today = Date.now();
      var eType = MODEL_DOMAIN + 'History';

      Element.getElements($routeParams.patientId, eType, today)
        .then(function(data) {
          console.log(data.data);
          $scope.model = data.data[0];
        }, function(error) {
          console.log(error);
        });
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:oeHistoryView
   * @description
   * # oeHistoryView
   * Directive of the openeyesApp
   */
  .directive('oeHistoryView', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/historyView.html',
      controller: 'HistoryViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, HistoryViewCtrl) {
        HistoryViewCtrl.init();
      }
    };
  }]);
