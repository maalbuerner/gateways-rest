'use strict'

var express = require('express');
var gateway_controller = require('../controllers/gatewayController');
var api = express.Router();

api.get('/gateways/:id', gateway_controller.getGateway);
api.get('/gateways', gateway_controller.getGateways);
api.get('/gateways/:id/devices', gateway_controller.getGatewayDevices);
api.post('/gateways', gateway_controller.saveGateway);
api.put('/gateways/:id', gateway_controller.setGateway);
api.delete('/gateways/:id', gateway_controller.deleteGateway);

module.exports = api;