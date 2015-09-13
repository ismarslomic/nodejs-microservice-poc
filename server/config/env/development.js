'use strict';

process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'nmp-dev';
var mongodbIP = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
var mongodbPort = process.env.MONGO_PORT_27017_TCP_PORT || 27017;

module.exports = {
	mongo: {
		uri: 'mongodb://' + mongodbIP + ':' + mongodbPort + '/' + process.env.DATABASE_NAME
	},
	seedDB: false
};
