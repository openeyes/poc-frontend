'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('EventCtrl', function ($scope, $window, $routeParams, Event) {

		$scope.event = null;
		$scope.mode = 'edit';

		function loadEvent(patientId, eventId){
			console.log('loading event', eventId);
			Event.getEvent(patientId, eventId)
				.success(function(data) {
					$scope.event = data;

					$scope.eyedraws.left.data = JSON.stringify(data.leftEye);
					$scope.eyedraws.right.data = JSON.stringify(data.rightEye);
	      })
	      .error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
		    });
		}

		if($routeParams.patientId && $routeParams.eventId){
			$scope.mode = 'view';
			loadEvent($routeParams.patientId, $routeParams.eventId);
		}

		var eyedrawOptions = {
			doodles: [
				'NuclearCataract',
				'CorticalCataract',
				'PostSubcapCataract',
				'PCIOL',
				'ACIOL',
				'Bleb',
				'PI',
				'Label'
			],
			onReadyCommandArray: [
				['addDoodle', ['AntSeg']],
				['deselectDoodles', []]
			]
		};

		$scope.eyedraws = {
			right: {
				data: '[]',
				options: angular.extend({}, eyedrawOptions, {
					eye: 1
				})
			},
			left: {
				data: '[]',
				options: angular.extend({}, eyedrawOptions, {
					eye: 2
				})
			}
		};

		$scope.procedures = {
			right: [],
			left: []
		};

		$scope.cancel = function() {
			$window.history.back();
		};

		$scope.save = function(){
			console.log('Saving event...');
			// "laser": {
		 //    "id": "",
		 //    "codeValue": "",
		 //    "label": "",
		 //    "systemId": ""
			//   },
			//   "site": {
			//     "id": "",
			//     "codeValue": "",
			//     "label": "",
			//     "systemId": ""
			//   }

			// Grab selected laser
			console.log($scope.selectedSite);
			console.log($scope.selectedLaser);
			console.log($scope.selectedOperator);

			// Grab eyedraw data
			// Need to update this data somehow from the plugin
			// 
			console.log($scope.eyedraws.right.data);
			console.log($scope.eyedraws.left.data);
		};

	});
