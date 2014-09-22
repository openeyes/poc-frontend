'use strict';

angular.module('openeyesApp')
  .controller('StepsCtrl', ['$scope', '$routeParams', 'Event', 'Patient', function ($scope, $routeParams, Event, Patient) {

    $scope.patients = [];
    $scope.steps = [];

    var stepId = $routeParams.stepId;

    this.showPatients = function(step) {
      $scope.stepId = step;
      Patient.getPatientsForStep(step)
        .then(function(data) {
          $scope.patients = data;
          console.log($scope.patients);
        }, function() {
          console.log('Error getting patients for step:', step);
        });
    };

    this.showSteps = function(site) {
      $scope.steps = [
        {
          role: 'Optometrist',
          id: 0
        },
        {
          role: 'Fellow',
          id: 1
        },
        {
          role: 'Injector',
          id: 2
        }
      ];
    };

    if (stepId) {
      this.showPatients(stepId);
    } else {
      this.showSteps();
    }
  }]);
