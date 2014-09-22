'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('InjectionManagementCtrl', ['$scope', '$attrs', 'InjectionManagement', 'Treatment', 'Event', 'MODEL_DOMAIN', function($scope, $attrs, InjectionManagement, Treatment, Event, MODEL_DOMAIN){

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
          console.log('error getting no treatment reaons');
        });

      Treatment.getTreatments()
        .then(function(data) {
          $scope.treatments = data;
        }, function() {
          console.log('error getting treatments');
        });
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      // Shuffle around more complex objects
      // To retrieve basic strings that api requires
      // While leaving the complex data intact
      if($scope.selectedDiagnosis){
        $scope.model.diagnosis = $scope.selectedDiagnosis.label;
      }

      if($scope.diagnosisSecondaryTo){
        $scope.model.diagnosisSecondaryTo = $scope.diagnosisSecondaryTo.label;
      }

      if($scope.intendedTreatment){
        $scope.model.intendedTreatment = $scope.intendedTreatment.label;
      }

      if($scope.risks){
        $scope.model.risks = [];
        for(var i = 0;i < $scope.risks.length;i++){
          $scope.model.risks.push($scope.risks[i].label);
        }
      }

      return {
        name: MODEL_DOMAIN + 'InjectionManagement',
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
