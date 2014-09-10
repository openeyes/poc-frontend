'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.directive:eyedraw

 * @description
 * This EyeDraw directive will handle the initiation of an eyedraw instance and
 * accepts the following attributes:
 *
 * data:    The data model used for storing eyedraw data
 * options: key:value options for the eyedraw lib
 * mode:    "edit" or "view"
 *
 * If the "mode" is set to "view" then data is required to initiate the eyedraw.
 *
 * @example
 * <div ng-init="data=[]">
 *   <eyedraw data="data" options='{"doodles": ["NuclearCataract"]}' mode="edit"></eyedraw>
 * </div>
 */

angular.module('openeyesApp')
	.factory('EyeDraw', ['$window', function($window){
		return $window.ED;
	}])
	.constant('eyedrawOptions', {
		'core': {
			scale: 1,
			focus: false,
			graphicsPath: '/eyedraw/img/',
			offsetX: 0,
			offsetY: 0,
			toImage: false
		},
		'anterior': {
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
		}
	})
	.constant('eyedrawOptionsAnterior', {
		
	})
	.controller('EyeDrawCtrl', ['$scope', '$timeout', 'EyeDraw', 'eyedrawOptions', function($scope, $timeout, EyeDraw, eyedrawOptions){

		var id = 0;

		this.init = function(attr){

			$scope.mode = attr.mode;
			$scope.options = this.getOptions(eyedrawOptions[attr.options]);

			console.log($scope.options);

			$scope.getTitle = function getTitle(className) {
				return EyeDraw.titles[className];
			};

			this[attr.mode]();
		};

		this.view = function(){
			var unbindWatcher = $scope.$watch('data', function(data) {
				if (data && data.length) {
					EyeDraw.init($scope.options);
					unbindWatcher();
				}
			});
		};

		this.edit = function(){
			// Only initiate the eyedraw once the $scope has been applied.
			// This is necessary as we're generating required scope vars in the same event loop.
			$timeout(function() {
				EyeDraw.init($scope.options);
			});
		};

		this.getOptions = function(options){
			++id;
			return angular.extend({
				isEditable: ($scope.mode === 'edit'),
				canvasId: 'canvas-id-'+id,
				inputId: 'input-id-'+id,
				drawingName: 'drawing-name-'+id
			}, eyedrawOptions.core, options);
		};

	}])
	.directive('eyedraw', [function() {

		function link($scope, element, attr, EyeDrawCtrl) {
			EyeDrawCtrl.init(attr);
		}

		return {
			scope: {},
			replace: true,
			restrict: 'AE',
			controller: 'EyeDrawCtrl',
			templateUrl: 'views/directives/eyedraw.html',
			link: link
		};
	}]);
