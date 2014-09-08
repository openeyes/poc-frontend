'use strict';

angular.module('openeyesApp')
	.directive('lasersite', ['Site', function (Site) {

		var ctrl = function($scope){
			$scope.siteSelected = function(){
				// Populate laser dropdown for this site
				Site.getLasersForSite($scope.model.site.id)
	      .success(function(data) {
					$scope.lasers = data;
	      })
	      .error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
		    });
			};

			$scope.laserSelected = function(){};
		};

		return {
			restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
			scope: {
				model: '=ngModel',
			},
			templateUrl: 'views/directives/lasersite.html',
			controller: ctrl, //Embed a custom controller in the directive
			link: function ($scope) {
				//	On creation populate sites dropdown
				Site.getSites()
		      .success(function(data) {
						$scope.sites = data;
		      })
		      .error(function(data, status, headers, config) {
						console.log(data, status, headers, config);
			    });

			  Site.getLaserOperators()
					.success(function(data) {
						$scope.operators = data;
		      })
		      .error(function(data, status, headers, config) {
						console.log(data, status, headers, config);
			    });
			}
		};
	}]);