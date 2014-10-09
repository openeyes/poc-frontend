'use strict';

angular.module('openeyesApp')
  .controller('NavigationCtrl', ['$scope', '$attrs', '$rootScope',  function($scope, $attrs, $rootScope){


    this.init = function() {

      $scope.currentSlide = 1; 
      $scope.activeListItem = {};
      $scope.anchorID = '#intro-section';  
      
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

      $scope.setActiveSlide = function(slideNo, $event) {
        $scope.currentSlide = slideNo; 
        $scope.activeListItem = $event.currentTarget;
      };

      //call active slide when page loads to set intro as beginning
      $scope.setActiveSlide(1, {currentTarget:'a#intro'});

      $scope.$watch('currentSlide', function(oldVal, newVal){       
        $('nav').find('.active').removeClass('active');
        $($scope.activeListItem).parent().addClass('active');
        $scope.anchorID = $($scope.activeListItem).attr('href');

        //basic checking to prevent watch running on load
        if(oldVal !== newVal){
          $('html, body').animate({
              scrollTop: ($($scope.anchorID).offset().top-180)
          },500);
        }
       
      });

    };

  }])
  .directive('oeNavigation', [function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/navigation.html',
      controller: 'NavigationCtrl',
      link: function ($scope, element, attrs, NavigationCtrl) {
        NavigationCtrl.init();         
      }
    };
  }]);
