'use strict';

angular.module('openeyesApp')
  .controller('HiddenButtonCtrl', ['$scope', '$location', function($scope, $location){

    this.init = function(element){
      
      $scope.backToMenu = function(){
        console.log("clicked");
        $('.modal').modal('hide');

        $location.url( '/#intro-section' );
      }
    };


  }])
  .directive('oeHiddenButton', [function() {
    return {
      scope: {},
      restrict: 'A',
      controller: 'HiddenButtonCtrl',
      link: function(element, attr, HiddenButtonCtrl) {
        HiddenButtonCtrl.init(element);
      }
    };
  }]);
