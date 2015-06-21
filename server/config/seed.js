/*
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';

var User = require('../api/user/user.model').model;

/*
// Insert some data needed to bootstrap or init the application

if ('production' === env) {
	// Insert some data needed to init the production instance only, update a version info ...
}
*/

/*
 * Insert dummy data to test the application
 */
exports.users = [{
	provider: 'local',
	name: 'Test User',
	password: 'password',
	lastAuthenticated: new Date(2015, 5, 1, 18, 3),
	avatarUrl: 'svg-1',
	email: 'testuser@gmail.com',
	active: true
}, {
	provider: 'local',
	role: 'admin',
	name: 'Admin',
	password: 'password',
	active: true,
	lastAuthenticated: new Date(2015, 2, 4, 14, 23),
	avatarUrl: 'svg-9',
	email: 'admin@gmail.com'
}, {
	provider: 'local',
	role: 'root',
	name: 'Root',
	password: 'password',
	active: true,
	lastAuthenticated: new Date(2015, 3, 15, 12, 35),
	avatarUrl: 'svg-3',
	email: 'root@gmail.com'
}];

if ('development' === env) {
	console.log('Populating test and development data ...');

	User.find({}).remove(function () {
		User.create(exports.users, function (err) {
			if (err) {
				console.error('Error while populating users: %s', err);
			} else {
				console.log('finished populating users');
			}
		});
	});
}
