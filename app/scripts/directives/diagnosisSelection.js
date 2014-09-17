'use strict';

angular.module('openeyesApp')
  .controller('DiagnosisSelectionCtrl', ['$scope', '$attrs', '$parse', 'Conditions', 'Event', function($scope, $attrs, $parse, Conditions, Event){

    var self = this;

    this.init = function(attr){

      this.eyeSide = $attrs.side;

      //  Listen for save event
      //  Broadcast by event page controller
      $scope.$on('event.save', this.broadcastModel);

      if (!$attrs.secondaryTo) {
        this.getDisorders();
      } else {
        $scope.$watch('secondaryTo', function(secondaryTo) {
          if (secondaryTo) {
            self.getDisorders(secondaryTo.id);
          }
        });
      }
    };

    this.getDisorders = function(secondaryToId) {

      Conditions.getDisorders(secondaryToId)
        .then(function(data) {
          $scope.options = data;
        }, function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'diagnosis',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };

  }])
  .directive('diagnosisSelection', [function () {

    return {
      restrict: 'E',
      scope: {
        model: '=?ngModel',
        secondaryTo: '=?'
      },
      templateUrl: 'views/directives/diagnosisSelection.html',
      controller: 'DiagnosisSelectionCtrl',
      link: function ($scope, element, attr, DiagnosisSelectionCtrl) {
        DiagnosisSelectionCtrl.init(attr);
      }
    };
  }]);
