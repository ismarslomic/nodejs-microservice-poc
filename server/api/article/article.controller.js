'use strict';
var Article = require('./article.model').model;
// using bunyan logger since restify is supporting it
var bunyan = require('bunyan');

// pretty printing capabilities
var PrettyStream = require('bunyan-prettystream');

var prettyStdOut = new PrettyStream();

prettyStdOut.pipe(process.stdout);

var logger = bunyan.createLogger({
	name: 'article.controller',
	streams: [{
		level: 'debug',
		type: 'raw',
		stream: prettyStdOut
	}]
});


exports = module.exports = ArticleController;

function ArticleController() {
}

ArticleController.prototype = {
	constructor: ArticleController,

	getAllArticles: function (req, res, next) {
		res.send('All articles service');
		return next();
	},

	createArticle: function (req, res, next) {
		var parseBody = JSON.parse(req.body);

		Article.create(parseBody, function (err, article) {
			if (err) {
				logger.info("createArticle() error: %s", err);
				res.status(500);
				res.json({
					type: false,
					data: "Error occured: " + err
				})
			} else {
				res.json({
					type: true,
					data: article
				})
			}
		});
	}

};
