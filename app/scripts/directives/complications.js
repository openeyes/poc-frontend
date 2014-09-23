'use strict';

angular.module('openeyesApp')
  .controller('ComplicationsCtrl', ['$scope', '$attrs', 'Complications', 'Event', 'MODEL_DOMAIN', function($scope, $attrs, Complications, Event, MODEL_DOMAIN){

    var self = this;

    this.init = function(){
      $scope.$on('event.save', this.broadcastModel);
      $scope.model = {};
      this.getData();
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: MODEL_DOMAIN + 'Complications',
        model: $scope.model
      };
    };

    this.getData = function() {
      Complications.getInjectionComplications()
        .then(function(data) {
          $scope.complications = data;
          console.log($scope.complications);
        }, function() {
          console.log('Unable to get injection complications');
        });
    };

    $scope.otherSelected = function() {
      return ($scope.model.complications || []).filter(function(complication) {
        return complication.other;
      }).length;
    };
  }])
  .directive('oeComplications', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/complications.html',
      controller: 'ComplicationsCtrl',
      link: function (scope, element, attrs, ComplicationsCtrl) {
        ComplicationsCtrl.init();
      }
    };
  }]);
