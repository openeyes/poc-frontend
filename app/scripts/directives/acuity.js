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

		this.init = function(attrs){
			//	Listen for save event
			//	Broadcast by event page controller
      this.eyeSide = attrs.side;
			$scope.model = {};
			$scope.model.acuityMeasurements = [];
			$scope.$on('event.save', this.broadcastModel);
			//	On creation populate dropdown

			Acuity.getAcuityFields()
				.then(function(data) {
					$scope.measurements = data.measurements;
          $scope.corrections = data.corrections;
				}, function(error) {
					console.log(error);
				});
		};

		this.broadcastModel = function(){
			Event.addToEventStack(self.getModel());
		};

		this.getModel = function(){
      console.log('get the model', $scope.model);
			return {
				name: 'acuity',
        subPath: this.eyeSide,
				model: $scope.model
			};
		};

    // $scope methods
    $scope.addRow = function(){
      $scope.model.acuityMeasurements.push({
        measurement: 0,
        correction: ''
      });
    };

    $scope.removeRow = function(index){
      $scope.model.acuityMeasurements.splice(index, 1);
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
