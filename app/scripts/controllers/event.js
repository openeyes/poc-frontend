'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('EventCtrl', ['$scope', '$window', '$routeParams', '$location', '$rootScope', 'Event', function ($scope, $window, $routeParams, $location, $rootScope, Event) {

		$scope.event = null;
		$scope.mode = 'edit';

		function loadEvent(eventId){
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

		$scope.cancel = function() {
			$window.history.back();
		};

		$scope.navToPatient = function(){
			$location.path('/patient/' + $routeParams.patientId);
		};

		$scope.save = function(){
			$rootScope.$broadcast('event.save', {patientId: $routeParams.patientId});
			// laserEvent.rightEye.anteriorSegment = { data: $scope.eyedraws.right.data };
		};

	}]);
