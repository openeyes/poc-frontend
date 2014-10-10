'use strict';

angular.module('openeyesApp')
  .controller('NavigationCtrl', ['$scope', '$location', '$timeout', function($scope, $location, $timeout){

    this.init = function() {

      $scope.activeListItem = {};
      
      //TODO: Specified interactions for manual scroll and key events

      //detect scroll action of page. Debounce method inside barcodeScan directive

        //if section changes remove active state of current page
        //set active state of page

      //detect arrow down key  -> key events bind in controller in barcode

        //scroll page to next section

        //remove current active state

        //set new active state

      //detect arrow up key

        //scroll page to previous section

        //remove current active state

        //set new active state

      $scope.setActiveSlide = function(event){

        var anchor = $(event.currentTarget).attr('href').slice(1);

        //set active nav state
        $scope.setNavState(event.currentTarget);
        //scroll to id

        $location.hash(anchor);
        
        $('html, body').animate({
          scrollTop: ($("#"+anchor).offset().top-180)
        },500);
       
        event.preventDefault();
      }

      //scroll user to anchor in page if you deeplink in with an anchor
      $scope.detectAnchorOnLoad = function(anchor){

        var activeItem = $("a[href='#"+anchor+"']");

        //set active nav state
        $scope.setNavState(activeItem);

        $location.hash(anchor);

        if($scope.currentHash !== ''){
          $timeout(function(){ //gross timeout hack to force sections to be loaded
            $('html, body').animate({
              scrollTop: ($("#"+anchor).offset().top-180)
            },500);
          },100)
        }else{
          $scope.setNavState($("a[href='#intro-section']"));
        }
      }

      $scope.setNavState = function(activeItem){
        $('nav').find('.active').removeClass('active');
        $(activeItem).parent().addClass('active');
      }

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
      link: function ($scope, element, attrs, NavigationCtrl, $timeout) {
        NavigationCtrl.init();     
      }


    };
  }]);
