'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Event
 * @description
 * # Event
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Event', ['$http', 'ENV', function($http, ENV) {

    return {
      eventStack: [],
      getEventsForPatient: function(patientId){
        var apiCall = ENV.host + ENV.apiEndpoints.patientEvents.replace(':id', patientId);
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      getEvent: function(eventId){
        var apiCall = ENV.host + ENV.apiEndpoints.laserEvent.replace(':id', eventId);
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      create: function(body){
        var apiCall = ENV.host + ENV.apiEndpoints.createLaserEvent;
        return $http({
          method: 'POST',
          url: apiCall,
          data: body
        });
      },
      addToEventStack: function(data){
        this.eventStack.push(data);
      },
      getEventStack: function(){
        return this.eventStack;
      },
      clearEventStack: function(){
        this.eventStack = [];
      },
      getLayoutConfig: function(eventType){
        var layoutConfig = {
          eventType1: [
            // 'laserSite',
            // 'procedures',
            // 'eyedraw',
            // 'treatment',
            'history',
            'commorbidities'
          ],
          eventType2: [
            'procedures',
            'eyedraw',
            'laserSite',
          ]
        };

        return layoutConfig[eventType];
      },
      getComponentMappings: function(mode){
        var componentMappings = {
          edit: {
            laserSite: '<ng-include src="\'/views/components/edit/laserSite.html\'"></ng-include>',
            procedures: '<ng-include src="\'/views/components/edit/procedures.html\'"></ng-include>',
            eyedraw: '<ng-include src="\'/views/components/edit/eyedraw.html\'"></ng-include>',
            treatment: '<ng-include src="\'/views/components/edit/treatment.html\'"></ng-include>',
            history: '<ng-include src="\'/views/components/edit/history.html\'"></ng-include>',
            commorbidities: '<ng-include src="\'/views/components/edit/commorbidities.html\'"></ng-include>'
          },
          view: {
            laserSite: '<ng-include src="\'/views/components/view/laserSite.html\'"></ng-include>',
            procedures: '<ng-include src="\'/views/components/view/procedures.html\'"></ng-include>',
            eyedraw: '<ng-include src="\'/views/components/view/eyedraw.html\'"></ng-include>'
          }
          
        };

        return componentMappings[mode];
      }
    };

  }]);