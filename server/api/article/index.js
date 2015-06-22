'use strict';

var ArticleController = require('./article.controller');

module.exports = function (server) {
	var ctrl = new ArticleController();

	// Get all articles
	server.get('/articles', function (req, res, next) {
		ctrl.getAllArticles(req, res, next);
	});

	// Create new article
	server.post('/articles', function (req, res, next) {
		ctrl.createArticle(req, res, next);
	});
};
