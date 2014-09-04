"use strict";

 angular.module('config', [])

.constant('ENV', {name:'dev',host:'http://localhost:8080',apiEndpoints:{patients:'/patient/?searchTerm=:term',patient:'/patient/:id',sites:'/site',siteLasers:'/laser/?siteId=:id',laserOperators:'/laser-operator',patientEvents:'/data/patient-<id>-events.json',event:'/data/patient-<pid>-event-<eid>.json'}})

;
