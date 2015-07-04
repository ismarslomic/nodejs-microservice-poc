'use strict';
require('should');

var request = require('supertest');
var server = require('../../server').server;
var db = require('../../config/mongoose');
var User = require('./user.model').model;

var v1RoutePath = '/api/v1/users';
var baseUrl = server.url + v1RoutePath;

// Clear all users
function cleanup(done) {
	db.connect(function(){
		User.remove().exec().then(function () {
			done();
		});
	});
}

function populate(done) {
	User.create(
		{email: 'per@example.com', password: 'PersSecretPassword'},
		{email: 'ola@example.com', password: 'OlasSecretPassword'},
		{email: 'kari@example.com', password: 'KarisSecretPassword'},
		function (err, user) {
			if (err) {
				throw err;
			}
			done();
		}
	)
}

function closeConnection(done){
	db.disconnect(function(){
		done();
	})
}


describe('User REST API services', function () {
	describe('query / GET', function () {
		before(cleanup);
		before(populate);
		after(closeConnection);

		it('should return all users', function (done) {
			request(server)
				.get(v1RoutePath)
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(function (res) {
					res.body.should.have.lengthOf(3);
					res.headers.should.have.property('x-total-count');
					res.headers['x-total-count'].should.be.exactly('3');
				})
				.end(done);
		});
	});

	describe('details / GET', function () {
		before(cleanup);
		after(closeConnection);

		it('should select detail user', function (done) {
			User.create(
				{email: 'martin@example.com', password: 'MartinsSecretPassword'},
				function (err, user) {
					if (err) {
						throw err;
					}

					request(server)
						.get(v1RoutePath + '/' + user.id)
						.expect('Content-Type', /json/)
						.expect(200)
						.expect(function (res) {
							res.body.should.have.property('email');
							res.body.should.have.property('password');
							res.body.should.have.property('_id');
							res.body.should.have.property('__v');
							res.body.email.should.equal('martin@example.com');
							res.body.password.should.equal('MartinsSecretPassword');
						})
						.end(done);
				});
		});
	});

	describe('insert / POST', function () {
		before(cleanup);
		after(closeConnection);

		it('should create user and return user back with 201', function (done) {
			request(server)
				.post(v1RoutePath)
				.send({email: 'martin@example.com', password: 'MartinsSecretPassword'})
				.expect('Content-Type', /json/)
				.expect(201)
				.expect(function (res) {
					res.headers.should.have.property('location');
					res.headers.location.should.be.equal(baseUrl + '/' + res.body._id);
					res.body.should.have.property('email');
					res.body.should.have.property('password');
					res.body.should.have.property('_id');
					res.body.should.have.property('__v');
					res.body.email.should.equal('martin@example.com');
					res.body.password.should.equal('MartinsSecretPassword');
				})
				.end(done);
		});
	});

	describe('update / PATCH', function () {
		before(cleanup);
		after(closeConnection);

		it('should partly update existing user and return back full doc', function (done) {
			User.create(
				{email: 'martin@example.com', password: 'MartinsSecretPassword'},
				function (err, user) {
					if (err) {
						throw err;
					}

					request(server)
						.patch(v1RoutePath + '/' + user.id)
						.send({email: 'martin-new@example.com'})
						.expect('Content-Type', /json/)
						.expect(200)
						.expect(function (res) {
							res.headers.should.have.property('location');
							res.headers.location.should.be.equal(baseUrl + '/' + res.body._id);
							res.body.email.should.equal('martin-new@example.com');
							res.body.password.should.equal('MartinsSecretPassword');
							res.body.should.have.property('_id');
							res.body.should.have.property('__v');
						})
						.end(done);
				});
		});
	});

	describe('delete / DEL', function () {
		before(cleanup);
		after(closeConnection);

		it('should delete existing user', function (done) {
			User.create(
				{email: 'martin@example.com', password: 'MartinsSecretPassword'},
				function (err, user) {
					if (err) {
						throw err;
					}

					request(server)
						.del(v1RoutePath + '/' + user.id)
						.expect('Content-Type', /json/)
						.expect(function (res) {
							res.body.should.not.be.empty();
						})
						.expect(200)
						.end(done);
				});
		});
	});

});
