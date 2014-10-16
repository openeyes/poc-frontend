'use strict';

angular.module('openeyesApp')
  .controller('BodyScrollSpyCtrl', ['$scope', function($scope){

    this.init = function(element){
      element.scrollspy({
        target: '.navbar-scrollspy'
      });

      $scope.$on('scrollspy.start', function(){
        angular.element('.navbar').addClass('navbar-scrollspy');
        element.scrollspy('refresh');
      });

      $scope.$on('scrollspy.stop', function(){
        angular.element('.navbar').removeClass('navbar-scrollspy');
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
