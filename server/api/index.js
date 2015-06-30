'use strict';

module.exports = function (server) {
	var v1RoutePath = '/api/v1';

	// Load the supported endpoints
	var ArticlesAPI = require('./article');
	var articlesAPI = new ArticlesAPI(server, v1RoutePath);

	var UsersAPI = require('./user');
	var usersAPI = new UsersAPI(server, v1RoutePath);

	// You can issue a GET request to the root endpoint to get all the endpoint categories that the API supports
	server.get(
		{
			path: v1RoutePath,
			version: '1.0.0'
		},
		function (req, res, next) {
			res.json(
				{
					articleUrls: articlesAPI.url,
					userUrls: usersAPI.url
				}
			)
		});
};
