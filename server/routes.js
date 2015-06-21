'use strict';

module.exports = function (server) {
	require('./api/article')(server);
	require('./api/comment')(server);
	require('./api/user')(server);
};
