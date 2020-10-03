'use strict'

var appErrors = require('./errors');

var devicesIndex = 1;
var gatewaysIndex = 1;

var devices = [
	{id: devicesIndex++, uid: 234, vendor:"INTEL", created_at:"2020/10/02", status: true, gateway: 1},
	{id: devicesIndex++, uid: 3242, vendor:"INTEL", created_at:"2020/10/01", status: true, gateway: 1},
	{id: devicesIndex++, uid: 68, vendor:"INTEL", created_at:"2020/10/01", status: true, gateway: 2},
	{id: devicesIndex++, uid: 33, vendor:"INTEL", created_at:"2020/10/01", status: true, gateway: 1}
];

function devicesByGateway()
{
	return devices.filter((dev)=> {return dev.gateway == this.id});
}

var gateways = [
	{id: gatewaysIndex++, serial: "78945612378", name: "mygateway", address: "127.0.0.1", devices: devicesByGateway},
	{id: gatewaysIndex++, serial: "32165498732", name: "gateway1", address: "127.0.0.1", devices: devicesByGateway},
	{id: gatewaysIndex++, serial: "65432198765", name: "gateway2", address: "127.0.0.1", devices: devicesByGateway},
];

class Gateway
{
	getAll(callback)
	{
		callback(appErrors.OK, gateways);
	}

	getBySerialAux(serial)
	{
		return gateways.filter((g)=>{
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
		return gateways.filter((g)=>{
			return g.id == id
		})[0];	
	}

	getById(id)
	{
		var gateway = this.getByIdAux(id);
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
					var newGateway = Object.assign({}, {id: gatewaysIndex++}, gateway, 
						{ devices: devicesByGateway });
					gateways.push(newGateway);
					callback(appErrors.OK, newGateway);
				}
				else callback(appErrors.ADDRESS_FORMAT_ERROR, newGateway);
			}
			else callback(appErrors.REQUEST_ERROR, null);
		}
		else callback(appErrors.GATEWAY_ALREADY_EXISTS_ERROR, null);		
	}

	update(id, gateway, callback)
	{
		var old_gateway = this.getById(id);

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
		gateways = gateways.filter((g)=>{
			return g.id != id
		});

		callback(appErrors.OK, gatewayTmp);
	}
}

class Device{
	getAll(callback)
	{
		callback(appErrors.OK, devices);
	}

	getByIdAux(id)
	{
		return devices.filter((d)=>{
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
			var gatewayTmp = gateways.filter((g)=>{
				return g.id == device.gateway
			})[0];
			
			if(gatewayTmp)
			{
				if(gatewayTmp.devices().length < 10)
				{
					var newDevice = Object.assign({}, {id: devicesIndex++}, device);
					devices.push(newDevice);
					callback(appErrors.OK, newDevice);
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
					var gatewayTmp = gateways.filter((g)=>{
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
			devices = devices.filter((d)=>{
				return d.id != id
			});

			callback(appErrors.OK, deviceTmp);
		}
		else
			callback(appErrors.OK, null);
	}
}

module.exports = {
	gatewayModel: new Gateway(),
	deviceModel: new Device()
};