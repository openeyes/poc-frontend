'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:TreatmentCtrl
 * @description
 * # TreatmentCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('TreatmentCtrl', ['$scope', '$attrs', 'Treatment', 'Event', function($scope, $attrs, Treatment, Event){

    $scope.form = Event.getForm();
    $scope.rules = Event.getValidationRules('treatment');
    $scope.side = $attrs.side;

    var self = this;

    this.init = function(attrs){

      this.eyeSide = $scope.side = attrs.side;

      //  Listen for save event
      //  Broadcast by event page controller
      $scope.$on('event.save', this.broadcastModel);
      //  On creation populate dropdowns
      Treatment.getPreInjectionAntiseptics()
        .then(function(data) {
          $scope.preInjectAntiseptics = data;
        }, function(error) {
          console.log(error);
        });

      Treatment.getPreInjectionSkinCleansers()
        .then(function(data){
          $scope.preInjectSkinCleansers = data;
        }, function(error){
          console.log(error);
        });

      Treatment.getPreInjectionLoweringTherapies()
        .then(function(data){
          $scope.preInjectionLoweringTherapies = data;
        }, function(error){
          console.log(error);
        });

      Treatment.getDrugs()
        .then(function(data){
          $scope.drugs = data;
        }, function(error){
          console.log(error);
        });

      Treatment.getPostInjectionLoweringTherapies()
        .then(function(data){
          $scope.postInjectionLoweringTherapies = data;
        }, function(error){
          console.log(error);
        });
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: 'treatment',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:treatment
   * @description
   * # treatment
   * Directive of the openeyesApp
   */
  .directive('oeTreatment', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/treatment.html',
      controller: 'TreatmentCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, TreatmentCtrl) {
        TreatmentCtrl.init(attrs);
      }
    };
  }]);
