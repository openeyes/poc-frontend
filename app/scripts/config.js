"use strict";

 angular.module('config', [])

.constant('ENV', {name:'dev',host:'http://localhost:9000',apiEndpoints:{patients:'/data/patients.json',patient:'/data/patient-<id>.json',sites:'/data/sites.json',siteLasers:'/data/lasers-site-<id>.json',laserOperators:'/data/laser-operators.json',patientEvents:'/data/patient-<id>-events.json',event:'/data/patient-<pid>-event-<eid>.json'}})

;