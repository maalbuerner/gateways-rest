let chai = require('chai')
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Devices', () => {
	it('it should GET all devices', function(done) {
		chai.request(app)
			.get('/api/devices')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				done();
			});
	});
});

describe('Adding device', () => {
	it(`it should GET the device added`, function(done) {
		chai.request(app)
			.post('/api/devices')
			.send({uid: 200, 
				vendor:"INTEL", 
				created_at: new Date(), 
				status: true, 
				gateway: 78945612378})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				done();				
			});
	});
});

