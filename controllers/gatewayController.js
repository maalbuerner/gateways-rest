'use strict'

var appErrors = require('../models/errors');
var model = require('../models/app.model');
var gatewayModel = model.gatewayModel;

function getGateway(req, res)
{
	var serial = req.params.serial;

	gatewayModel.getBySerial(serial, (err, data) =>{
		if(err)
		{
			res.status(500).send({message: 'Request error'})
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Gateway not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}
	});
}

function getGateways(req, res)
{
	gatewayModel.getAll((err, data) =>{
		if(err)
		{
			res.status(500).send({message: 'Request error'})
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Gateways not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}

	});
}

function saveGateway(req, res)
{
	var gateway = req.body;

	gatewayModel.insert(gateway, (err, data) =>{
		if(err)
		{
			var detail = '';

			if(err == appErrors.ADDRESS_FORMAT_ERROR)
				detail += ' Invalid address format.';
			else if(err == appErrors.GATEWAY_ALREADY_EXISTS_ERROR)
				detail += ' Already exists a gateway with the same serial number.';

			res.status(500).send({message: `Request error.${detail}`});
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Gateway not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}
	});
}

function setGateway(req, res)
{
	var id = req.params.id;

	var gateway = req.body;

	gatewayModel.update(id, gateway, (err, data) =>{
		if(err)
		{
			var detail = '';

			if(err == appErrors.ADDRESS_FORMAT_ERROR)
				detail += ' Invalid IP Address format.';
			else if(err == appErrors.GATEWAY_ALREADY_EXISTS_ERROR)
				detail += ' Already exists a gateway with the same serial number.';

			res.status(500).send({message: `Request error.${detail}`});
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Gateway not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}
	});
}

function deleteGateway(req, res)
{
	var id = req.params.id;

	gatewayModel.deleteById(id, (err, data) =>{
		if(err)
		{
			res.status(500).send({message: "Request error."})
		}
		else
		{
			if(!data)
			{
				res.status(404).send({message: 'Gateway not found.'});
			}
			else
			{
				res.status(200).send(data);
			}
		}
	});
}

module.exports = {
	getGateways,
	getGateway,
	saveGateway,
	setGateway,
	deleteGateway
};