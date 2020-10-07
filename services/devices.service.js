'use strict'

var appErrors = require('./errors');
var model = require('./app.model');
var serviceGateway = require('./gateways.service');

class Device{
	getAll(callback)
	{
		callback(appErrors.OK, model.devices);
	}
	
	getByIdAux(id)
	{
		return model.devices.filter((d)=>{
			return d.id == id
		})[0];	
	}

	getById(id, callback)
	{
		var device = this.getByIdAux(id);
		callback(appErrors.OK, device);
	}

	getDevicesByGatewayAux(serialGateway)
	{
		return model.devices.filter((d)=>{
			return d.gateway == serialGateway
		});	
	}

	getDevicesByGateway(serialGateway, callback)
	{
		callback(appErrors.OK, this.getDevicesByGatewayAux(serialGateway));
	}

	insert(device, callback)
	{
		if(device.uid && device.vendor && device.created_at && device.status
			&& device.gateway)
		{
			var gatewayTmp = serviceGateway.getBySerialAux(device.gateway); 
			
			if(gatewayTmp)
			{
				if(this.getDevicesByGatewayAux(gatewayTmp.serial).length < 10)
				{
					callback(appErrors.OK, model.addDevice(device));
				}		
				else callback(appErrors.DEVICES_OVERFLOW_ERROR, null);
			}
			else callback(appErrors.GATEWAY_NOT_FOUND_ERROR, null);
		}
		else
			callback(appErrors.REQUEST_ERROR, null);
	}

	deleteById(id, callback)
	{
		const deviceTmp = this.getByIdAux(id);

		if(deviceTmp)
		{
		  	const pos = model.devices.indexOf(deviceTmp);
		    model.devices.splice(pos, 1);

			callback(appErrors.OK, deviceTmp);
		}
		else
			callback(appErrors.OK, null);
	}
}

module.exports = new Device();