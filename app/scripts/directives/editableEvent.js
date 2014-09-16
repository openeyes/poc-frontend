'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:ConfigurableEventCtrl
 * @description
 * # ConfigurableEventCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('ConfigurableEventCtrl', ['$scope', '$compile', '$timeout', '$rootScope', '$routeParams', 'Event', function ($scope, $compile, $timeout, $rootScope, $routeParams, Event) {

		var self = this;
		//	Pretend to load in some workflow config here
		//	NEEDS TO BE REMOVED WHEN CONFIG WORKFLOW IS DECIDED ON
		var eventType = $routeParams.eventType;
		var layoutConfig = Event.getLayoutConfig(eventType);

		//	Map component names that would come from the layout config
		var componentMappings = Event.getComponentMappings('edit');

		this.init = function(element, attrs){

			$scope.form.submitted = false;
			$scope.validations = Event.getValidationRules();
			Event.setForm($scope.form);

			this.element = element;
			//	Could be use when requesting event spec from api
			//	Relistically though it would come from the routeParams when navigating to create each type of event / workflow
			this.eventType = attrs.eventType;
			this.buildLayout();
			//	Broadcast by event page controller
			$scope.$on('event.save', this.save);
		};

		this.buildLayout = function(){
			//	Loop over given layout components and add into container
			for(var i = 0;i < layoutConfig.length;i++){
				var template = componentMappings[layoutConfig[i]];
				var cTemplate = $compile(template)($scope);
				this.element.find('form:first').append(cTemplate);
			}
		};

		this.save = function(scope, params){
			$timeout(function() {

				$scope.form.submitted = true;

				if ($scope.form.$invalid) {
					return;
				}

				var postObject = self.buildPostObject();
				postObject.patientId = params.patientId;
				console.log(postObject);
				Event.create(postObject)
					.success(function(data) {
						console.log('success', data);
						Event.clearEventStack();
						$rootScope.$broadcast('event.save.complete', {});
		      })
		      .error(function(data, status, headers, config) {
						console.log(data, status, headers, config);
			    });

			});
		};

		this.buildPostObject = function(){
			var eventComponents = Event.getEventStack();
			var postObject = {};
			var i;

			for(i = 0;i < eventComponents.length;i++){
				var model = eventComponents[i];
				var subPath = '';
				var name = model.name;
				var modelData = model.model;

				if(!modelData){
					continue;
				}

				if(model.hasOwnProperty('subPath')){
					subPath	= model.subPath;
				}

				if(modelData instanceof Array){
					if(subPath){
						if(!postObject.hasOwnProperty(subPath)){ postObject[subPath] = {}; }
						postObject[subPath][name] = modelData;
					} else {
						postObject[name] = modelData;
					}
				} else {
					for(var key in modelData){
						if(modelData.hasOwnProperty(key)){
							if(subPath){
								if(!postObject.hasOwnProperty(subPath)){ postObject[subPath] = {}; }
								postObject[subPath][key] = modelData[key];
							} else {
								postObject[key] = modelData[key];
							}
						}
					}
				}
			}

			return postObject;
		};

	}])
	.directive('editableevent', function () {

		return {
			restrict: 'EA', //E = element, A = attribute, C = class, M = comment
			templateUrl: 'views/directives/editableEvent.html',
			controller: 'ConfigurableEventCtrl', //Embed a custom controller in the directive
			link: function ($scope, element, attrs, ConfigurableEventCtrl) {
				ConfigurableEventCtrl.init(element, attrs);
			}
		};
	});
