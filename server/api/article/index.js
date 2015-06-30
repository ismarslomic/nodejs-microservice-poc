'use strict';
var restifyMongoose = require('restify-mongoose');
var Article = require('./article.model');

module.exports = ArticleAPI;

var url;

function ArticleAPI(server, baseUrl) {
	this.url = server.url + baseUrl + '/articles';

	var options = {
		pageSize: 5,
		baseUrl: server.url
	};

	var articles = restifyMongoose(Article.model, options);

	server.get({path: this.url, version: '1.0.0'}, articles.query());
	server.get({path: this.url + '/:id', version: '1.0.0'}, articles.detail());
	server.post({path: this.url, version: '1.0.0'}, articles.insert());
	server.patch({path: this.url + '/:id', version: '1.0.0'}, articles.update());
	server.del({path: this.url + '/:id', version: '1.0.0'}, articles.remove());
}

ArticleAPI.prototype = {
	constructor: ArticleAPI,
	url: url
}

