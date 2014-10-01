'use strict';

angular.module('openeyesApp')
  .controller('OctView', ['$scope', '$routeParams', '$timeout', 'Element', 'MODEL_DOMAIN', function($scope, $routeParams, $timeout, Element, MODEL_DOMAIN){

    var self = this;

    this.init = function() {
      $('.oct-nav-tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
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
