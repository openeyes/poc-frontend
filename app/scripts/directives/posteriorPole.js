'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('PosteriorPoleCtrl', ['$scope', '$attrs', 'Event', 'MODEL_DOMAIN', function($scope, $attrs, Event, MODEL_DOMAIN){

    var self = this;

    this.init = function(){
      $scope.$on('event.save', this.broadcastModel);
      $scope.side = $attrs.side;
      $scope.mode = $attrs.mode;
      $scope.options = 'posterior';
      $scope.eyedrawInstance = null;
      $scope.model = {
        description: ''
      };
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      console.log($scope.model);
      return {
        name: MODEL_DOMAIN + 'PosteriorPole',
        subPath: $scope.side,
        model: $scope.model
      };
    };

    $scope.report = function() {

      if (!$scope.eyedrawInstance) {
        console.warn('EyeDraw instance not available yet.');
        return;
      }

      var report = $scope.eyedrawInstance.drawing.report();
      report = report.replace(/, +$/, '');

      if ($scope.model.description) {
        report = ', ' + report;
      }
      $scope.model.description += report;
    };

    $scope.clear = function() {
      $scope.model.description = '';
    };

  }])
  .directive('oePosteriorPole', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/posteriorPole.html',
      controller: 'PosteriorPoleCtrl',
      link: function (scope, element, attrs, PosteriorPoleCtrl) {
        PosteriorPoleCtrl.init();
      }
    };
  }]);
