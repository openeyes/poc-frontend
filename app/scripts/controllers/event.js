'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('EventCtrl', function ($scope, $window) {

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
				value: '',
				options: angular.extend({}, eyedrawOptions, {
					eye: 1
				})
			},
			left: {
				value: '',
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
