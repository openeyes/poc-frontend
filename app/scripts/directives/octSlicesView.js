'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:OctSlicesViewCtrl
 * @description
 * # OctSlicesViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('OctSlicesViewCtrl', ['$scope', '$routeParams', '$timeout', 'Element', 'Ticket', 'MODEL_DOMAIN', function($scope, $routeParams, $timeout, Element, Ticket, MODEL_DOMAIN){

    var self = this;

    var SLICE_HEIGHT = 452;
    var SLICE_WIDTH = 588;

    var COLS = 20;

    this.init = function(element){

      this.image = element.find('.img');

      $scope.loading = true;
      $scope.selectedRange = 1;
      $scope.error = false;
      $scope.model = {};

      this.loadImage();
    };

    $scope.change = function() {

      var index = ($scope.selectedRange -1);
      var row = Math.floor(index / COLS);
      var col = (index % COLS);
      var top = row * SLICE_HEIGHT * -1;
      var left = col * SLICE_WIDTH * -1;

      self.image.css('background-position', left + 'px ' + top + 'px');
    };

    this.loadImage = function(){

      this.imageUrl = Element.getOCTImages()[0];

      var image = new Image();
      image.src = this.imageUrl;
      image.onload = this.imageLoaded.bind(this);
      image.onerror = this.imageError.bind(this);
    };

    this.imageError = function() {
      $scope.loading = false;
      $scope.error = true;
    };

    this.imageLoaded = function(){
      $scope.loading = false;
      $timeout(function() {
        self.image.css('background-image', 'url(' + self.imageUrl + ')');
        $scope.change();
      });
    };

  }])
  .directive('oeOctSlicesView', [function () {
    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/octSlicesView.html',
      controller: 'OctSlicesViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, OctSlicesViewCtrl) {
        OctSlicesViewCtrl.init(element);
      }
    };
  }]);
