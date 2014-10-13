'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AllergiesCtrl
 * @description
 * # AllergiesCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('AllergiesCtrl', ['$scope', '$routeParams', 'Patient', 'Allergies', 'Encounter', 'Element', 'Ticket', 'MODEL_DOMAIN', function($scope, $routeParams, Patient, Allergies, Encounter, Element, Ticket, MODEL_DOMAIN){

    var self = this;

    this.init = function(){
      //  Listen for save event
      //  Broadcast by encounter page controller
      $scope.model = {};
      $scope.model.allergies = [];
      $scope.$on('encounter.save', this.broadcastModel);

      $scope.$watch('patient', function(patient) {
        if (patient) {
          self.getPatientAllergies();
        }
      });
      //  On creation populate dropdown

      Allergies.getAllergyMeds()
        .then(function(data) {
          $scope.allergies = data;
          self.getPatient();
        }, function(error) {
          console.log(error);
        });

    };

    this.getPatientAllergies = function(){
      var eType = MODEL_DOMAIN + 'VisualAcuity';

      Element.getElements($scope.patient._id.$oid, eType, null)
        .then(function(data) {
          $scope.model.allergies = data.data;
          self.pruneExistingAllergies();
        }, function(error) {
          console.log(error);
          $scope.model.allergies = [];
        });
    };

    this.getPatient = function() {
      Ticket.getTicket($routeParams.ticketId)
        .then(function(data) {
          $scope.patient = data.data.patient;
        }, function(data, status, headers, config) {
          console.log('Error getting patient data', data, status, headers, config);
        });
    };

    this.broadcastModel = function(){
      Encounter.addElement(self.getModel());
    };

    this.getModel = function(){
      return {
        name: MODEL_DOMAIN + 'Allergies',
        model: $scope.model
      };
    };

    this.pruneExistingAllergies = function(){
      for(var i = 0;i < $scope.model.allergies.length;i++){
        var index = $scope.allergies.indexOf($scope.model.allergies[i].name);
        if(index) {
          $scope.allergies.splice(index, 1);
        }
      }
    };

    // $scope methods
    $scope.addAllergy = function(){
      //  Add to model
      $scope.model.allergies.push({name: $scope.currentAllergy, comment: ''});
      //  Remove from dropdown
      $scope.allergies.splice($scope.allergies.indexOf($scope.currentAllergy), 1);
      //  Reset dropdown
      $scope.currentAllergy = '';
    };

    $scope.removeRow = function(allergy){
      //  Add back into dropdown
      var index = $scope.model.allergies.indexOf(allergy);
      $scope.allergies.push($scope.model.allergies[index].name);
      //  Remove from list
      $scope.model.allergies.splice(index, 1);
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:allergies
   * @description
   * # allergies
   * Directive of the openeyesApp
   */
  .directive('oeAllergies', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/allergies.html',
      controller: 'AllergiesCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, AllergiesCtrl) {
        AllergiesCtrl.init(attrs);
      }
    };
  }]);
