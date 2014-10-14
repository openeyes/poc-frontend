'use strict';

angular.module('openeyesApp')
  .controller('NavigationCtrl', ['$scope', '$rootScope', '$location', '$timeout', function($scope, $rootScope, $location, $timeout){

    var self = this;

    this.init = function(element) {

      this.element = element;
      this.navbar = $(element).find('.navbar');
      
      //set scrollspy target for scrollscy directive to pick up
      $(self.navbar).addClass('scrollspy-nav');

      $scope.setActiveSlide = function(event){

        var anchor = $(event.currentTarget).attr('href').slice(1);

        //set active nav state
        $scope.setNavState(event.currentTarget);
        $location.hash(anchor); //scroll to id
        
        $(self.navbar).removeClass('scrollspy-nav');
        $rootScope.$broadcast('scrollspy.stop'); 

        $('html, body').animate({
          scrollTop: ($('#' + anchor).offset().top )
        }, 500,
              function(){
                $(self.navbar).addClass('scrollspy-nav');
                $rootScope.$broadcast('scrollspy.start'); 
                 //callback called twice? 
              });

        event.preventDefault();
      };

      //scroll user to anchor in page if you deeplink in with an anchor
      $scope.detectAnchorOnLoad = function(anchor){
        var activeItem = $('a[href="#' + anchor + '"]');

        //set active nav state
        $scope.setNavState(activeItem);

        $location.hash(anchor);

        if($scope.currentHash !== ''){
          $(self.navbar).removeClass('scrollspy-nav');
          $rootScope.$broadcast('scrollspy.stop');
          
          $timeout(function(){ //gross timeout hack to force sections to be loaded
            $('html, body').animate(
              {scrollTop: ($('#' + anchor).offset().top )},
              500,
              function(){
                $(self.navbar).addClass('scrollspy-nav');
                $rootScope.$broadcast('scrollspy.start'); 
              }
            );
          }, 100);
        }else{
          $scope.setNavState($('a[href="#intro-section"]'));
        }
      };

      $scope.setNavState = function(activeItem){
        $(self.element).find('.active').removeClass('active');
        $(activeItem).parent().addClass('active');
      };

      //get current hash location from location.path and set active item if its not root '/''
      $scope.currentHash = $location.hash();

      if($scope.currentHash !== '/'){
        $scope.detectAnchorOnLoad($scope.currentHash);
      }
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
