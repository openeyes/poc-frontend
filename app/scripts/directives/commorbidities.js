'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:CommorbiditiesCtrl
 * @description
 * # CommorbiditiesCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('CommorbiditiesCtrl', ['$scope', 'Conditions', 'Event', function($scope, Conditions, Event){

		var self = this;

		this.init = function(){
			//	Listen for save event
			//	Broadcast by event page controller
			$scope.$on('event.save', this.broadcastModel);
			//	On creation populate dropdown

			Conditions.getCommorbidities()
				.then(function(data) {
					$scope.commorbidities = data;
	      }, function(error) {
					console.log(error);
	      });
	      

		};

		this.broadcastModel = function(){
			Event.addToEventStack(self.getModel());
		};

		this.getModel = function(){
			return {
				name: 'commorbidities',
				model: $scope.model
			};
		};


	}])
	/**
	 * @ngdoc function
	 * @name openeyesApp.directive:commorbidities
	 * @description
	 * # commorbidities
	 * Directive of the openeyesApp
	 */
	.directive('commorbidities', [function () {
		return {
			restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
			scope: {},
			templateUrl: 'views/directives/commorbidities.html',
			controller: 'CommorbiditiesCtrl', //Embed a custom controller in the directive
			link: function (scope, element, attrs, CommorbiditiesCtrl) {
				CommorbiditiesCtrl.init(attrs);
			}
		};
	}]);