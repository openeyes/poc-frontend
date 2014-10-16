'use strict';

angular.module('openeyesApp')
  .controller('HiddenButtonCtrl', ['$scope', '$location', function($scope, $location){

    var self = this;

    this.init = function(element){

      
      
      $scope.backToMenu = function(){
        $('.modal').on('hidden.bs.modal', self.goBackToMenu)
        $('.modal').modal('hide');
      }
    };

    this.goBackToMenu = function(e){
      $location.url( '/#try-section' );
      $scope.$apply();
    };

  }])
  .directive('oeHiddenButton', [function() {
    return {
      restrict: 'E',
      controller: 'HiddenButtonCtrl',
      link: function(scope, element, attr, HiddenButtonCtrl) {
        HiddenButtonCtrl.init(element);
      }
    };
  }]);
