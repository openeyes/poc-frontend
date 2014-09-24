'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:TreatmentOrderCtrl
 * @description
 * # TreatmentOrderCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('TreatmentOrderCtrl', ['$scope', '$attrs', 'Treatment', 'Event', 'MODEL_DOMAIN', function($scope, $attrs, Treatment, Event, MODEL_DOMAIN){

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
        name: MODEL_DOMAIN + 'TreatmentOrder',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:oeTreatmentOrder
   * @description
   * # oeTreatmentOrder
   * Directive of the openeyesApp
   */
  .directive('oeTreatmentOrder', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/treatmentOrder.html',
      controller: 'TreatmentOrderCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, TreatmentOrderCtrl) {
        TreatmentOrderCtrl.init(attrs);
      }
    };
  }]);
