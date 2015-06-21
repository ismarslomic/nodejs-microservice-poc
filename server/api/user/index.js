'use strict';

module.exports = function (server) {
	server.get('/user', function (req, res, next) {
		res.send('User API');
		return next();
	});
};
