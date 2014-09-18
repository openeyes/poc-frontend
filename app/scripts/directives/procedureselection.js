'use strict';

angular.module('openeyesApp')
  .controller('ProcedureSelectionCtrl', ['$scope', '$attrs', '$parse', 'Procedure', 'Event', function($scope, $attrs, $parse, Procedure, Event){

    this.init = function(){

      $scope.form = Event.getForm();
      $scope.validations = Event.getValidationRules();
      $scope.name = $attrs.name;
      $scope.rules = Event.getValidationRules('procedures')[$scope.name];
      $scope.id = $attrs.id;
      $scope.placeholder = $attrs.placeholder || 'Choose a procedure...';

      //  Populate the procedures
      Procedure.getProcedures()
        .success(function(data) {
          $scope.options = data;
        })
        .error(function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });
    };
  }])
  .directive('oeProcedureSelection', [function () {

    return {
      restrict: 'AE', //E = element, A = attribute, C = class, M = comment
      scope: {
        model: '=?ngModel',
      },
      templateUrl: 'views/directives/multiSelect.html',
      controller: 'ProcedureSelectionCtrl',
      link: function ($scope, element, attr, ProcedureSelectionCtrl) {
        ProcedureSelectionCtrl.init();
      }
    };
  }]);
