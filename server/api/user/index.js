'use strict';
var restifyMongoose = require('restify-mongoose');
var User = require('./user.model');

module.exports = UserAPI;

var url;

function UserAPI(server, baseUrl) {
	this.url = server.url + baseUrl + '/users';

	var options = {
		pageSize: 5,
		baseUrl: server.url
	};

	var users = restifyMongoose(User.model, options);

	server.get({path: this.url, version: '1.0.0'}, users.query());
	server.get({path: this.url + '/:id', version: '1.0.0'}, users.detail());
	server.post({path: this.url, version: '1.0.0'}, users.insert());
	server.patch({path: this.url + '/:id', version: '1.0.0'}, users.update());
	server.del({path: this.url + '/:id', version: '1.0.0'}, users.remove());
}

UserAPI.prototype = {
	constructor: UserAPI,
	url: this.url
}
