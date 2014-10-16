'use strict';

angular.module('openeyesApp')
  .controller('BodyScrollSpyCtrl', ['$scope', function($scope){

    this.init = function(element){
      element.scrollspy({
        target: '.scrollspy'
      });

      $scope.$on('scrollspy.start', function(){
        $('.scrollspy').addClass('scrollspy');
        element.scrollspy('refresh');
      });

      $scope.$on('scrollspy.stop', function(){
        $('.scrollspy').removeClass('scrollspy');
        element.scrollspy('refresh');
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
