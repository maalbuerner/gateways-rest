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
}

module.exports = new Gateway();