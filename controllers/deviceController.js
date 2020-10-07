'use strict'

var appErrors = require('../services/errors');
var deviceService = require('../services/devices.service');

function getDevice(req, res)
{
	var id = req.params.id;

	deviceService.getById(id, (err, data) =>{
		if(err)
		{
			res.status(500).send({message: 'Request error'})
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Device not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}
	});
}

function getDevices(req, res)
{
	deviceService.getAll((err, data) =>{
		if(err)
		{
			res.status(500).send({message: 'Request error'})
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Devices not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}

	});
}

function saveDevice(req, res)
{
	var device = req.body;

	deviceService.insert(device, (err, data) =>{
		if(err)
		{
			var errorMessage = '';

			if(err == appErrors.DEVICES_OVERFLOW_ERROR)
				errorMessage = `Gateway with serial number '${device.gateway}', already have 10 associated devices.`;
			else if(err == appErrors.GATEWAY_NOT_FOUND_ERROR)
				errorMessage = 'Gateway with serial '+ device.gateway +
				' not found.';

			res.status(500).send({message: errorMessage});
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Device not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}
	});
}

function deleteDevice(req, res)
{
	var id = req.params.id;

	deviceService.deleteById(id, (err, data) =>{
		if(err)
		{
			res.status(500).send({message: 'Request error.'});
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Device not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}
	});
}

function getGatewayDevices(req, res)
{
	var gateway = req.params.serial;

	deviceService.getDevicesByGateway(gateway, (err, data) =>{
		if(err)
		{
			res.status(500).send({message: 'Request error'})
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Device not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}
	});
}

module.exports = {
	getDevices,
	getDevice,
	saveDevice,
	deleteDevice
};