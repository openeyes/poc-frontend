'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:PatientCtrl
 * @description
 * # PatientCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('PatientCtrl', ['$scope', '$routeParams', 'PatientSearch', function ($scope, $routeParams, PatientSearch) {

    $scope.patient = null;
    $scope.patientId = $routeParams.patientId;
    PatientSearch.getPatient($scope.patientId)
      .success(function(data) {
        $scope.patient = data;
      })
      .error(function(data, status, headers, config) {
        console.log(data, status, headers, config);
      });

    Event.getWorkflowConfig()
      .success(function(data){
        var workflowConfig = data[0];
        $scope.workflowSteps = workflowConfig.steps;
      })
      .error(function(data, status, headers, config) {
        console.log(data, status, headers, config);
      });
  }]);
