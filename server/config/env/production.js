'use strict';

process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'nmp';

module.exports = {
	ip: process.env.ip || undefined,
	port: process.env.PORT || 3000,
	publicDir: 'public',
	mongo: {
		uri: 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' +
		process.env.MONGO_PORT_27017_TCP_PORT + "/" +
		process.env.DATABASE_NAME
	},
	seedDB: false
};
