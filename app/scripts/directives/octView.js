'use strict';

angular.module('openeyesApp')
  .controller('OctView', ['$scope', '$routeParams', '$timeout', 'Element', 'MODEL_DOMAIN', function($scope, $routeParams, $timeout, Element, MODEL_DOMAIN){

    var self = this;

    this.init = function() {

      var tabAnchors = angular.element('.oct-nav-tabs a');

      tabAnchors.on('click', function (e) {
        e.preventDefault()
        angular.element(this).tab('show');
        $scope.selectedTab = tabAnchors.index(this);
        $scope.$digest();
      });

      // We can't immediately trigger this event as it the handler will be
      // called synchronously and we'll get $digest errors, so we wait until
      // the current $digest is complete.
      $timeout(function() {
        tabAnchors.eq(0).trigger('click');
      });
    };
  }])
  .directive('oeOctView', [function () {
    return {
      restrict: 'E', //E = element, A = attribute, C = class, M = comment
      scope: {},
      templateUrl: 'views/directives/octView.html',
      controller: 'OctView', //Embed a custom controller in the directive
      link: function (scope, element, attrs, OctView) {
        OctView.init(element);
      }
    };
  }]);
