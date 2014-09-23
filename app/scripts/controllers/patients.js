'use strict';

angular.module('openeyesApp')
  .controller('PatientsCtrl', ['$scope', '$routeParams', 'Event', 'Patient', function ($scope, $routeParams, Event, Patient) {

    Event.getWorkflowConfig($routeParams.workflowId)
      .then(function(data){
        $scope.workflow = data.data
      }, function(data, status, headers, config) {
        console.log('Error getting workflow', data, status, headers, config);
      });

    Patient.getPatientsForStep()
      .then(function(data) {
        $scope.patients = data.data;
      }, function(data, status, headers, config) {
        console.log('Error getting patients for step:', step, data, status, headers, config);
      });

    $scope.stepIndex = parseInt($routeParams.stepIndex, 10);

    $scope.$watch('workflow', function(workflow) {
      if (workflow !== undefined) {
        $scope.step = $scope.workflow.steps[$scope.stepIndex];
      }
    });
  }]);
