'use strict'

var express = require('express');
var gateway_controller = require('../controllers/gatewayController');
var api = express.Router();

api.get('/gateway/:id', gateway_controller.getGateway);
api.get('/gateways', gateway_controller.getGateways);
api.post('/gateways', gateway_controller.saveGateway);
api.put('/gateway/:id', gateway_controller.setGateway);
api.delete('/gateway/:id', gateway_controller.deleteGateway);

module.exports = api;