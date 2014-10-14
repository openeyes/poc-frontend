'use strict';

angular.module('openeyesApp')
  .controller('BodyScrollSpyCtrl', ['$scope',function($scope){

    this.init = function(element){
      $(element).scrollspy({ target: '.scrollspy-nav' })

      $scope.$on('scrollspy.start', function(){
        $(element).scrollspy({ target: '.scrollspy-nav' })
        $(element).scrollspy('refresh')
      });

      $scope.$on('scrollspy.stop', function(){
        $(element).scrollspy({ target: '' })
        $(element).scrollspy('refresh')
      });
    };
  }])
  .directive('oeBodyScrollSpy', [function() {
    return {
      scope: {},
      restrict: 'A',
      controller: 'BodyScrollSpyCtrl',
      link: function($scope, element, attr, BodyScrollSpyCtrl) {
        BodyScrollSpyCtrl.init(element);
      }
    };
  }]);
