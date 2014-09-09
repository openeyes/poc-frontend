'use strict';

angular.module('openeyesApp')
	.controller('LaserSiteCtrl', ['$scope', 'Site', 'Event', function($scope, Site, Event){

		var self = this;

		this.init = function(){

			//	Listen for save event
			//	Broadcast by event page controller
			$scope.$on('event.save', this.broadcastModel);

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
		};

		this.broadcastModel = function(){
			Event.addToEventStack(self.getModel());
		};

		this.getModel = function(){
			return {
				name: 'lasersite',
				model: $scope.model
			};
		};

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

	}])
	.directive('lasersite', [function () {
		return {
			restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
			scope: {},
			templateUrl: 'views/directives/lasersite.html',
			controller: 'LaserSiteCtrl', //Embed a custom controller in the directive
			link: function (scope, element, attrs, LaserSiteCtrl) {
				LaserSiteCtrl.init(scope);
			}
		};
	}]);