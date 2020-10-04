'use strict'

/*
 * File with all configuration of Express and routing
 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Loading routes
var gateway_routes = require('./routes/gatewayRoutes');
var device_routes = require('./routes/deviceRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// headers configuration
app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// Base routes
app.use('/api', gateway_routes);
app.use('/api', device_routes);

module.exports = app;
