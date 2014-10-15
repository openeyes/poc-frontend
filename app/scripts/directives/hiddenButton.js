'use strict';

angular.module('openeyesApp')
  .controller('HiddenButtonCtrl', ['$scope',function($scope){

    this.init = function($scope, element){
      
      $scope.hideModal = function(){
        console.log("clicked");
        $('.modal').modal('hide');
      }
    };


  }])
  .directive('oeHiddenButton', [function() {
    return {
      scope: {},
      restrict: 'A',
      controller: 'HiddenButtonCtrl',
      link: function(scope, element, attr, HiddenButtonCtrl) {
        HiddenButtonCtrl.init(scope, element);
      }
    };
  }]);
