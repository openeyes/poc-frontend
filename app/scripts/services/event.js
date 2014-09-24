'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Event
 * @description
 * # Event
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Event', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    var form;

    return {
      eventStack: [],
      setForm: function(f) {
        form = f;
      },
      getForm: function() {
        return form;
      },
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
        var apiCall = ENV.host + ENV.apiEndpoints.createEncounter;
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
      getWorkflowConfig: function(id){
        var apiCall = ENV.host + ENV.apiEndpoints.workflow;
        if (id) {
          apiCall += '/' + id;
        }
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      getValidationRules: function(name) {

        var rules = {
          laserSite: {
            laser: {
              required: {
                value: true,
                msg: 'Laser is required.'
              }
            },
            site: {
              required: {
                value: true,
                msg: 'Site is required.'
              }
            },
            operator: {
              required: {
                value: true,
                msg: 'Operator is required.'
              }
            },
          },
          procedures: {
            procedureLeft: {
              required: {
                value: true,
                msg: 'At least one procedure is required.'
              }
            },
            procedureRight: {
              required: {
                value: true,
                msg: 'At least one procedure is required.'
              }
            }
          },
          treatment: {
            'pre-injection-antiseptic-leftEye': {
              required: true
            },
            'pre-injection-antiseptic-rightEye': {
              required: true
            },
            'pre-injection-skin-cleanser-leftEye': {
              required: true
            },
            'pre-injection-skin-cleanser-rightEye': {
              required: true
            },
            'drug-leftEye': {
              required: true
            },
            'drug-rightEye': {
              required: true
            },
            'injection-time-leftEye': {
              required: true
            },
            'injection-time-rightEye': {
              required: true
            },
            'injection-person-leftEye': {
              required: true
            },
            'injection-person-rightEye': {
              required: true
            },
            'batch-expiry-date-leftEye': {
              required: true
            },
            'batch-expiry-date-rightEye': {
              required: true
            },
            'batch-number-rightEye': {
              required: true,
              pattern: '/^[0-9]+$/'
            },
            'batch-number-leftEye': {
              required: true,
              pattern: '/^[0-9]+$/'
            },
            'number-injections-leftEye': {
              required: true,
              pattern: '/^[0-9]+$/'
            },
            'number-injections-rightEye': {
              required: true,
              pattern: '/^[0-9]+$/'
            }
          }
        };

        return name ? rules[name] : rules;
      },
      getComponentMappings: function(){
        var componentMappings = {
          FormComponent: {
            LaserSite: '<ng-include src="\'/views/components/edit/laserSite.html\'"></ng-include>',
            Procedures: '<ng-include src="\'/views/components/edit/procedures.html\'"></ng-include>',
            eyedraw: '<ng-include src="\'/views/components/edit/eyedraw.html\'"></ng-include>',
            Treatment: '<ng-include src="\'/views/components/edit/treatment.html\'"></ng-include>',
            History: '<ng-include src="\'/views/components/edit/history.html\'"></ng-include>',
            Comorbidities: '<ng-include src="\'/views/components/edit/comorbidities.html\'"></ng-include>',
            VisualAcuity: '<ng-include src="\'/views/components/edit/acuity.html\'"></ng-include>',
            Allergies: '<ng-include src="\'/views/components/edit/allergies.html\'"></ng-include>',
            InjectionManagement: '<ng-include src="\'/views/components/edit/injectionManagement.html\'"></ng-include>',
            allergies: '<ng-include src="\'/views/components/edit/allergies.html\'"></ng-include>',
            PosteriorPole: '<ng-include src="\'/views/components/edit/posteriorPole.html\'"></ng-include>',
            Anaesthetic: '<ng-include src="\'/views/components/edit/anaesthetic.html\'"></ng-include>',
            ClinicOutcome: '<ng-include src="\'/views/components/edit/clinicOutcome.html\'"></ng-include>',
            ClinicalManagement: '<ng-include src="\'/views/components/edit/clinicalManagement.html\'"></ng-include>',
            InjectionSite: '<ng-include src="\'/views/components/edit/injectionSite.html\'"></ng-include>',
            Complications: '<ng-include src="\'/views/components/edit/complications.html\'"></ng-include>',
            Dilation: '<ng-include src="\'/views/components/edit/dilation.html\'"></ng-include>',
            TreatmentOrder: '<ng-include src="\'/views/components/edit/treatmentOrder.html\'"></ng-include>'
          },
          ViewComponent: {
            laserSite: '<ng-include src="\'/views/components/view/laserSite.html\'"></ng-include>',
            procedures: '<ng-include src="\'/views/components/view/procedures.html\'"></ng-include>',
            eyedraw: '<ng-include src="\'/views/components/view/eyedraw.html\'"></ng-include>',
            VisualAcuity: '<ng-include src="\'/views/components/view/acuity.html\'"></ng-include>',
            History: '<ng-include src="\'/views/components/view/history.html\'"></ng-include>',
            InjectionSite: '<ng-include src="\'/views/components/view/injectionSite.html\'"></ng-include>',
          }

        };

        return componentMappings;
      }
    };

  }]);
