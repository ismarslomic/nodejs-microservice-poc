'use strict';

var ArticleController = require('./article.controller');

module.exports = function (server) {
	var ctrl = new ArticleController();

	server.get('/article', function (req, res, next) {
		ctrl.getAllArticles(req, res, next);
	});
};
