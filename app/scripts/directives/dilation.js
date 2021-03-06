'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AllergiesCtrl
 * @description
 * # AllergiesCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('DilationCtrl', ['$scope', 'Patient', 'Dilation', 'Encounter', 'MODEL_DOMAIN', function($scope, Patient, Dilation, Encounter, MODEL_DOMAIN){

    var self = this;

    this.init = function(attrs){
      //  Listen for save event
      //  Broadcast by encounter page controller
      this.eyeSide = attrs.side;
      $scope.model = {};
      $scope.model.dilations = [{
        time: '',
        drug: '',
        drops: ''
      }];
      $scope.$on('encounter.save', this.broadcastModel);
      //  On creation populate dropdown

      Dilation.getDilationMeds()
        .then(function(data) {
          $scope.dilationMeds = data;
        }, function(error) {
          console.log(error);
        });

    };

    this.broadcastModel = function(){
      Encounter.addElement(self.getModel());
    };

    this.getModel = function(){
      return {
        name: MODEL_DOMAIN + 'Dilation',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };

    // $scope methods
    $scope.addDilation = function(){
      //  Add to model
      $scope.model.dilations.push({
        time: '',
        drug: '',
        drops: ''
      });
      //  Remove from dropdown
      // $scope.dilationMeds.splice($scqope.dilationMeds.indexOf($scope.currentDilationMed), 1);
      //  Reset dropdown
      // $scope.currentDilationMed = '';
    };

    $scope.removeRow = function(index){
      //  Add back into dropdown
      // $scope.dilationMeds.push($scope.model.dilations[index].drug);
      //  Remove from list
      $scope.model.dilations.splice(index, 1);


    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:allergies
   * @description
   * # allergies
   * Directive of the openeyesApp
   */
  .directive('oeDilation', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/dilation.html',
      controller: 'DilationCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, DilationCtrl) {
        DilationCtrl.init(attrs);
      }
    };
  }]);
