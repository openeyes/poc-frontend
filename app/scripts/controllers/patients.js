'use strict';

angular.module('openeyesApp')
  .controller('PatientsCtrl', ['$scope', '$routeParams', 'Event', 'Patient', function ($scope, $routeParams, Event, Patient) {

    var self = this;

    var labels = [
      'Vision Assessment by Optometrist',
      'Assessment for Macular Degeneration by Fellow in Clinic',
      'Injection by Nurse'
    ];

    this.showPatients = function() {

      this.getWorkFlow();
      this.getPatients();

      var stepIndex = parseInt($routeParams.stepIndex, 10);

      $scope.$watch('workflow', function(workflow) {
        if (workflow !== undefined) {
          $scope.step = angular.extend($scope.workflow.steps[stepIndex], {
            id: stepIndex,
            label: labels[stepIndex]
          });
        }
      });
    };

    this.getWorkFlow = function() {
      Event.getWorkflowConfig($routeParams.workflowId)
      .success(function(data){
        $scope.workflow = data;
      })
      .error(function(data, status, headers, config) {
        console.log('Error getting workflow', data, status, headers, config);
      });
    };

    this.getPatients = function() {
      Patient.getPatientsForStep()
      .then(function(data) {
        $scope.patients = data.data;
      }, function(data, status, headers, config) {
        console.log('Error getting patients for step:', step, data, status, headers, config);
      });
    }

    this.showPatients();
  }]);
