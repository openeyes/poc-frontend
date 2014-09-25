'use strict';

angular.module('openeyesApp')
  .controller('PatientSummaryCtrl', ['$scope', '$routeParams', 'Ticket', 'Patient', function($scope, $routeParams, Ticket, Patient){

    var self = this;

    this.init = function(){

      $scope.patient = null;
      $scope.ticketId = $routeParams.ticketId;

      // This is not exactly precise.
      $scope.age = function() {
        if (!$scope.patient.dob) {
          return;
        }
        var dobTime = new Date($scope.patient.dob).getTime();
        var age = (Date.now() - dobTime) / (1000 * 60 * 60 * 24 * 365.26);
        return age.toFixed(0);
      };

      $scope.$watch('patient', function(patient) {
        if (patient) {
          self.getPatientAllergies();
        }
      });

      this.getTicket();
    };

    this.getPatientAllergies = function() {
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
      scope: {},
      templateUrl: 'views/directives/patientSummary.html',
      controller: 'PatientSummaryCtrl',
      link: function ($scope, element, attr, PatientSummaryCtrl) {
        PatientSummaryCtrl.init();
      }
    };
  }]);
