'use strict';

angular.module('openeyesApp')
  .controller('PatientsCtrl', ['$scope', '$routeParams', '$location', 'Event', 'Ticket', 'Dates', function ($scope, $routeParams, $location, Event, Ticket, Dates) {

    var getTime = (function() {
      var now = Date.now();
      return function() {
        now += (15 * 60 * 1000); //15 min
        return Dates.getFormattedTime(now);
      };
    }());

    function getTickets() {
      Ticket.getTickets($scope.workflow._id.$oid, $routeParams.stepIndex)
        .then(function(data) {
          $scope.tickets = data.data.map(function(ticket) {
            return angular.extend(ticket, {
              appointmentTime: getTime()
            });
          });
        }, function(data, status, headers, config) {
          console.log('Error getting patients', data, status, headers, config);
        });
    }

    $scope.stepIndex = parseInt($routeParams.stepIndex, 10);

    $scope.$watch('workflow', function(workflow) {
      if (workflow !== undefined) {
        $scope.step = $scope.workflow.steps[$scope.stepIndex];
        getTickets();
      }
    });

    $scope.getAge = Dates.getAge;

    $scope.start = function($event, ticket) {

      $event.preventDefault();

      var url = [
        'patient',
        $scope.workflow._id.$oid,
        ticket._id.$oid,
        $scope.stepIndex
      ].join('/');

      $location.path(url);
    }

    Event.getWorkflowConfig($routeParams.workflowId)
      .then(function(data){
        $scope.workflow = data.data;
      }, function(data, status, headers, config) {
        console.log('Error getting workflow', data, status, headers, config);
      });

    document.body.classList.add('page-patients');

    $scope.$on('$destroy', function() {
      document.body.classList.remove('page-patients');
    });

  }]);
