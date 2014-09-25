'use strict';

angular.module('openeyesApp')
  .controller('PatientSummaryCtrl', ['$scope', '$routeParams', 'Ticket', 'Patient', 'Dates', function($scope, $routeParams, Ticket, Patient, Dates){

    var self = this;

    this.init = function(){

      $scope.patient = null;
      $scope.ticketId = $routeParams.ticketId || '5422cb723004f335a892a728'; // TODO: remove default patient id
      $scope.getAge = this.getAge.bind(this);
      $scope.openList = this.openList.bind(this);
      $scope.$watch('patient', this.getPatientAllergies.bind(this));

      $scope.$on('$destroy', function() {
        document.body.classList.remove('has-patient-summary');
      });
      document.body.classList.add('has-patient-summary');

      this.getTicket();
    };

    this.getAge = function() {
      if (!$scope.patient.dob) {
        return;
      }
      return Dates.getAge($scope.patient.dob);
    }

    this.openList = function($event) {
      $event.preventDefault();
      document.body.classList.toggle('patient-list-open');
    };

    this.getPatientAllergies = function() {
      if (!$scope.patient) {
        return;
      }
      Patient.getExistingAllergies($scope.patient._id.$oid)
        .then(function(data) {
          $scope.allergies = data;
        }, function() {
          console.log('Error getting allergies');
        });
    };

    this.getTicket = function() {
      Ticket.getTicket($scope.ticketId)
        .then(function(data) {
          $scope.patient = data.data.patient;
        }, function(data, status, headers, config) {
          console.log('Error getting patient data', data, status, headers, config);
        });
    };

  }])
  .directive('oePatientSummary', [function () {
    return {
      restrict: 'E', //E = element, A = attribute, C = class, M = comment
      replace: true,
      scope: {},
      templateUrl: 'views/directives/patientSummary.html',
      controller: 'PatientSummaryCtrl',
      link: function ($scope, element, attr, PatientSummaryCtrl) {
        PatientSummaryCtrl.init();
      }
    };
  }]);
