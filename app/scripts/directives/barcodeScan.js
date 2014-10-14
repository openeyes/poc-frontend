'use strict';

angular.module('openeyesApp')
  .controller('BarcodeScanCtrl', ['$scope', '$element', '$timeout', function($scope, $element, $timeout){

    var self = this;

    function debounce(fn, amount) {
      var timer = 0;
      return function() {
        $timeout.cancel(timer);
        timer = $timeout(fn, amount);
      };
    }

    this.init = function() {
      this.scanInput = $element.find('.scan-input');
      this.modal = $element.find('.modal');
      this.bindEvents();
    };

    this.bindEvents = function() {
      this.scanInput
      .on('focus', this.startScan.bind(this))
      .on('blur', this.stopScan.bind(this))
      .on('keypress', debounce(this.updateVal, 200));
    };

    $scope.scan = function() {
      self.modal.modal('show')
      .on('shown.bs.modal', function() {
        self.scanInput.removeAttr('disabled');
        self.scanInput.focus();
      });
    };

    this.startScan = function() {
      this.scanInput.val('');
    };

    this.stopScan = function() {
      this.scanInput.val('').attr('disabled', 'disabled');
      this.modal.modal('hide');
    };

    this.updateVal = function(){
      $scope.model = self.scanInput.val();
      $scope.$apply();
      self.scanInput.blur();

      //TODO: refactor out jquery selector for linked elem
      $('.report-data-flash').addClass('fadeout');
    };
  }])
  .directive('oeBarcodeScan', [function () {
    return {
      restrict: 'E',
      scope: {
        model: '='
      },
      templateUrl: 'views/directives/barcodeScan.html',
      controller: 'BarcodeScanCtrl', //Embed a custom controller in the directive
      link: function (scope, element, attrs, BarcodeScanCtrl) {
        BarcodeScanCtrl.init();
      }
    };
  }]);
