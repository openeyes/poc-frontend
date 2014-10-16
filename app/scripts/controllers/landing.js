'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('LandingCtrl', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

    var self = this;


    $rootScope.$on( '$routeChangeSuccess', function() {
      self.setLanding();
    });

    this.setLanding = function(){
      //assign landing header based on whether the path matches any anchors on landing page or root
      switch($location.url()){
        case '/': $scope.landing = true;
        break;
        case '/#intro-section': $scope.landing = true;
        break;
        case '/#benefits-section': $scope.landing = true;
        break;
        case '/#tech-section': $scope.landing = true;
        break;
        case '/#workflow-section': $scope.landing = true;
        break;
        case '/#try-section': $scope.landing = true;
        break;
        default: $scope.landing = false;
        break;
      }
    };

    this.setLanding();

    

  }]);
