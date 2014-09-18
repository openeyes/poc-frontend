'use strict';

angular.module('openeyesApp')
  .controller('DiagnosisSelectionCtrl', ['$scope', '$attrs', '$parse', 'Conditions', function($scope, $attrs, $parse, Conditions){

    var self = this;

    this.init = function(attr){

      $scope.placeholder = attr.placeholder || 'Choose a diagnosis...';

      // Get all disorders
      if (!$attrs.secondaryTo) {
        this.getDisorders();
      }
      // Get filtered orders
      else {
        $scope.$watch('secondaryTo', function(secondaryTo) {
          if (secondaryTo) {
            self.getDisorders(secondaryTo.id);
          }
        });
      }
    };

    this.getDisorders = function(secondaryToId) {
      Conditions.getDisorders(secondaryToId)
        .then(function(data) {
          $scope.options = data;
        }, function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });
    };
  }])
  .directive('oeDiagnosisSelection', [function () {

    return {
      restrict: 'E',
      scope: {
        model: '=?ngModel',
        secondaryTo: '=?'
      },
      templateUrl: 'views/directives/select.html',
      controller: 'DiagnosisSelectionCtrl',
      link: function ($scope, element, attr, DiagnosisSelectionCtrl) {
        DiagnosisSelectionCtrl.init(attr);
      }
    };
  }]);
