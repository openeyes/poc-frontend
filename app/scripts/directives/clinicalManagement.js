'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('ClinicalManagementCtrl', ['$scope', '$attrs', 'ClinicalManagement', 'Event', 'MODEL_DOMAIN', function($scope, $attrs, ClinicalManagement, Event, MODEL_DOMAIN){

    var self = this;

    this.init = function(){
      $scope.$on('event.save', this.broadcastModel);
      $scope.model = {};
      this.getData();
    };

    this.broadcastModel = function(){
      Event.addToEventStack(self.getModel());
    };

    this.getModel = function(){
      return {
        name: MODEL_DOMAIN + 'ClinicalManagement',
        model: $scope.model
      };
    };

    this.getData = function() {
      ClinicalManagement.getMacros()
        .then(function(data) {
          $scope.macros = data;
        }, function() {
          console.log('Unable to get clinical management macros');
        });
    };

    $scope.insertMacro = function() {
      var label = $scope.macro.label;
      $scope.macro = '';

      if (!$scope.model.comments) {
        $scope.model.comments = label;
      } else {
        $scope.model.comments += ', ' + (label.charAt(0).toLowerCase() + label.slice(1));
      }
    };
  }])
  .directive('oeClinicalManagement', [function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/clinicalManagement.html',
      controller: 'ClinicalManagementCtrl',
      link: function (scope, element, attrs, ClinicalManagementCtrl) {
        ClinicalManagementCtrl.init();
      }
    };
  }]);
