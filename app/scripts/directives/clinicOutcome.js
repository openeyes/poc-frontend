'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('ClinicOutcomeCtrl', ['$scope', '$attrs', 'ClinicOutcome', 'Encounter', 'MODEL_DOMAIN', function($scope, $attrs, ClinicOutcome, Encounter, MODEL_DOMAIN){

    var self = this;

    this.init = function(){
      $scope.$on('encounter.save', this.broadcastModel);
      $scope.model = {};
      this.getData();
    };

    this.broadcastModel = function(){
      Encounter.addElement(self.getModel());
    };

    this.getModel = function(){

      if($scope.status){
        $scope.model.status = $scope.status.label;
      }
      if($scope.quantity){
        $scope.model.quantity = $scope.quantity.label;
      }
      if($scope.role){
        $scope.model.role = $scope.role.label;
      }
      if($scope.period){
        $scope.model.period = $scope.period.label;
      }
      if($scope.communityPatient){
        $scope.model.communityPatient = $scope.communityPatient.label;
      } else {
        $scope.model.communityPatient = false;
      }

      return {
        name: MODEL_DOMAIN + 'ClinicOutcome',
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
