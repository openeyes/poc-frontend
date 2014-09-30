'use strict';

angular.module('openeyesApp')
  .controller('PatientListCtrl', ['$scope', '$routeParams', '$rootScope', '$location', 'Workflow', 'Ticket', 'Dates', function ($scope, $routeParams, $rootScope, $location, Workflow, Ticket, Dates) {

   var self = this;

    this.init = function() {

      $scope.stepIndex = parseInt($routeParams.stepIndex, 10);
      $scope.getAge = Dates.getAge;
      $scope.start = this.start.bind(this);
      $scope.close = this.close.bind(this);

      this.bindEvents();

      this.getWorkflow()
      .then(this.getTicket)
      .then(this.getTickets);
    };

    this.bindEvents = function() {

      $scope.$on('patientList.close', function() {
        document.body.classList.remove('patient-list-open');
      });

      $scope.$on('patientList.open', function() {
        document.body.classList.add('patient-list-open');
      });

      $scope.$on('patientList.toggle', function() {
        document.body.classList.toggle('patient-list-open');
      });

      $scope.$on('$destroy', function() {
        $rootScope.$broadcast('patientList.close');
      });
    };

    this.close = function($event) {
      $event.preventDefault();
      $rootScope.$broadcast('patientList.close');
    };

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

    this.getTime = (function() {
      var now = Date.now();
      return function() {
        return now += (15 * 60 * 1000); //15 min
      };
    }());

    this.getRandomAvatar = function() {
      return Math.floor(Math.random() * 6) + 1;
    };

    this.getWorkflow = function() {
      return Workflow.getConfig($routeParams.workflowId)
        .then(function(response){
          $scope.workflow = response.data;
          $scope.step = $scope.workflow.steps[$scope.stepIndex];
        }, function(data, status, headers, config) {
          console.log('Error getting workflow', data, status, headers, config);
        });
    };

    this.getTicket = function() {
      return $routeParams.ticketId ? Ticket.getTicket($routeParams.ticketId)
        .then(function(response) {
          $scope.ticket = response.data;
        }, function(data, status, headers, config) {
          console.log('Error getting ticket', data, status, headers, config);
        }) : true;
    };

    this.getTickets = function() {
      return Ticket.getTickets($scope.workflow._id.$oid, $scope.stepIndex)
        .then(function(data) {
          $scope.tickets = data.data.filter(function(ticket) {
            return $scope.ticket ? (ticket.patient._id.$oid !== $scope.ticket.patient._id.$oid) : true;
          }).map(function(ticket) {
            return angular.extend(ticket, {
              appointmentTime: self.getTime()
            });
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
