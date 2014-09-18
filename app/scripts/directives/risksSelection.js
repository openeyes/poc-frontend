'use strict';

angular.module('openeyesApp')
  .controller('RisksSelectionCtrl', ['$scope', '$attrs', '$parse', 'InjectionManagement', function($scope, $attrs, $parse, InjectionManagement){

    this.init = function(){
      $scope.placeholder = $attrs.placeholder || 'Select risks...';
      this.getRisks();
    };

    this.getRisks = function() {
      InjectionManagement.getRisks()
        .then(function(data) {
          $scope.options = data;
        }, function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });
      };
  }])
  .directive('oeRisksSelection', [function () {

    return {
      restrict: 'AE', //E = element, A = attribute, C = class, M = comment
      scope: {
        model: '=?ngModel',
      },
      templateUrl: 'views/directives/multiSelect.html',
      controller: 'RisksSelectionCtrl',
      link: function ($scope, element, attr, RisksSelectionCtrl) {
        RisksSelectionCtrl.init();
      }
    };
  }]);
