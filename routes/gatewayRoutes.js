'use strict'

var express = require('express');
var gateway_controller = require('../controllers/gatewayController');
var api = express.Router();

api.get('/gateways/:serial', gateway_controller.getGateway);
api.get('/gateways', gateway_controller.getGateways);
api.get('/gateways/:serial/devices', gateway_controller.getGatewayDevices);
api.post('/gateways', gateway_controller.saveGateway);

module.exports = api;