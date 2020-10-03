'use strict'

var appErrors = require('./errors');
var model = require('./app.model');

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

	insert(device, callback)
	{
		if(device.uid && device.vendor && device.created_at && device.status
			&& device.gateway)
		{
			var gatewayTmp = model.gateways.filter((g)=>{
				return g.id == device.gateway
			})[0];
			
			if(gatewayTmp)
			{
				if(gatewayTmp.devices().length < 10)
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

	update(id, device, callback)
	{
		var old_device = this.getByIdAux(id);

		if(old_device)
		{
			if(device.uid && device.vendor && device.created_at && device.status
				&& device.gateway)
			{
				if(old_device.gateway != device.gateway)
				{
					var gatewayTmp = model.gateways.filter((g)=>{
						return g.id == device.gateway
					})[0];

					if(gatewayTmp)
					{
						if(gatewayTmp.devices().length >= 10)
						{
							callback(appErrors.DEVICES_OVERFLOW_ERROR, null);
							return;
						}
					}
					else
					{
						callback(appErrors.GATEWAY_NOT_FOUND_ERROR, null);
						return;
					}
				}

				old_device.uid = device.uid;
				old_device.vendor = device.vendor;
				old_device.created_at = device.created_at;
				old_device.status = device.status;
				old_device.gateway = device.gateway;

				callback(appErrors.OK, old_device);
			}
			else
				callback(appErrors.REQUEST_ERROR, null);
		}
		else callback(appErrors.OK, null);
	}

	deleteById(id, callback)
	{
		const deviceTmp = this.getByIdAux(id);

		if(deviceTmp)
		{
			model.devices = model.devices.filter((d)=>{
				return d.id != id
			});

			callback(appErrors.OK, deviceTmp);
		}
		else
			callback(appErrors.OK, null);
	}
}

module.exports = new Device();