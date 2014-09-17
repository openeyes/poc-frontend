'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('InjectionManagementCtrl', ['$scope', 'InjectionManagement', 'Event', function($scope, InjectionManagement, Event){

    var self = this;

    this.init = function(){

      $scope.$on('event.save', this.broadcastModel);

      InjectionManagement.getNoTreatmentReasons()
        .then(function(data) {
          $scope.noTreatmentReasons = data;
        }, function() {
          alert('error getting no treatment reaons');
        });
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'injectionManagement',
        model: $scope.model
      };
    };

  }])
  .directive('injectionManagement', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/injectionManagement.html',
      controller: 'InjectionManagementCtrl',
      link: function (scope, element, attrs, InjectionManagementCtrl) {
        InjectionManagementCtrl.init();
      }
    };
  }]);
