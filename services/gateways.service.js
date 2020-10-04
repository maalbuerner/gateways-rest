'use strict'

var appErrors = require('./errors');
var model = require('./app.model');

class Gateway
{
	getAll(callback)
	{
		callback(appErrors.OK, model.gateways);
	}

	getBySerialAux(serial)
	{
		return model.gateways.filter((g)=>{
			return g.serial == serial
		})[0];	
	}

	getBySerial(serial, callback)
	{
		var gateway = this.getBySerialAux(serial);

		callback(appErrors.OK, gateway);
	}

	getByIdAux(id)
	{
		return model.gateways.filter((g)=>{
			return g.id == id
		})[0];	
	}

	getById(id, callback)
	{
		var gateway = this.getByIdAux(id);
		callback(appErrors.OK, gateway);
	}

	getDevices(id, callback)
	{
		var gatewayTmp = this.getByIdAux(id);

		if(gatewayTmp)
		{
			var devices = this.getByIdAux(id).devices();
			callback(appErrors.OK, devices);
		}
		else callback(appErrors.GATEWAY_NOT_FOUND_ERROR, null);
	}

	isAddressFormat(address)
	{
 		return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(address);
	}

	insert(gateway, callback)
	{
		if(!this.getBySerialAux(gateway.serial))
		{	
			if(gateway.serial && gateway.name && gateway.address)
			{
				if(this.isAddressFormat(gateway.address)){
					callback(appErrors.OK, model.addGateway(gateway));
				}
				else callback(appErrors.ADDRESS_FORMAT_ERROR, null);
			}
			else callback(appErrors.REQUEST_ERROR, null);
		}
		else callback(appErrors.GATEWAY_ALREADY_EXISTS_ERROR, null);		
	}

	update(id, gateway, callback)
	{
		var old_gateway = this.getByIdAux(id);

		if(old_gateway){
			if(gateway.serial && gateway.name && gateway.address)
			{
				if(!this.isAddressFormat(gateway.address))
				{
					callback(appErrors.ADDRESS_FORMAT_ERROR, null);
					return;		
				}

				if(old_gateway.serial != gateway.serial)
				{
					if(!this.getBySerialAux(gateway.serial))
						old_gateway.serial = gateway.serial;
					else
					{
						callback(appErrors.GATEWAY_ALREADY_EXISTS_ERROR, null);
						return;		
					}
				}

				old_gateway.name = gateway.name;
				old_gateway.address = gateway.address;

				callback(appErrors.OK, old_gateway);
			}
			else callback(appErrors.REQUEST_ERROR, null);
		}
		else callback(appErrors.OK, null); 
	}

	deleteById(id, callback)
	{ 
		const gatewayTmp = this.getByIdAux(id);
		model.gateways = model.gateways.filter((g)=>{
			return g.id != id
		});

		callback(appErrors.OK, gatewayTmp);
	}
}

module.exports = new Gateway();