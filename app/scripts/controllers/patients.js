'use strict';

angular.module('openeyesApp')
  .controller('PatientsCtrl', ['$scope', '$routeParams', 'Event', 'Ticket', function ($scope, $routeParams, Event, Ticket) {

    function getTickets() {
      Ticket.getTickets($scope.workflow._id.$oid, 0)
        .then(function(data) {
          $scope.tickets = data.data;
        }, function(data, status, headers, config) {
          console.log('Error getting patients', data, status, headers, config);
        });
    }

    Event.getWorkflowConfig($routeParams.workflowId)
      .then(function(data){
        $scope.workflow = data.data;
      }, function(data, status, headers, config) {
        console.log('Error getting workflow', data, status, headers, config);
      });

    $scope.stepIndex = parseInt($routeParams.stepIndex, 10);

    $scope.$watch('workflow', function(workflow) {
      if (workflow !== undefined) {
        $scope.step = $scope.workflow.steps[$scope.stepIndex];
        getTickets();
      }
    });
  }]);
