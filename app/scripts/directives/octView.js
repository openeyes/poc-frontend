'use strict';

angular.module('openeyesApp')
  .controller('OctView', ['$scope', '$routeParams', '$timeout', 'Element', 'MODEL_DOMAIN', function($scope, $routeParams, $timeout, Element, MODEL_DOMAIN){

    var self = this;
    var tabs;
    var selected = [];

    this.init = function() {

      tabs = angular.element('.oct-nav-tabs a')
        .on('click', this.selectTab.bind(this));

      $timeout(function() {
        tabs.eq(0).trigger('click');
      });
    };

    this.selectTab = function (e) {
      e.preventDefault()
      var tab = e.currentTarget;
      angular.element(tab).tab('show');
      $scope.selectedTab = tabs.index(tab);
      if (!$scope.hasSelected($scope.selectedTab)) {
        selected.push($scope.selectedTab);
      }
      $scope.$digest();
    };

    $scope.hasSelected = function(index) {
      return selected.indexOf(index) !== -1;
    }
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
