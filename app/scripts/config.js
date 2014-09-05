"use strict";

 angular.module('config', [])

.constant('ENV', {name:'dev',host:'http://localhost:8080',apiEndpoints:{patients:'/Patient/?searchTerm=:term',patient:'/Patient/:id',sites:'/Site',siteLasers:'/Laser/?siteId=:id',laserOperators:'/LaserOperator',patientEvents:'/LaserEvent/?patientId=:id',laserEvent:'/LaserEvent/:id',createLaserEvent:'/LaserEvent',procedures:'/Procedure'}})

;