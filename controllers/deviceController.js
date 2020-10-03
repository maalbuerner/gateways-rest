'use strict'

var appErrors = require('../models/errors');
var model = require('../models/app.model');
var deviceModel = model.deviceModel;


function getDevice(req, res)
{
	var id = req.params.id;

	deviceModel.getById(id, (err, data) =>{
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
	deviceModel.getAll((err, data) =>{
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

	deviceModel.insert(device, (err, data) =>{
		if(err)
		{
			var detail = '';

			if(err == appErrors.DEVICES_OVERFLOW_ERROR)
				detail += ` Gateway with Id number '${device.gateway}', already have 10 associated devices.`;
			else if(err == appErrors.GATEWAY_NOT_FOUND_ERROR)
				detail += ' Gateway with Id '+ device.gateway +
				' not found.';

			res.status(500).send({message: `Request error.${detail}`});
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

function setDevice(req, res)
{
	var id = req.params.id;

	var device = req.body;

	deviceModel.update(id, device, (err, data) =>{
		if(err)
		{
			var detail = '';

			if(err == appErrors.DEVICES_OVERFLOW_ERROR)
				detail += ` Gateway with Id number '${device.gateway}', already have 10 associated devices.`;
			else if(err == appErrors.GATEWAY_NOT_FOUND_ERROR)
				detail += ' Gateway with Id '+ device.gateway +
				' not found.';

			res.status(500).send({message: `Request error.${detail}`});
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

	deviceModel.deleteById(id, (err, data) =>{
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

module.exports = {
	getDevices,
	getDevice,
	saveDevice,
	setDevice,
	deleteDevice
};