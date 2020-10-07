let chai = require('chai')
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let model = require('../services/app.model');

chai.use(chaiHttp);

beforeEach(async function () {
  await model.clearGateways();
  await model.addGateway({serial: "78945612378", name: "gateway1", address: "127.0.0.1"});
  await model.addGateway({serial: "98765432187", name: "gateway2", address: "127.0.0.1"});
  await model.clearDevices();
  await model.addDevice({ uid: 100, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
  await model.addDevice({ uid: 200, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
  await model.addDevice({ uid: 300, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
  await model.addDevice({ uid: 400, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
  await model.addDevice({ uid: 500, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
  await model.addDevice({ uid: 600, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
  await model.addDevice({ uid: 700, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
  await model.addDevice({ uid: 800, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
  await model.addDevice({ uid: 900, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
  await model.addDevice({ uid: 1000, vendor:"INTEL", created_at: new Date(), status: true, gateway: 98765432187});
});

describe('Gateways', () => {
	it('it should GET all gateways', function(done) {
		chai.request(app)
			.get('/api/gateways')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			});
	});
});

describe('Gateway devices', () => {
	it(`it should GET all gateway's devices`, function(done) {
		chai.request(app)
			.get('/api/gateways/98765432187/devices')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.should.have.length(10);
				done();
			});
	});
});

describe('Gateway overflow of devices', () => {
	it(`it should show error message`, function(done) {
		chai.request(app)
			.post('/api/devices')
			.send({uid: 200, 
				vendor:"INTEL", 
				created_at: new Date(), 
				status: true, 
				gateway: 98765432187})
			.end((err, res) => {
				res.should.have.status(500);
				res.body.should.be.a('object');
				res.body.message.should.include.string('already have 10 associated devices');
				done();				
			});
	});
});

describe('Adding gateway', () => {
	it(`it should GET the gateway added`, function(done) {
		chai.request(app)
			.post('/api/gateways')
			.send({serial: "123546789", 
				name: "gateway3", 
				address: "127.0.0.1"})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				done();				
			});
	});
});

describe('Adding gateway with invalid address format', () => {
	it(`it should response error message`, function(done) {
		chai.request(app)
			.post('/api/gateways')
			.send({serial: "123546789", 
				name: "gateway3", 
				address: "127.X.X.1"})
			.end((err, res) => {
				res.should.have.status(500);
				res.body.should.be.a('object');
				res.body.message.should.equal('Request error. Invalid address format.');
				done();				
			});
	});
});