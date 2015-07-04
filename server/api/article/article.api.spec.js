'use strict';
require('should');

var request = require('supertest');
var server = require('../../server').server;
var db = require('../../config/mongoose');
var Article = require('./article.model').model;
var v1RoutePath = '/api/v1/articles';
var baseUrl = server.url + v1RoutePath;

// Clear all articles
function cleanup(done) {
	db.connect(function () {
		Article.remove().exec().then(function () {
			done();
		});
	});
}

function populate(done) {
	Article.create(
		{
			title: 'My article #1', slug: 'slug 123', content: 'Content of first article', author: 'Ola Nordmann',
			comments: [{text: 'My comments are expensive', author: 'Kari Nordmann',}]
		},
		{
			title: 'My article #2', slug: 'slug 456', content: 'Content of second article', author: 'Per Jensen',
			comments: [{text: 'My comments are expensive', author: 'Gar Støre',}]
		},
		{
			title: 'My article #3', slug: 'slug 789', content: 'Content of third article', author: 'Siv Jensen',
			comments: [{text: 'My comments are expensive', author: 'Erna Solberg',}]
		},
		function (err, article) {
			if (err) {
				throw err;
			}
			done();
		}
	)
}

function closeConnection(done) {
	db.disconnect(function () {
		done();
	})
}

describe('Article REST API services', function () {
	describe('query / GET', function () {
		before(cleanup);
		before(populate);
		after(closeConnection);

		it('should return all articles', function (done) {
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

		it('should select detail article', function (done) {
			Article.create(
				{
					title: 'My detailed article', slug: 'slug 789', content: 'Content of third article', author: 'Siv Jensen',
					comments: [{text: 'My comments are expensive', author: 'Erna Solberg',}]
				},
				function (err, article) {
					if (err) {
						throw err;
					}

					request(server)
						.get(v1RoutePath + '/' + article.id)
						.expect('Content-Type', /json/)
						.expect(200)
						.expect(function (res) {
							res.body.title.should.equal('My detailed article');
							res.body.should.have.property('slug');
							res.body.should.have.property('content');
							res.body.should.have.property('author');
							res.body.should.have.property('comments');
							res.body.comments.length.should.be.exactly(1);
							res.body.comments[0].should.have.property('text');
							res.body.comments[0].should.have.property('author');
						})
						.end(done);
				});
		});
	});

	describe('insert / POST', function () {
		before(cleanup);
		after(closeConnection);

		it('should create article and return article back with 201', function (done) {
			request(server)
				.post(v1RoutePath)
				.send(
				{
					title: 'My detailed article', slug: 'slug 789', content: 'Content of third article', author: 'Siv Jensen',
					comments: [{text: 'My comments are expensive', author: 'Erna Solberg',}]
				}
			)
				.expect('Content-Type', /json/)
				.expect(201)
				.expect(function (res) {
					res.headers.should.have.property('location');
					res.headers.location.should.be.equal(baseUrl + '/' + res.body._id);
					res.body.title.should.equal('My detailed article');
					res.body.should.have.property('_id');
					res.body.should.have.property('__v');
					res.body.should.have.property('slug');
					res.body.should.have.property('content');
					res.body.should.have.property('author');
					res.body.should.have.property('comments');
					res.body.comments.length.should.be.exactly(1);
					res.body.comments[0].should.have.property('text');
					res.body.comments[0].should.have.property('author');
				})
				.end(done);
		});
	});

	describe('update / PATCH', function () {
		before(cleanup);
		after(closeConnection);

		it('should partly update existing article and return back full doc', function (done) {
			Article.create(
				{
					title: 'My detailed article', slug: 'slug 789', content: 'Content of third article', author: 'Siv Jensen',
					comments: [{text: 'My comments are expensive', author: 'Erna Solberg',}]
				},
				function (err, article) {
					if (err) {
						throw err;
					}

					request(server)
						.patch(v1RoutePath + '/' + article.id)
						.send({title: 'New title', slug: 'New slug'})
						.expect('Content-Type', /json/)
						.expect(200)
						.expect(function (res) {
							res.headers.should.have.property('location');
							res.headers.location.should.be.equal(baseUrl + '/' + res.body._id);
							res.body.title.should.equal('New title');
							res.body.slug.should.equal('New slug');
							res.body.content.should.equal('Content of third article');
							res.body.author.should.equal('Siv Jensen');
							res.body.comments.length.should.be.exactly(1);
							res.body.comments[0].text.should.equal('My comments are expensive');
							res.body.comments[0].author.should.equal('Erna Solberg');
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

		it('should delete existing article', function (done) {
			Article.create(
				{
					title: 'Article to delete', slug: 'slug 789', content: 'Content of article to delete', author: 'Siv Jensen',
					comments: [{text: 'My comments are expensive', author: 'Erna Solberg',}]
				},
				function (err, article) {
					if (err) {
						throw err;
					}

					request(server)
						.del(v1RoutePath + '/' + article.id)
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
