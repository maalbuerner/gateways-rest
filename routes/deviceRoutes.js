'use strict'

var express = require('express');
var device_controller = require('../controllers/deviceController');
var api = express.Router();

api.get('/device/:id', device_controller.getDevice);
api.get('/devices', device_controller.getDevices);
api.post('/devices', device_controller.saveDevice);
api.put('/device/:id', device_controller.setDevice);
api.delete('/device/:id', device_controller.deleteDevice);

module.exports = api;