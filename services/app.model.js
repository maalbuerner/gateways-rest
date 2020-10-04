'use strict'

var devicesIndex = 1;
var gatewaysIndex = 1;

var devices = [
	{id: devicesIndex++, uid: 234, vendor:"INTEL", created_at: new Date(), status: true, gateway: 1},
	{id: devicesIndex++, uid: 3242, vendor:"INTEL", created_at: new Date(), status: true, gateway: 1},
	{id: devicesIndex++, uid: 68, vendor:"INTEL", created_at: new Date(), status: true, gateway: 2},
	{id: devicesIndex++, uid: 33, vendor:"INTEL", created_at: new Date(), status: true, gateway: 1}
];

function devicesByGateway()
{
	return devices.filter((dev)=> {return dev.gateway == this.id});
}

var gateways = [
	{id: gatewaysIndex++, serial: "78945612378", name: "gateway1", address: "127.0.0.1", devices: devicesByGateway},
	{id: gatewaysIndex++, serial: "32165498732", name: "gateway2", address: "127.0.0.1", devices: devicesByGateway},
	{id: gatewaysIndex++, serial: "65432198765", name: "gateway3", address: "127.0.0.1", devices: devicesByGateway},
];

function addGateway(gateway)
{
	var newGateway = Object.assign({}, {id: gatewaysIndex++}, gateway, 
		{ devices: devicesByGateway });
	gateways.push(newGateway);

	return newGateway;
}

function addDevice(device)
{
	var newDevice = Object.assign({}, {id: devicesIndex++}, device);
	devices.push(newDevice);

	return newDevice;
}

function clearGateways()
{
	gateways = [];
}

function clearDevices()
{
	devices = [];
}

module.exports = {
	devices: devices,
	gateways: gateways,
	addGateway,
	addDevice,
	clearGateways,
	clearDevices
};