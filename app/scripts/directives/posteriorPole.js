'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('PosteriorPoleCtrl', ['$scope', '$attrs', 'Event', function($scope, $attrs, Event){

    var self = this;

    this.init = function(){
      $scope.$on('event.save', this.broadcastModel);
      $scope.model = {};
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      console.log($scope.model);
      return {
        name: 'posteriorPole',
        subPath: $attrs.side,
        model: $scope.model
      };
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
