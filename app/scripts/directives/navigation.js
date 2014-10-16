'use strict';

angular.module('openeyesApp')
  .controller('NavigationCtrl', ['$scope', '$rootScope', '$location', '$timeout', function($scope, $rootScope, $location, $timeout){

    var self = this;

    this.init = function(element) {
      this.element = element;
      this.navbar = element.find('.navbar');

      $scope.currentHash = $location.hash();
      $scope.detectAnchorOnLoad($scope.currentHash);
    };

    $scope.animateScroll = function(href){
      angular.element('html, body').animate(
        { scrollTop: angular.element('#' + href).offset().top },
        500,
        function(){
          $rootScope.$broadcast('scrollspy.start');
        }
      );
    };

    //scroll user to anchor in page if you deeplink in with an anchor
    $scope.detectAnchorOnLoad = function(href){
      if(href === '/'){ return; }

      var activeLink = angular.element('a[href="#' + href + '"]');
      $scope.setNavState(activeLink, href);

      if($scope.currentHash === ''){
        $scope.setNavState(angular.element('a[href="#intro-section"]'));
        return;
      }

      $rootScope.$broadcast('scrollspy.stop');

      // Gross timeout hack to force sections to be loaded
      $timeout(function(){
        $scope.animateScroll(href);
      }, 100);
    };

    $scope.setActiveSlide = function(e){
      e.preventDefault();
      $rootScope.$broadcast('scrollspy.stop');

      var link = angular.element(e.currentTarget);
      var href = link.attr('href').slice(1);

      $scope.setNavState(link, href);
      $scope.animateScroll(href);
    };

    $scope.setNavState = function(link, href){
      self.element.find('.active').removeClass('active');
      link.parent().addClass('active');
      $location.hash(href);
    };
  }])
  .directive('oeNavigation', [function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/navigation.html',
      controller: 'NavigationCtrl',
      link: function ($scope, element, attrs, NavigationCtrl) {
        NavigationCtrl.init(element);
      }
    };
  }]);
