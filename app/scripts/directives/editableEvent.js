'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:ConfigurableEventCtrl
 * @description
 * # ConfigurableEventCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('ConfigurableEventCtrl', ['$scope', '$compile', '$timeout', '$rootScope', '$routeParams', 'Event', function ($scope, $compile, $timeout, $rootScope, $routeParams, Event) {

    var self = this;

    this.init = function(element){

      $scope.form.submitted = false;
      $scope.validations = Event.getValidationRules();

      Event.setForm($scope.form);
      this.componentMappings = Event.getComponentMappings('edit');
      this.element = element;

      //  Broadcast by event page controller
      $scope.$on('event.save', this.save);

      Event.getWorkflowConfig()
        .success(function(data){
          self.layoutConfig = data[Event.getCurrentSite()];
          self.buildLayout($routeParams.stepName);
        })
        .error(function(data, status, headers, config) {
          console.log(data, status, headers, config);
        });
    };

    this.buildLayout = function(stepName){
      $scope.stepName = stepName;
      var steps = self.layoutConfig.steps;
      var mandatoryFieldSets;

      for(var i = 0;i < steps.length;i++){
        if(steps[i].name === stepName) {
          mandatoryFieldSets = steps[i].mandatoryFieldSets;
          break;
        }
      }
      //  Loop over given layout components and add into container
      for(var index = 0;index < mandatoryFieldSets.length;index++){
        if(self.componentMappings.hasOwnProperty(mandatoryFieldSets[index])) {
          var template = self.componentMappings[mandatoryFieldSets[index]];
          var cTemplate = $compile(template)($scope);
          this.element.find('form:first').append(cTemplate);
        } else {
          console.log('No component mapping found for ', mandatoryFieldSets[index], 'Step:', stepName);
        }
      }
    };

    this.save = function(scope, params){
      $timeout(function() {

        $scope.form.submitted = true;

        if ($scope.form.$invalid) {
          self.scrollToField(
            self.getFirstErrorField($scope.form.$error)
          );
          return;
        }

        var postObject = self.buildPostObject();
        postObject.patientId = params.patientId;
        console.log(postObject);

        Event.create(postObject)
          .success(function(data) {
            console.log('success', data);
            Event.clearEventStack();
            $rootScope.$broadcast('event.save.complete', {});
          })
          .error(function(data, status, headers, config) {
            console.log(data, status, headers, config);
          });

      });
    };

    this.getFirstErrorField = function(errors) {
      return errors[Object.keys(errors)[0]][0];
    };

    this.scrollToField = function(model) {

      var element = angular.element('[name="' + model.$name + '"]');

      if (!element.length) {
        console.warn('Attempting to scroll to an element that does not exist.');
        return;
      }
      var formGroup = element.parents('.form-group');
      if (formGroup.length) {
        formGroup[0].scrollIntoView(true);
      } else {
        console.warn('Unable to find form-group wrapper for this field.');
      }
    };

    this.buildPostObject = function(){
      var eventComponents = Event.getEventStack();
      var postObject = {};
      var elements = {};
      var postElements = [];

      for(var i = 0;i < eventComponents.length;i++){
        var model = eventComponents[i];
        var name = model.name;
        var modelData = model.model;
        //  No data so skip
        if(!modelData){
          continue;
        }
        //  Do we already have an entry for this element?
        if(!elements.hasOwnProperty(name)){
          elements[name] = {};
        }
        //  If subpath then nest data there e.g. element.rightEye
        if(model.hasOwnProperty('subPath')){
          elements[name][model.subPath] = modelData;
        } else {
          elements[name] = modelData;
        }
      }

      for(var typeKey in elements) {
        if(elements.hasOwnProperty(typeKey)){
          elements[typeKey].type = typeKey;
          postElements.push(elements[typeKey]);
        }
      }

      postObject.elements = postElements;
      return postObject;
    };

  }])
  .directive('oeEditableEvent', function () {

    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      templateUrl: 'views/directives/editableEvent.html',
      controller: 'ConfigurableEventCtrl', //Embed a custom controller in the directive
      link: function ($scope, element, attrs, ConfigurableEventCtrl) {
        ConfigurableEventCtrl.init(element, attrs);
      }
    };
  });
