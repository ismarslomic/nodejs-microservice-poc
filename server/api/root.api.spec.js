'use strict';
require('should');

var request = require('supertest');
var server = require('../server');
var v1RoutePath = '/api/v1';
var url = server.url + v1RoutePath;

	describe('Root endpoint REST API services', function () {
	describe('query / GET', function () {
		it('should return 200 and all endpoints available', function (done) {
			request(server)
				.get(v1RoutePath)
				.expect('Content-Type', /json/)
				.expect(200)
				.expect(function (res) {
					res.body.should.have.property('articleUrls');
					res.body.articleUrls.should.equal(url + '/articles');
					res.body.should.have.property('userUrls');
					res.body.userUrls.should.equal(url + '/users');
				})
				.end(done);
		});
	});

	describe('insert / POST', function () {
		it('should return 405 Not Found when using POST', function (done) {
			request(server)
				.post(v1RoutePath)
				.send({foo: 'bar'})
				.expect('Content-Type', /json/)
				.expect(405)
				.end(done);
		});
	});

	describe('update / PATCH', function () {
		it('should return 405 Not Found when using PATCH', function (done) {
			request(server)
				.patch(v1RoutePath)
				.send({foo: 'bar'})
				.expect('Content-Type', /json/)
				.expect(405)
				.end(done);
		});
	});

	describe('delete / DEL', function () {
		it('should return 405 Not Found when using DELETE', function (done) {
			request(server)
				.delete(v1RoutePath)
				.expect('Content-Type', /json/)
				.expect(405)
				.end(done);
		});
	});
});
