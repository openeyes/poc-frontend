'use strict';

angular.module('openeyesApp')
  .controller('ComplicationsCtrl', ['$scope', '$attrs', 'Complications', 'Event', 'MODEL_DOMAIN', function($scope, $attrs, Complications, Event, MODEL_DOMAIN){

    var self = this;

    this.init = function(attrs){
      $scope.$on('event.save', this.broadcastModel);
      this.eyeSide = $scope.side = attrs.side;
      $scope.model = {};
      $scope.temp = {};
      this.getData();
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){

      if($scope.temp.complications){
        $scope.model.complications = [];
        for(var i = 0;i < $scope.temp.complications.length;i++){
          $scope.model.complications.push($scope.temp.complications[i].label);
        }
      }

      return {
        name: MODEL_DOMAIN + 'Complications',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };

    this.getData = function() {
      Complications.getInjectionComplications()
        .then(function(data) {
          $scope.complications = data;
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
        ComplicationsCtrl.init(attrs);
      }
    };
  }]);
