"use strict";

 angular.module('config', [])

.constant('ENV', {name:'dev',host:'http://localhost:8080',apiEndpoints:{patients:'/Patient/?searchTerm=:term',patient:'/Patient/:id',sites:'/Site',siteLasers:'/Laser/?siteId=:id',laserOperators:'/LaserOperator',patientEvents:'/LaserEvent/?patientId=:id',laserEvent:'/LaserEvent/:id',createEncounter:'/Encounter',procedures:'/Procedure',workflow:'/Workflow',getElements:'/Element/?patientId=:patientId&elementType=:elementType&date=:date',getTickets:'/Ticket/?workflowId=:workflowId&stepIndex=:stepIndex',getTicket:'/Ticket/:ticketId'}})

;