'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:EncounterDirectiveCtrl
 * @description
 * # EncounterDirectiveCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
  .controller('EncounterDirectiveCtrl', [
  '$scope', '$compile', '$timeout', '$rootScope', '$routeParams', '$window', 'Encounter', 'Workflow', 'Ticket', 'WORKFLOW_DOMAIN',
  function ($scope, $compile, $timeout, $rootScope, $routeParams, $window, Encounter, Workflow, Ticket, WORKFLOW_DOMAIN) {

    var self = this;

    this.init = function(element){

      $scope.form.submitted = false;
      $scope.validations = Workflow.getValidationRules();

      Encounter.setForm($scope.form);
      this.componentMappings = Workflow.getComponentMappings();
      this.element = element;
      this.$modal = element.find('.modal');

      //  Broadcast by encounter page controller
      $scope.$on('encounter.save', this.save);

      Workflow.getConfig($routeParams.workflowId)
      .then(function(workflow) {
        self.layoutConfig = workflow.data;
        self.stepIndex = $routeParams.stepIndex;
        self.buildLayout(self.stepIndex);
        self.setConfirmationValues(self.stepIndex);
      }, function() {
        console.log('Unable to get current sute');
      });
    };

    this.setConfirmationValues = function(stepIndex){

      var steps = self.layoutConfig.steps;
      $scope.stepNameShort = steps[stepIndex].name;
      stepIndex++;
      // Set some next step variable for confirmation dialog
      // var nextStep = stepIndex < steps.length ? steps[stepIndex] : false;
      //console.log(nextStep);
    };

    this.buildLayout = function(stepIndex){

      var steps = self.layoutConfig.steps;
      var mandatoryFieldSets;

      var step = steps[stepIndex];
      $scope.stepName = self.layoutConfig.site + ' - ' + step.name + ' as a ' + step.role;

      // Filter out non-required fields
      mandatoryFieldSets = steps[stepIndex].components.filter(function(el){
        return el.required === true || !el.hasOwnProperty('required');
      });

      //  Loop over given layout components and add into container
      for(var index = 0;index < mandatoryFieldSets.length;index++){

        // Get component type without class prefix
        var cType = mandatoryFieldSets[index].type.split(WORKFLOW_DOMAIN + '.')[1];
        //  If component found then grab template and compile and append
        if(self.componentMappings[cType].hasOwnProperty(mandatoryFieldSets[index].name)) {
          var template = '<ng-include src="\''+self.componentMappings[cType][mandatoryFieldSets[index].name] + '\'"></ng-include>';
          var cTemplate = $compile(template)($scope);
          this.element.find('form:first').append(cTemplate);
        } else {
          console.log('No component mapping found for ', mandatoryFieldSets[index].type, mandatoryFieldSets[index].name, 'Step:', stepIndex);
        }
      }
    };

    this.save = function(){
      $timeout(function() {

        $scope.form.submitted = true;

        if ($scope.form.$invalid) {
          //TODO: scrollTo functionality currently not working on error state
          //Commented out to allow error handler to trigger in postEncounter

          // self.scrollToField(
          //   self.getFirstErrorField($scope.form.$error)
          // );
          return;
        }

        self.getPatient(function(){
          var postObject = self.buildPostObject();
          postObject.patientId = self.patient._id.$oid;
          postObject.stepIndex = parseInt(self.stepIndex, 10);
          postObject.ticketId = $routeParams.ticketId;
          self.postEncounter(postObject);
        });

      });
    };

    this.postEncounter = function(postObject){
      Encounter.create(postObject)
        .success(function() {
          Encounter.clearElements();
          self.showConfirmation();
        })
        .error(function(data, status, headers, config) {
          $rootScope.$broadcast('error.invalidForm');
          console.log(data, status, headers, config);
        });
    };

    this.showConfirmation = function(){
      self.$modal.modal('show');
    };

    this.getPatient = function(callback){
      Ticket.getTicket($routeParams.ticketId)
        .then(function(data) {
          self.patient = data.data.patient;
          callback();
        }, function(data, status, headers, config) {
          console.log('Error getting patient data', data, status, headers, config);
        });
    };

    this.getFirstErrorField = function(errors) {
      return errors[Object.keys(errors)[0]][0];
    };

    this.scrollToField = function(model) {

      // Timeout to allow validation messages to be displayed prior to scrolling to element.
      $timeout(function() {

        var element = angular.element('[name="' + model.$name + '"]');

        if (!element.length) {
          console.warn('Attempting to scroll to an element that does not exist.');
          return;
        }
        var formGroup = element.parents('.form-group');
        if (formGroup.length) {
          // Some weirdness experienced in chrome. I guess this forces chrome to
          // re-calculate the window sroll area. This is required for the scrollIntoView()
          // method to work reliably.
          window.scrollTo(0,1);
          formGroup[0].scrollIntoView(true);
        } else {
          console.warn('Unable to find form-group wrapper for this field.');
        }
      });
    };

    this.buildPostObject = function(){
      var elementModels = Encounter.getElements();
      var postObject = {};
      var postElements = [];
      var elements = {};

      for(var i = 0;i < elementModels.length;i++){
        var model = elementModels[i];
        var name = model.name;
        var modelData = model.model;

        if(!modelData){
          continue;
        }

        if(!elements.hasOwnProperty(name)){
          elements[name] = {};
        }

        if(model.hasOwnProperty('subPath')){
          elements[name][model.subPath] = modelData;
        } else {
          elements[name] = modelData;
        }
      }

      for(var key in elements){
        if(elements.hasOwnProperty(key)){
          elements[key].type = key;
          postElements.push(elements[key]);
        }

      }

      postObject.elements = postElements;
      return postObject;
    };

    $scope.backToPatientList = function(){
      self.$modal.modal('hide')
        .on('hidden.bs.modal', function() {
          $window.history.back();
        });
    };

  }])
  .directive('oeEncounter', function () {

    return {
      restrict: 'EA', //E = element, A = attribute, C = class, M = comment
      templateUrl: 'views/directives/encounter.html',
      controller: 'EncounterDirectiveCtrl', //Embed a custom controller in the directive
      link: function ($scope, element, attrs, EncounterDirectiveCtrl) {
        EncounterDirectiveCtrl.init(element, attrs);
      }
    };
  });
