'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('AnaestheticCtrl', ['$scope', '$attrs', 'Anaesthetic', 'Event', 'MODEL_DOMAIN', function($scope, $attrs, Anaesthetic, Event, MODEL_DOMAIN){

    var self = this;

    this.init = function(){
      $scope.$on('event.save', this.broadcastModel);
      $scope.side = $attrs.side;
      $scope.model = {};
      this.getData();
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      console.log($scope.model);
      return {
        name: MODEL_DOMAIN + 'Anaesthetic',
        subPath: $scope.side,
        model: $scope.model
      };
    };

    this.getData = function() {
      Anaesthetic.getTypes()
        .then(function(data) {
          $scope.types = data;
        }, function() {
          console.log('Unable to get anaesthetic types');
        });

      Anaesthetic.getDeliveries()
        .then(function(data){
          $scope.deliveries = data;
        }, function() {
          console.log('Unable to get anaesthetic deliveries');
        });

      Anaesthetic.getAgents()
        .then(function(data) {
          $scope.agents = data;
        }, function() {
          console.log('Unable to get anaesthetic agents');
        });

    };
  }])
  .directive('oeAnaesthetic', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/anaesthetic.html',
      controller: 'AnaestheticCtrl',
      link: function (scope, element, attrs, AnaestheticCtrl) {
        AnaestheticCtrl.init();
      }
    };
  }]);
