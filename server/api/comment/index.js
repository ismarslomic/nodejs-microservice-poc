'use strict';

module.exports = function (server) {
	server.get('/comment', function (req, res, next) {
		res.send('Comment API');
		return next();
	});
};
