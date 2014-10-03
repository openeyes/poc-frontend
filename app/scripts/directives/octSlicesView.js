'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:OctSlicesViewCtrl
 * @description
 * # OctSlicesViewCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('OctSlicesViewCtrl', ['$scope', '$timeout', '$element', '$attrs', '$routeParams', 'Element', 'Ticket', 'MODEL_DOMAIN', function($scope, $timeout, $element, $attrs, $routeParams, Element, Ticket, MODEL_DOMAIN){

    var self = this;

    var STEP_INITIAL_SPEED = 225;
    var STEP_VELOCITY = 75;
    var STEP_MAX_SPEED = 25;
    var COLS = 20; // sprite montage columns

    this.init = function(element){

      this.image = $element.find('.img');
      this.tooltip = $element.find('.position-tooltip');
      this.range = $element.find('.range');

      this.stepSpeed = STEP_INITIAL_SPEED;
      this.containerWidth = $element.find('.oct-slides').width();
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
      $scope.loaded = false;
      $scope.hasData = false;
      $scope.model = {};
      $scope.side = $attrs.side;

      this.getPatient()
      .then(this.getImageData)
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

    this.getPatient = function() {
      return Ticket.getTicket($routeParams.ticketId)
        .then(function(data) {
          $scope.patient = data.data.patient;
        }, function(data, status, headers, config) {
          console.log('Error getting patient data', data, status, headers, config);
        });
    };

    this.getImageData = function() {

      var today = Date.now();
      var eType = MODEL_DOMAIN + 'OCTScan';

      return Element.getElements($scope.patient._id.$oid, eType, today)
        .then(function(response) {
          var data = response.data.filter(function(data) {
            return data.eye + 'Eye' === $attrs.side
          })[0];
          if (data) {
            self.imageUrl = '/images/oct-slices/54229a9f6c5873493a28b3b8.jpg';
            $scope.hasData = true;
          }
          $scope.loaded = true;
        }, function(error) {
          console.log(error);
        });
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

    this.positionImage = function() {

      var index = Number($scope.selectedRange) - 1;
      var row = Math.floor(index / COLS);
      var col = (index % COLS);
      var top = row * self.sliceHeight * -1;
      var left = col * self.sliceWidth * -1;

      self.image.css('background-position', left + 'px ' + top + 'px');
    };

    this.loadImage = function(){
      if (this.imageUrl) {
        // alert(this.imageUrl);
        var image = new Image();
        image.src = this.imageUrl;
        image.onload = function() {
          $scope.$apply(this.imageLoaded());
        }.bind(this);
        image.onerror = function() {
          $scope.$apply(this.imageError());
        }.bind(this);
      } else {
        this.imageError();
      }
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
      restrict: 'E', //E = element, A = attribute, C = class, M = comment
      scope: {},
      replace: true,
      templateUrl: 'views/directives/octSlicesView.html',
      controller: 'OctSlicesViewCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, OctSlicesViewCtrl) {
        OctSlicesViewCtrl.init();
      }
    };
  }]);
