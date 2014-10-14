'use strict';

angular.module('openeyesApp')
  .controller('PatientSummaryCtrl', ['$scope', '$routeParams', '$rootScope', 'Ticket', 'Patient', 'Dates', function($scope, $routeParams, $rootScope, Ticket, Patient, Dates){

    this.init = function(element){
      var self = this;

      $scope.patient = null;
      $scope.ticketId = $routeParams.ticketId || '5422cb723004f335a892a728'; // TODO: remove default patient id
      $scope.getAge = this.getAge.bind(this);
      $scope.toggleList = this.toggleList.bind(this);
      $scope.$watch('patient', this.getPatientAllergies.bind(this));

      $scope.$on('$destroy', function() {
        document.body.classList.remove('has-patient-summary');
      });
      document.body.classList.add('has-patient-summary');

      this.element = element;
      this.getTicket();
      this.affixSummary(element);
    };

    this.affixSummary = function(element){
   
      $(element).affix({offset: { top: 48 }});

      $(element).on('affixed.bs.affix', function(){
        $(element).siblings().addClass('affix-containers');
      });

      $(element).on('affixed-top.bs.affix', function(){
        $(element).siblings().removeClass('affix-containers');
      });
    };
    
    this.getAge = function() {
      if (!$scope.patient.dob) {
        return;
      }
      return Dates.getAge($scope.patient.dob);
    };

    this.toggleList = function($event) {
      $event.preventDefault();
      $rootScope.$broadcast('patientList.toggle');
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

    this.getRandomAvatar = function() {
      return Math.floor(Math.random() * 6) + 1;
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
        PatientSummaryCtrl.init(element);
      }
    };
  }]);
