'use strict';

angular.module('openeyesApp')
	.directive('event', function () {

		return {
			restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
			// scope: {},
			templateUrl: 'views/directives/event.html',
			controller: 'ConfigurableEventCtrl', //Embed a custom controller in the directive
			link: function ($scope, element, attrs, ConfigurableEventCtrl) {
				ConfigurableEventCtrl.init(element, attrs);
			}
		};
	});