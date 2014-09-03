'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.directive:eyedraw
 * @description
 * # EventCtrl
 * EyeDraw directive
 */

angular.module('openeyesApp')
	.factory('EyeDraw', function($window){
		return $window.ED;
	})
	.constant('eyedrawOptions', {
		scale: 1,
		toggleScale: 0,
		idSuffix: '',
		isEditable: false,
		focus: false,
		graphicsPath: '/eyedraw/img/',
		offsetX: 0,
		offsetY: 0,
		toImage: false
	})
	.directive('eyedraw', function(EyeDraw, eyedrawOptions, $timeout) {

		var init = {
			// Initiate the eyedraw in view mode.
			view: function($scope) {
				var hasInit = false;
				// Only initiate the eyedraw once we have some data.
				$scope.$watch('data', function() {
					var hasData = ($scope.data && $scope.data.length);
					if (hasData && !hasInit) {
						hasInit = true;
						EyeDraw.init($scope.options);
					}
				});
			},
			// Initiate the eyedraw in edit mode.
			edit: function($scope) {
				// Only initiate the eyedraw once the $scope has been applied.
				$timeout(function() {
					EyeDraw.init($scope.options);
				});
			}
		};

		var id = 0;

		function setOptions($scope, attr) {
			id++;
			angular.extend($scope.options, eyedrawOptions, {
				isEditable: (attr.mode === 'edit'),
				canvasId: 'canvas-id-'+id,
				inputId: 'input-id-'+id,
				drawingName: 'drawing-name-'+id
			});
		}

		function link($scope, element, attr) {
			$scope.mode = attr.mode;
			$scope.getTitle = function(className) {
				return EyeDraw.titles[className];
			};
			setOptions($scope, attr)
			init[attr.mode]($scope);
		}

		return {
			scope: {
				data: '=ngModel',
				options: '=options'
			},
			replace: true,
			restrict: 'AE',
			templateUrl: 'views/directives/eyedraw.html',
			link: link
		};
	});
