'use strict';
var restify = require('restify');
var restifyMongoose = require('restify-mongoose');
var Article = require('./article.model');

module.exports = function (server) {
	var options = {
		pageSize: 5,
		baseUrl: 'http://localhost:8080'
	};
	var articles = restifyMongoose(Article.model, options);
	var v1RoutePath = '/api/v1/articles';

	server.get({path: v1RoutePath, version: '1.0.0'}, articles.query());
	server.get({path: v1RoutePath + '/:id', version: '1.0.0'}, articles.detail());
	server.post({path: v1RoutePath, version: '1.0.0'}, articles.insert());
	server.patch({path: v1RoutePath + '/:id', version: '1.0.0'}, articles.update());
	server.del({path: v1RoutePath + '/:id', version: '1.0.0'}, articles.remove());
};
