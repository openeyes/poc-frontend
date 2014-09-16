'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:EventViewCrl
 * @description
 * # EventViewCrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('EventViewCrl', ['$scope', '$compile', '$timeout', '$rootScope', 'Event', function ($scope, $compile, $timeout, $rootScope, Event) {

		// var self = this;
		//	Pretend to load in some workflow config here
		var layoutConfig = Event.getLayoutConfig('eventType1');
		//	Map component names that would come from the layout config
		var componentMappings = Event.getComponentMappings('view');

		this.init = function(element, attrs){
			console.log('eventView init');
			this.element = element;
			//	Could be use when requesting event spec from api
			//	Relistically though it would come from the routeParams when navigating to create each type of event / workflow
			this.eventType = attrs.eventType;
			this.buildLayout();
		};

		this.buildLayout = function(){
			//	Loop over given layout components and add into container
			for(var i = 0;i < layoutConfig.length;i++){
				var template = componentMappings[layoutConfig[i]];
				var cTemplate = $compile(template)($scope);
				this.element.append(cTemplate);
			}
		};

	}])
	.directive('eventview', function () {

		return {
			restrict: 'EA', //E = element, A = attribute, C = class, M = comment
			templateUrl: 'views/directives/eventView.html',
			controller: 'EventViewCrl', //Embed a custom controller in the directive
			link: function ($scope, element, attrs, EventViewCrl) {
				EventViewCrl.init(element, attrs);
			}
		};
	});
