'use strict';

angular.module('openeyesApp')
  .controller('PatientListCtrl', ['$scope', '$routeParams', '$location', 'Event', 'Ticket', 'Dates', function ($scope, $routeParams, $location, Event, Ticket, Dates) {

   var self = this;

    this.init = function() {

      $scope.stepIndex = parseInt($routeParams.stepIndex, 10);

      $scope.$watch('workflow', function(workflow) {
        if (workflow !== undefined) {
          $scope.step = $scope.workflow.steps[$scope.stepIndex];
          self.getTickets();
        }
      });

      $scope.getAge = Dates.getAge;
      $scope.start = this.start.bind(this);
      $scope.close = this.close.bind(this);

      this.getWorkflow();
    };

    this.getWorkflow = function() {
      Event.getWorkflowConfig($routeParams.workflowId)
        .then(function(data){
          $scope.workflow = data.data;
        }, function(data, status, headers, config) {
          console.log('Error getting workflow', data, status, headers, config);
        });
    };

    this.close = function($event) {
      $event.preventDefault();
      document.body.classList.remove('patient-list-open');
    };

    this.getTime = (function() {
      var now = Date.now();
      return function() {
        return now += (15 * 60 * 1000); //15 min
      };
    }());

    this.start = function($event, ticket) {

      $event.preventDefault();

      var url = [
        'patient',
        $scope.workflow._id.$oid,
        ticket._id.$oid,
        $scope.stepIndex
      ].join('/');

      $location.path(url);
    };

    this.getRandomAvatar = function() {
      return Math.floor(Math.random() * 6) + 1;
    };

    this.getTickets = function() {
      Ticket.getTickets($scope.workflow._id.$oid, $scope.stepIndex)
        .then(function(data) {
          $scope.tickets = data.data.map(function(ticket) {
            ticket.patient.avatar = self.getRandomAvatar();
            ticket.appointmentTime = self.getTime();
            return ticket;
          });
        }, function(data, status, headers, config) {
          console.log('Error getting patients', data, status, headers, config);
        });
    };

  }])
  .directive('oePatientList', [function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'views/directives/patientList.html',
      controller: 'PatientListCtrl',
      link: function ($scope, element, attr, PatientListCtrl) {
        PatientListCtrl.init();
      }
    };
  }]);
