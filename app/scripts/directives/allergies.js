'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AllergiesCtrl
 * @description
 * # AllergiesCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('AllergiesCtrl', ['$scope', 'Patient', 'Allergies', 'Event', function($scope, Patient, Allergies, Event){

    var self = this;

    this.init = function(){
      //  Listen for save event
      //  Broadcast by event page controller
      $scope.model = {};
      $scope.$on('event.save', this.broadcastModel);
      //  On creation populate dropdown

      Allergies.getAllergyMeds()
        .then(function(data) {
          $scope.allergies = data;
          Patient.getExistingAllergies('TEST_ID')
            .then(function(data) {
              $scope.model.allergies = data;
              self.pruneExistingAllergies();
            }, function(error) {
              console.log(error);
            });
        }, function(error) {
          console.log(error);
        });

    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'allergies',
        model: $scope.model
      };
    };

    this.pruneExistingAllergies = function(){
      for(var i = 0;i < $scope.model.allergies.length;i++){
        var index = $scope.allergies.indexOf($scope.model.allergies[i]);
        if(index) {
          $scope.allergies.splice(index, 1);
        }
      }
    };

    // $scope methods
    $scope.addAllergy = function(){
      //  Add to model
      $scope.model.allergies.push($scope.currentAllergy);
      //  Remove from dropdown
      $scope.allergies.splice($scope.allergies.indexOf($scope.currentAllergy), 1);
      //  Reset dropdown
      $scope.currentAllergy = '';
    };

    $scope.removeRow = function(allergy){
      //  Add back into dropdown
      var index = $scope.model.allergies.indexOf(allergy);
      $scope.allergies.push($scope.model.allergies[index]);
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
