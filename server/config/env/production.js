'use strict';

process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'nmp';
var mongodbIP = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
var mongodbPort = process.env.MONGO_PORT_27017_TCP_PORT || 27017;

module.exports = {
	ip: process.env.ip || undefined,
	port: process.env.PORT || 3000,
	publicDir: 'public',
	mongo: {
		uri: 'mongodb://' + mongodbIP + ':' + mongodbPort + '/' + process.env.DATABASE_NAME
	},
	seedDB: false
};
