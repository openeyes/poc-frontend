'use strict';

angular.module('openeyesApp')
  .controller('AnteriorSegmentCtrl', ['$scope', '$attrs', 'Event', function($scope, $attrs, Event){

    var self = this;

    this.init = function(attr){

      this.eyeSide = attr.side;
      $scope.mode = attr.mode;
      $scope.model = {};

      //  Listen for save event
      //  Broadcast by event page controller
      $scope.$on('event.save', this.broadcastModel);
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'anteriorSegment',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };
  }])
  .directive('oeAnteriorSegment', [function() {
    return {
      scope: {
        model: '=?ngModel'
      },
      replace: true,
      restrict: 'E',
      controller: 'AnteriorSegmentCtrl',
      templateUrl: 'views/directives/anteriorSegment.html',
      link: function($scope, element, attr, AnteriorSegmentCtrl) {
        AnteriorSegmentCtrl.init(attr);
      }
    };
  }]);
