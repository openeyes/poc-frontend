'use strict';

angular.module('openeyesApp')
  .constant('workflowComponentMappings', {
    FormComponent: {
      LaserSite: '/views/components/edit/laserSite.html',
      Procedures: '/views/components/edit/procedures.html',
      eyedraw: '/views/components/edit/eyedraw.html',
      Treatment: '/views/components/edit/treatment.html',
      History: '/views/components/edit/history.html',
      Comorbidities: '/views/components/edit/comorbidities.html',
      VisualAcuity: '/views/components/edit/acuity.html',
      Allergies: '/views/components/edit/allergies.html',
      InjectionManagement: '/views/components/edit/injectionManagement.html',
      allergies: '/views/components/edit/allergies.html',
      PosteriorPole: '/views/components/edit/posteriorPole.html',
      Anaesthetic: '/views/components/edit/anaesthetic.html',
      ClinicOutcome: '/views/components/edit/clinicOutcome.html',
      ClinicalManagement: '/views/components/edit/clinicalManagement.html',
      InjectionSite: '/views/components/edit/injectionSite.html',
      Complications: '/views/components/edit/complications.html',
      Dilation: '/views/components/edit/dilation.html',
      TreatmentOrder: '/views/components/edit/treatmentOrder.html'
    },
    ViewComponent: {
      laserSite: '/views/components/view/laserSite.html',
      procedures: '/views/components/view/procedures.html',
      eyedraw: '/views/components/view/eyedraw.html',
      VisualAcuity: '/views/components/view/acuity.html',
      History: '/views/components/view/history.html',
      TreatmentOrder: '/views/components/view/treatmentOrder.html',
      InjectionSite: '/views/components/view/injectionSite.html',
      Anaesthetic: '/views/components/view/anaesthetic.html'
    }
  })
  .factory('Workflow', ['$http', 'workflowComponentMappings', 'ENV', function($http, workflowComponentMappings, ENV) {
    return {
      getConfig: function(id){
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
        return workflowComponentMappings;
      }
    };

  }]);
