'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('ClinicOutcomeCtrl', ['$scope', '$attrs', '$timeout', 'ClinicOutcome', 'Encounter', 'MODEL_DOMAIN', function($scope, $attrs, $timeout, ClinicOutcome, Encounter, MODEL_DOMAIN){

    // var selected = [];
    var self = this;
    var tabs;

    this.init = function(){
      tabs = angular.element('.clinc-outcome-nav-tabs a')
        .on('click', this.selectTab.bind(this));

      $timeout(function() {
        tabs.eq(0).trigger('click');
      });

      $scope.$on('encounter.save', this.broadcastModel);
      $scope.model = {};
      this.getData();
    };

    this.selectTab = function(e) {
      e.preventDefault();
      var tab = e.currentTarget;
      angular.element(tab).tab('show');
      $scope.selectedTab = tabs.index(tab);
      $scope.status = $scope.statuses[$scope.selectedTab];
      $scope.$digest();
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
