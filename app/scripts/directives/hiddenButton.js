'use strict';

angular.module('openeyesApp')
  .controller('HiddenButtonCtrl', ['$scope',function($scope){

    this.init = function(element){
      console.log("init?")
      $scope.hideModal = function(){
        $('.modal').modal('hide');
      }
    };
  }])
  .directive('oeHiddenButton', [function() {
    return {
      scope: {},
      restrict: 'A',
      controller: 'HiddenButtonCtrl',
      link: function($scope, element, attr, HiddenButtonCtrl) {
        HiddenButtonCtrl.init(element);
      }
    };
  }]);
