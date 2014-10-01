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

    var STEP_INITIAL_SPEED = 225;
    var STEP_VELOCITY = 75;
    var STEP_MAX_SPEED = 25;
    var COLS = 20; // sprite montage columns

    this.init = function(element){

      this.image = element.find('.img');
      this.tooltip = element.find('.position-tooltip');
      this.range = element.find('.range');

      this.stepSpeed = STEP_INITIAL_SPEED;
      this.containerWidth = element.width();
      this.tooltipWidth = this.tooltip.width();
      this.rangeWidth = this.range.width();
      this.handleWidth = 50;
      this.sliceWidth = this.image.width();
      this.sliceHeight = this.image.height();

      $scope.showTooltip = false;
      $scope.loading = true;
      $scope.selectedRange = 1;
      $scope.error = false;
      $scope.step = 1;
      $scope.min = 1;
      $scope.max = 200;
      $scope.model = {};

      this.getImageData()
      .then(this.loadImage.bind(this));
    };

    $scope.change = function() {
      self.positionImage();
      self.positionTooltip();
    };

    $scope.stepDown = function() {
      if ($scope.error) {
        return;
      }
      $scope.selectedRange = Math.max(Number($scope.selectedRange) - $scope.step, $scope.min);
      $scope.change();
      self.stepSpeed -= STEP_VELOCITY;
      self.stepTimer = $timeout($scope.stepDown, Math.max(self.stepSpeed, STEP_MAX_SPEED));
    };

    $scope.stepUp = function() {
      if ($scope.error) {
        return;
      }
      $scope.selectedRange = Math.min(Number($scope.selectedRange) + $scope.step, $scope.max);
      $scope.change();
      self.stepSpeed -= STEP_VELOCITY;
      self.stepTimer = $timeout($scope.stepUp, Math.max(self.stepSpeed, STEP_MAX_SPEED));
    };

    $scope.stopStepping = function() {
      self.stepSpeed = STEP_INITIAL_SPEED;
      $timeout.cancel(self.stepTimer);
      self.range.focus();
    };

    this.positionTooltip = function() {

      var perc = $scope.selectedRange / $scope.max;
      var px = 0;

      // Initial amount of pixels
      px += (perc * self.rangeWidth);

      // Remove the relative width of the slider handle. Tooltip position is now flush with the handle left position across the range
      px -= (perc * self.handleWidth);

      // Add half of handle width. Tooltip left position is now flush with centre of handle across the range
      px += (self.handleWidth / 2);

      // Position tooltip in center of handle
      px -= (self.tooltipWidth / 2);

      // Add extra pixels to account for the step down anchor
      px += (self.containerWidth - self.rangeWidth) / 2;

      self.tooltip.css('left', Math.floor(px) + 'px');
    }

    this.getImageData = function() {
      return Element.getOCTImages()
        .then(function(response) {
          self.imageUrl = response.data[0];
        }, function() {
          console.log('Error getting oct images')
        });
    };

    this.positionImage = function() {

      var index = Number($scope.selectedRange) - 1;
      var row = Math.floor(index / COLS);
      var col = (index % COLS);
      var top = row * self.sliceHeight * -1;
      var left = col * self.sliceWidth * -1;

      self.image.css('background-position', left + 'px ' + top + 'px');
    };

    this.loadImage = function(){
      var image = new Image();
      image.src = this.imageUrl;
      image.onload = this.imageLoaded.bind(this);
      image.onerror = this.imageError.bind(this);
    };

    this.imageError = function() {
      $scope.loading = false;
      $scope.error = true;
      $scope.$digest();
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
      scope: {
        data: '='
      },
      replace: true,
      templateUrl: 'views/directives/octSlicesView.html',
      controller: 'OctSlicesViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, OctSlicesViewCtrl) {
        OctSlicesViewCtrl.init(element);
      }
    };
  }]);
