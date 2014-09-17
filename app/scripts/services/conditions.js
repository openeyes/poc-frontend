'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Conditions
 * @description
 * # Conditions
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Conditions', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    console.log(ENV);

    return {
      getComorbidities: function(){
        var data = [
          {
            id: 1,
            label: 'Angina'
          },
          {
            id: 1,
            label: 'Asthma'
          },
          {
            id: 1,
            label: 'Blood Loss'
          },
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getDisorders: function(secondaryToId){

        var data = [
          {
            label: 'Central serous chorioretinopathy',
            id: 1,
            order: 1,
            hasSecondary: true
          },
          {
            label: 'Idiopathic polypoidal choroidal vasculopathy',
            id: 2,
            order: 2,
            hasSecondary: true
          },
          {
            label: 'Coats\' disease',
            id: 3,
            order: 3,
            hasSecondary: false
          },
          {
            label: 'Scleritis',
            id: 4,
            order: 4,
            hasSecondary: false
          },
          {
            label: 'Capillary haemangioma of retina',
            id: 5,
            order: 5,
            hasSecondary: false
          },
          {
            label: 'Uveitis',
            id: 6,
            order: 6,
            hasSecondary: false
          },
          {
            label: 'Vomiting',
            id: 7,
            order: 7,
            hasSecondary: false
          },
          {
            label: 'Typhlitis',
            id: 8,
            order: 8,
            hasSecondary: false
          },
          {
            label: 'Triangular alopecia',
            id: 9,
            order: 9,
            hasSecondary: false
          },
          {
            label: 'Tonsil carcinoma',
            id: 10,
            order: 10,
            hasSecondary: false
          }
        ];

        var secondaryData = [
          {
            id: 1,
            label: 'Venous retinal branch occlusion',
            order: 1
          },
          {
            id: 2,
            label: 'Central retinal vein occlusion',
            order: 2
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(secondaryToId ? secondaryData : data);

        return deferred.promise;
      },
      getInjectionQuestions: function(disorderId, secondaryToDisorderId) {

        console.info('Getting injection questions. DisorderID:', disorderId, 'SecondaryToDisorderId', secondaryToDisorderId);

        var data = disorderId === 1 ? [
          {
            label: 'CRT Increase <100',
            id: 1,
            order: 1
          },
          {
            label: 'CRT >= 100',
            id: 2,
            order: 2
          },
          {
            label: 'Loss of 5 letters',
            id: 3,
            order: 3
          },
          {
            label: 'Loss of letter >5',
            id: 4,
            order: 4
          }
        ] : [];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getRisks: function() {
        var data = [
          {
            id: 1,
            label: 'Pre-existing glaucoma',
            order: 1
          },
          {
            id: 2,
            label: 'CVARemove',
            order: 2
          },
          {
            id: 3,
            label: 'Previous glaucoma surgery (trabeculectomy bleb, glaucoma draining device)',
            order: 3
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
