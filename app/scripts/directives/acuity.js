'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:AcuityCtrl
 * @description
 * # HistoryCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('AcuityCtrl', ['$scope', 'Acuity', 'Event', function($scope, Acuity, Event){

		var self = this;

		this.init = function(){
			//	Listen for save event
			//	Broadcast by event page controller
			$scope.model = {};
			$scope.model.history = '';
			$scope.$on('event.save', this.broadcastModel);
			//	On creation populate dropdown 
			
			Acuity.getAcuityFields()
				.then(function(data) {
					$scope.slugs = data;
				}, function(error) {
					console.log(error);
				});
				

		};

		this.broadcastModel = function(){
			Event.addToEventStack(self.getModel());
		};

		this.getModel = function(){
			return {
				name: 'acuity',
				model: $scope.model
			};
		};

	}])
	/**
	 * @ngdoc function
	 * @name openeyesApp.directive:history
	 * @description
	 * # history
	 * Directive of the openeyesApp
	 */
	.directive('acuity', [function () {
		return {
			restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
			scope: {},
			templateUrl: 'views/directives/acuity.html',
			controller: 'AcuityCtrl', //Embed a custom controller in the directive
			link: function (scope, element, attrs, AcuityCtrl) {
				AcuityCtrl.init(attrs);
			}
		};
	}]);