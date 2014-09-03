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

					$scope.eyedraws.left.value = data.leftEye;
					$scope.eyedraws.right.value = data.rightEye;
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
				{
					name: 'Laser Spot',
					className: 'LaserSpot'
				},
				{
					name: 'Focal laser',
					className: 'FocalLaser'
				},
				{
					name: 'Macular grid laser',
					className: 'MacularGrid'
				},
				{
					name: 'Label',
					className: 'Label'
				}
			],
			onReadyCommandArray: [
				['addDoodle', ['AntSeg']],
				['deselectDoodles', []]
			]
		};

		$scope.eyedraws = {
			right: {
				value: [],
				options: angular.extend({}, eyedrawOptions, {
					eye: 1
				})
			},
			left: {
				value: [],
				options: angular.extend({}, eyedrawOptions, {
					eye: 2
				})
			}
		};

		$scope.cancel = function() {
			$window.history.back();
		};
	})
	;
