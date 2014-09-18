'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('InjectionManagementCtrl', ['$scope', '$attrs', 'InjectionManagement', 'Treatment', 'Event', function($scope, $attrs, InjectionManagement, Treatment, Event){

    var self = this;

    this.init = function(){

      $scope.$on('event.save', this.broadcastModel);
      $scope.model = {};
      $scope.model.questions = [];

      $scope.$watch('noTreatment', function(val) {
        $scope.model.treatment = !val;
      });

      Treatment.getNoTreatmentReasons()
        .then(function(data) {
          $scope.noTreatmentReasons = data;
        }, function() {
          alert('error getting no treatment reaons');
        });

      Treatment.getTreatments()
        .then(function(data) {
          $scope.treatments = data;
        }, function() {
          console.log('error getting treatments')
        });
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      console.log($scope.model);
      return {
        name: 'injectionManagement',
        subPath: $attrs.side,
        model: $scope.model
      };
    };

  }])
  .directive('oeInjectionManagement', [function () {
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
