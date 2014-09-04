'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('EventCtrl', function ($scope, $window, $routeParams, $location, Event) {

		$scope.event = null;
		$scope.mode = 'edit';

		function loadEvent(eventId){
			console.log('loading event', eventId);
			Event.getEvent(eventId)
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
			loadEvent($routeParams.eventId);
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

		$scope.navToPatient = function(){
			$location.path('/patient/' + $routeParams.patientId);
		};

		$scope.save = function(){

			var laserEvent = {};

			laserEvent.patientId = $routeParams.patientId;

			laserEvent.leftEye = {};
			laserEvent.leftEye.procedures = $scope.procedures.left;
			laserEvent.leftEye.anteriorSegment = { data: $scope.eyedraws.left.data };

			laserEvent.rightEye = {};
			laserEvent.rightEye.procedures = $scope.procedures.right;
			laserEvent.rightEye.anteriorSegment = { data: $scope.eyedraws.right.data };

			laserEvent.laser = $scope.laserDetails.laser;
			laserEvent.site = $scope.laserDetails.site;
			laserEvent.laserOperator = $scope.laserDetails.operator;

			// console.log(laserEvent);

			Event.create(laserEvent)
				.success(function(data) {
					console.log('success', data);
					$scope.navToPatient();
	      })
	      .error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
		    });
		};

	});
