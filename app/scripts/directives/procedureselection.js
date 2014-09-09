'use strict';

angular.module('openeyesApp')
	.controller('ProcedureSelectionCtrl', ['$scope', 'Procedure', 'Event', function($scope, Procedure, Event){

		var self = this;

		this.init = function(attr){

			// 	Push directive controller onto current stack of event components
			// Event.addToEventStack(this);
			this.eyeSide = attr.side;
			$scope.id = attr.id;
			$scope.placeholder = 'Choose a procedure...';

			//	Populate the procedures
			Procedure.getProcedures()
				.success(function(data) {
					$scope.options = data;
				})
				.error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});

			//	Listen for save event
			//	Broadcast by event page controller
			$scope.$on('event.save', this.broadcastModel);
		};

		this.broadcastModel = function(){
			Event.addToEventStack(self.getModel());
		};

		this.getModel = function(){
			return {
				name: 'procedures',
				subPath: this.eyeSide,
				model: $scope.model
			};
		};

	}])
	.directive('procedureSelection', [function () {

		return {
			restrict: 'AE', //E = element, A = attribute, C = class, M = comment
			scope: {},
			templateUrl: 'views/directives/procedureselection.html',
			controller: 'ProcedureSelectionCtrl',
			link: function ($scope, element, attr, ProcedureSelectionCtrl) {
				ProcedureSelectionCtrl.init(attr);
			}
		};
	}]);
