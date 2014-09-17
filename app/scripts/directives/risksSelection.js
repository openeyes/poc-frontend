'use strict';

angular.module('openeyesApp')
  .controller('RisksSelectionCtrl', ['$scope', '$attrs', '$parse', 'Conditions', 'Event', function($scope, $attrs, $parse, Conditions, Event){

    var self = this;

    this.init = function(attr){

      this.eyeSide = attr.side;

      //  Populate the procedures
      Conditions.getRisks()
        .then(function(data) {
          $scope.options = data;
        }, function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });

      //  Listen for save event
      //  Broadcast by event page controller
      $scope.$on('event.save', this.broadcastModel);
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'risks',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };

  }])
  .directive('risksSelection', [function () {

    return {
      restrict: 'AE', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/multiSelect.html',
      controller: 'RisksSelectionCtrl',
      link: function ($scope, element, attr, RisksSelectionCtrl) {
        RisksSelectionCtrl.init(attr);
      }
    };
  }]);
