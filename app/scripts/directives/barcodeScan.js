'use strict';

angular.module('openeyesApp')
  .controller('BarcodeScanCtrl', ['$scope', '$element', function($scope, $element){

    var self = this;

    function debounce(fn, amount) {
      var timer = 0;
      return function() {
        clearTimeout(timer);
        timer = setTimeout(fn, amount);
      };
    }

    this.init = function() {
      $scope.scan = this.scan.bind(this);
      this.scanInput = $element.find('.scan-input');
      this.modal = $element.find('.modal');
      this.bindEvents();
    };

    this.bindEvents = function() {
      this.scanInput
      .on('focus', function() {
        self.scanInput.val('');
      })
      .on('blur', function() {
        self.scanInput.val('');
        self.scanInput.attr('disabled', 'disabled');
        self.modal.modal('hide');
        $scope.$apply();
      })
      .on('keypress', debounce(this.updateVal, 100))
    };

    this.scan = function() {
      this.modal.modal('show')
      .on('shown.bs.modal', function() {
        self.scanInput.removeAttr('disabled');
        self.scanInput.focus();
      });
    };

    this.updateVal = function(){
      $scope.model = self.scanInput.val();
      $scope.$apply();
      self.scanInput.blur();
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
