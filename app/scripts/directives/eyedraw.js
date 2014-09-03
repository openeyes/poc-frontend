'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.directive:eyedraw
 * @description
 * # EventCtrl
 * EyeDraw directive
 */

angular.module('openeyesApp')
	.directive('eyedraw', function() {

		var c = 0;

		var defaultOptions = {
			scale: 1,
			toggleScale: 0,
			idSuffix: '',
			isEditable: true,
			focus: false,
			graphicsPath: '/eyedraw/img/',
			offsetX: 0,
			offsetY: 0,
			toImage: false
		};

		function link(scope) {

			var id = ++c;

			scope.canvasId = 'canvas-id-'+id;
			scope.inputId = 'input-id-'+id;
			scope.drawingName = 'drawing-name-'+id;

			var options = angular.extend({}, defaultOptions, scope.options, {
				canvasId: scope.canvasId,
				inputId: scope.inputId,
				drawingName: scope.drawingName,
			});

			// Only initiate the eyedraw once the scope has been applied.
			// We could alternatively use scope.$apply() to immediately compile the template.
			scope.$watch('canvasId', function() {
				window.ED.init(options);
			}, true);
		}

		return {
			scope: {
				model: '=ngModel',
				options: '=options'
			},
			restrict: 'AE',
			templateUrl: 'views/directives/eyedraw.html',
			link: link
		};
	});
