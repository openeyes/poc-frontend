'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('AcuityCtrl', ['$scope', 'Acuity', 'Encounter', 'MODEL_DOMAIN', function($scope, Acuity, Encounter, MODEL_DOMAIN){

    var self = this;

    this.init = function(attrs){
      //  Listen for save event
      //  Broadcast by encounter page controller
      this.eyeSide = attrs.side;
      $scope.model = {};
      $scope.model.readings = [{
        value: 0,
        correction: ''
      }];
      $scope.model.comment = '';
      $scope.$on('encounter.save', this.broadcastModel);
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
      Encounter.addElement(self.getModel());
    };

    this.getModel = function(){
      return {
        name: MODEL_DOMAIN + 'VisualAcuity',
        subPath: this.eyeSide,
        model: $scope.model
      };
    };

    // $scope methods
    $scope.change = function() {
      if($scope.unableToAccess || $scope.eyeMissing){
        $scope.disableScores = true;
      }else{
        $scope.disableScores = false;
      }
    };

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
