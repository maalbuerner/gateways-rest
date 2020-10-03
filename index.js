'use strict'

// var mongoose = require('mongoose');
var app = require('./app');

// var personList = [
// 	{name : "Juan", lastname1: "Méndez", lastname2: "Estrada", signPath: "/assets/images/signatures/sign1.png"},
// 	{name : "Pedro", lastname1: "Pablo", lastname2: "Jimenes", signPath:"/assets/images/signatures/sign1.png"},
// 	{name : "Miguel", lastname1: "Ortis", lastname2: "Ortis", signPath:"/assets/images/signatures/sign1.png"}
// ];

// var devices = [
// 	{uid: 234, vendor:"INTEL", created_at:"2020/10/01",  gateway: "78945612378"},
// 	{uid: 3242, vendor:"INTEL", created_at:"2020/10/01", gateway: "78945612378"},
// 	{uid: 68, vendor:"INTEL", created_at:"2020/10/01", gateway: "32165498732"},
// 	{uid: 33, vendor:"INTEL", created_at:"2020/10/01", gateway: "78945612378"},
// ];

// function devicesByGateway()
// {
// 	return devices.filter((dev)=> {return dev.gateway == this.serial});
// }

// var gateways = [
// 	{serial: "78945612378", name: "mygateway", address: "127.0.0.1", devices: devicesByGateway},
// 	{serial: "32165498732", name: "gateway1", address: "127.0.0.1", devices: devicesByGateway},
// 	{serial: "65432198765", name: "gateway2", address: "127.0.0.1", devices: devicesByGateway},
// ];


// console.log(gateways);


// function prueba(callback)
// {
// 	callback('mensaje de prueba para callback');
// }


// function error(mensaje)
// {
// 	console.log(mensaje);
// }

// prueba(error);

// var pepe = {serial: "78945612378", name: "mygateway", address: "127.0.0.1"};

// console.log(pepe);
// pepe = Object.assign({}, pepe, { devices: devicesByGateway });
// console.log(pepe);


// var isAddressFormat = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test('127.0.0.');

// console.log(isAddressFormat);

app.listen(3268, function(){
	console.log('Gateways API Rest running on http://localhost:3268');
});
