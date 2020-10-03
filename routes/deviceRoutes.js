'use strict'

var express = require('express');
var device_controller = require('../controllers/deviceController');
var api = express.Router();

api.get('/devices/:id', device_controller.getDevice);
api.get('/devices', device_controller.getDevices);
api.post('/devices', device_controller.saveDevice);
api.put('/devices/:id', device_controller.setDevice);
api.delete('/devices/:id', device_controller.deleteDevice);

module.exports = api;