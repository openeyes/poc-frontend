'use strict';

angular.module('openeyesApp')
  .controller('PatientSummaryCtrl', ['$scope', '$routeParams', 'PatientSearch', function($scope, $routeParams, PatientSearch){

    this.init = function(){

      $scope.patient = {};

      // This is not exactly precise.
      $scope.age = function() {
        if (!$scope.patient.dob) {
          return;
        }
        var dobTime = new Date($scope.patient.dob);
        var age = (Date.now() - dobTime) / (1000 * 60 * 60 * 24 * 365.26);
        return age.toFixed(0);
      };

      this.getData();
    };

    this.getData = function() {
      $scope.patientId = $routeParams.patientId;
      PatientSearch.getPatient($scope.patientId)
        .success(function(data) {
          $scope.patient = data;
        })
        .error(function(data, status, headers, config) {
          console.log('Error getting patient data', data, status, headers, config);
        });
    };
  }])
  .directive('oePatientSummary', [function () {
    return {
      restrict: 'E', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/patientSummary.html',
      controller: 'PatientSummaryCtrl',
      link: function ($scope, element, attr, PatientSummaryCtrl) {
        PatientSummaryCtrl.init();
      }
    };
  }]);
