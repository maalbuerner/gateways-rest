'use strict'

var devicesIndex = 1;
var gatewaysIndex = 1;

var devices = [
	{id: devicesIndex++, uid: 234, vendor:"INTEL", created_at: (new Date()).toISOString().split('T')[0], status: true, gateway: 78945612378},
	{id: devicesIndex++, uid: 3242, vendor:"INTEL", created_at: (new Date()).toISOString().split('T')[0], status: false, gateway: 78945612378},
	{id: devicesIndex++, uid: 68, vendor:"INTEL", created_at: (new Date()).toISOString().split('T')[0], status: true, gateway: 32165498732},
	{id: devicesIndex++, uid: 69, vendor:"INTEL", created_at: (new Date()).toISOString().split('T')[0], status: true, gateway: 32165498732},
	{id: devicesIndex++, uid: 70, vendor:"INTEL", created_at: (new Date()).toISOString().split('T')[0], status: false, gateway: 32165498732},
	{id: devicesIndex++, uid: 683, vendor:"INTEL", created_at: (new Date()).toISOString().split('T')[0], status: true, gateway: 32165498732},
	{id: devicesIndex++, uid: 468, vendor:"INTEL", created_at: (new Date()).toISOString().split('T')[0], status: true, gateway: 32165498732},
	{id: devicesIndex++, uid: 668, vendor:"INTEL", created_at: (new Date()).toISOString().split('T')[0], status: false, gateway: 32165498732},
	{id: devicesIndex++, uid: 768, vendor:"INTEL", created_at: (new Date()).toISOString().split('T')[0], status: true, gateway: 32165498732},
];

var gateways = [
	{serial: "78945612378", name: "gateway1", address: "127.0.0.1"},
	{serial: "32165498732", name: "gateway2", address: "127.0.0.1"},
	{serial: "65432198765", name: "gateway3", address: "127.0.0.1"}
];

function addGateway(gateway)
{
	gateways.push(gateway);
	return gateway;
}

function addDevice(device)
{
	var newDevice = device;
	newDevice.id = devicesIndex++;
	newDevice.status = (device.status == 1 || device.status == 'true')? true : false; 
	devices.push(newDevice);

	return newDevice;
}

function clearGateways()
{
	gateways.length = 0;	
}

function clearDevices()
{
	devices.length = 0;
}

module.exports = {
	devices: devices,
	gateways: gateways,
	addGateway,
	addDevice,
	clearGateways,
	clearDevices
};