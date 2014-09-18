'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Treatment
 * @description
 * # Treatment
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Treatment', ['$http', '$q', 'ENV', function($http, $q, ENV) {

    console.log(ENV);

    return {
      getNoTreatmentReasons: function() {
        var data = [
          {
            label: 'DNA',
            other: false,
            id: 1,
            order: 1
          },
          {
            label: 'Infection',
            other: false,
            id: 2,
            order: 2
          },
          {
            label: 'CVA',
            other: false,
            id: 3,
            order: 4
          },
          {
            label: 'MI',
            other: false,
            id: 4,
            order: 5
          },
          {
            label: 'Spontaneous improvement',
            other: false,
            id: 5,
            order: 6
          },
          {
            label: 'Other',
            other: true,
            id: 6,
            order: 7
          }
        ];
        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getTreatments: function() {
        var data = [
          {
            label: 'Avastin',
            id: 1,
            order: 1
          },
          {
            label: 'Eylea',
            id: 2,
            order: 2
          },
          {
            label: 'Triamcinolone',
            id: 3,
            order: 3
          },
          {
            label: 'Illuvien',
            id: 4,
            order: 4
          },
          {
            label: 'Lucentis',
            id: 5,
            order: 5
          },
          {
            label: 'Macugen',
            id: 6,
            order: 6
          },
          {
            label: 'Ozurdex',
            id: 7,
            order: 7
          },
          {
            label: 'PDT',
            id: 8,
            order: 8
          }
        ];

        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getPreInjectionAntiseptics: function() {
        var data = [
          {
            label: 'Iodine 5%',
            id: 1
          },
          {
            label: 'Chlorhexidine',
            id: 1
          },
        ];
        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getPreInjectionSkinCleansers: function() {
        var data = [
          {
            label: 'Iodine 10%',
            id: 1
          },
          {
            label: 'Chlorhexidine',
            id: 1
          },
        ];
        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getDrugs: function() {
        var data = [
          {
            label: 'Avastin',
            id: 1
          },
          {
            label: 'Eylea',
            id: 1
          },
          {
            label: 'Triamcinolone',
            id: 1
          },
          {
            label: 'Illuvien',
            id: 1
          },
          {
            label: 'Lucentis',
            id: 1
          },
          {
            label: 'Ozurdex',
            id: 1
          },
          {
            label: 'PDT',
            id: 1
          },
        ];
        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getInjectionPersonnel: function() {
        var data = [
          {
            label: 'Adams Gill',
            id: 1
          },
          {
            label: 'Addison Peter',
            id: 1
          },
          {
            label: 'Ali Nadeem',
            id: 1
          },
          {
            label: 'Allan Bruce',
            id: 1
          },
        ];
        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getPostInjectionLoweringTherapies: function() {
        var data = [
          {
            label: 'Iopidine 0.5%',
            id: 1
          },
          {
            label: 'Iopidine 1.0%',
            id: 1
          },
          {
            label: 'Diamox 250mg',
            id: 1
          },
          {
            label: 'Diamox 500mg',
            id: 1
          },
        ];
        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      },
      getPreInjectionLoweringTherapies: function() {
        var data = [
          {
            label: 'Iopidine 0.5%',
            id: 1
          },
          {
            label: 'Iopidine 1.0%',
            id: 1
          },
          {
            label: 'Diamox 250mg',
            id: 1
          },
          {
            label: 'Diamox 500mg',
            id: 1
          },
        ];
        var deferred = $q.defer();
        deferred.resolve(data);

        return deferred.promise;
      }
    };

  }]);
