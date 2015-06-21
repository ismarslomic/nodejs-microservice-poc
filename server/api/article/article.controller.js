'use strict';

exports = module.exports = ArticleController;

function ArticleController() {
}

ArticleController.prototype = {
	constructor: ArticleController,

	getAllArticles: function (req, res, next) {
		res.send('All articles service');
		return next();
	}
};
