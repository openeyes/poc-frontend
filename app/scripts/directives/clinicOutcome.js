'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('ClinicOutcomeCtrl', ['$scope', '$attrs', 'ClinicOutcome', 'Event', function($scope, $attrs, ClinicOutcome, Event){

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
        name: 'clinicOutcome',
        model: $scope.model
      };
    };

    this.getData = function() {

      ClinicOutcome.getStatuses()
        .then(function(data) {
          $scope.statuses = data;
        }, function() {
          console.log('Unable to get clinic outcome statuses');
        });

      ClinicOutcome.getRoles()
        .then(function(data) {
          $scope.roles = data;
        }, function() {
          console.log('Unable to get clinic outcome roles');
        });

      ClinicOutcome.getQuantities()
        .then(function(data) {
          $scope.quantities = data;
        }, function() {
          console.log('Unable to get clinic outcome quantities');
        });

      ClinicOutcome.getPeriods()
        .then(function(data) {
          $scope.periods = data;
        }, function() {
          console.log('Unable to get clinic outcome quantities');
        });
    };
  }])
  .directive('oeClinicOutcome', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/clinicOutcome.html',
      controller: 'ClinicOutcomeCtrl',
      link: function (scope, element, attrs, ClinicOutcomeCtrl) {
        ClinicOutcomeCtrl.init();
      }
    };
  }]);
