'use strict';

angular.module('openeyesApp')
  .controller('NavigationCtrl', ['$scope', '$attrs',  function($scope, $attrs){


    this.init = function() {

      $scope.currentSlide = 0;
    
      // $scope.$on('$routeChangeSuccess', );
  
      $scope.isActive = function () {
        // return location === $location.path();
      };

      //detect click event on nav item

        //scroll page to correct Heading area

        //set active item on the navigation item

        //remove active state from current item

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
        $scope.resetNavigation();
        $scope.currentSlide = slideNo; 
        $($event.currentTarget).parent().addClass('active');
        console.log($scope.currentSlide);
    
        //add className to nav item
      };

      $scope.resetNavigation = function(){
        $scope.currentSlide = 0;
        //remove classname from all items
      }

    };

  }])
  .directive('oeNavigation', [function () {
    return {
      restrict: 'E',
      templateUrl: 'views/directives/navigation.html',
      controller: 'NavigationCtrl',
      link: function ($scope, element, attrs, NavigationCtrl) {
        NavigationCtrl.init();  
        console.log("val in dir", $scope.currentSlide); //this value does exist, but watch isn't triggering when it changes. 

        $scope.$watch($scope.currentSlide, function(){
          //watch function not being triggered?
          console.log("watch no", $scope.currentSlide);
          var activeList = $(element).find('.active');
          activeList.removeClass(".active");
        })
      }
    };
  }]);
