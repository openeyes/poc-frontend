'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:ConfigurableEventCtrl
 * @description
 * # ConfigurableEventCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('ConfigurableEventCtrl', ['$scope', '$window', '$routeParams', '$location', '$compile', 'Event', function ($scope, $window, $routeParams, $location, $compile, Event) {

		var self = this;
		//	Pretend to load in some workflow config here
		//	In practice this would come from a service defined at the api side per workflow side.
		var layoutConfig = [
			'procedures',
			'laserSite',
			'eyedraw'
		];

		//	Map component names that would come from the layout config
		//	This would ideally come from a constant variable
		//	Also with the template strings potentially in another config value
		var componentMappings = {
			'laserSite': '<section class="element panel panel-default"><div class="panel-heading"><h3 class="panel-title">Site</h3></div><div class="panel-body"><lasersite ng-model="laserDetails"></lasersite></div></section>',
			'procedures': '<section class="element panel panel-default"><div class="panel-heading"><h3 class="panel-title">Treatment</h3></div><div class="panel-body"><div class="row"><div class="col-xs-6"><div class="form-group"><label for="procedure-right" class="col-xs-4 control-label">Procedures:</label><div class="col-xs-8"><procedure-selection data-id="procedure-right" ng-model="procedures.right"></procedure-selection></div></div></div><div class="col-xs-6"><div class="form-group"><label for="procedure-left" class="col-xs-4 control-label">Procedures:</label><div class="col-xs-8"><procedure-selection data-id="procedure-left" ng-model="procedures.left"></procedure-selection></div></div></div></div></div></section>',
			'eyedraw': '<section class="element panel panel-default"><div class="panel-heading"><h3 class="panel-title">Anterior Segment</h3></div><div class="panel-body"><div class="row"><div class="col-xs-6"><eyedraw data="eyedraws.right.data" options="{{eyedraws.right.options}}" mode="{{mode}}"></eyedraw></div><div class="col-xs-6"><eyedraw data="eyedraws.left.data" options="{{eyedraws.left.options}}" mode="{{mode}}"></eyedraw></div></div></div></section>',
		};

		this.init = function(element, attrs){
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

		this.save = function(){};

	}]);
