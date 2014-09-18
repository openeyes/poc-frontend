'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('AcuityCtrl', ['$scope', 'Acuity', 'Event', 'MODEL_DOMAIN', function($scope, Acuity, Event, MODEL_DOMAIN){

    var self = this;

    this.init = function(attrs){
      //  Listen for save event
      //  Broadcast by event page controller
      this.eyeSide = attrs.side;
      $scope.model = {};
      $scope.model.readings = [];
      $scope.model.comment = '';
      $scope.$on('event.save', this.broadcastModel);
      //  On creation populate dropdown

      Acuity.getAcuityFields()
        .then(function(data) {
          $scope.measurements = data.measurements;
          $scope.corrections = data.corrections;
        }, function(error) {
          console.log(error);
        });
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: MODEL_DOMAIN + 'VisualAcuity',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };

    // $scope methods
    $scope.addRow = function(){
      $scope.model.readings.push({
        value: 0,
        correction: ''
      });
    };

    $scope.removeRow = function(index){
      $scope.model.readings.splice(index, 1);
    };

  }])
  /**
   * @ngdoc function
   * @name openeyesApp.directive:acuity
   * @description
   * # acuity
   * Directive of the openeyesApp
   */
  .directive('oeAcuity', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/acuity.html',
      controller: 'AcuityCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, AcuityCtrl) {
        AcuityCtrl.init(attrs);
      }
    };
  }]);
