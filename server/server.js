'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('./config/index');
require('./config/mongoose');
var restify = require('restify');

// using bunyan logger since restify is supporting it
var bunyan = require('bunyan');

// pretty printing capabilities
var PrettyStream = require('bunyan-prettystream');

var prettyStdOut = new PrettyStream();

prettyStdOut.pipe(process.stdout);

var logger = bunyan.createLogger({
	name: 'server',
	streams: [{
		level: 'error',
		type: 'raw',
		stream: prettyStdOut
	}]
});

/*
 See documentation at http://restifyjs.com/#creating-a-server
 Name: 			By default, this will be set in the Server response header, default is restify
 Version: 	A default version to set for all routes
 Log: 			You can optionally pass in a bunyan instance; not required
 */
var server = restify.createServer({
	name: 'microservice-server',
	version: '1.0.0',
	log: logger
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// audit logging
server.on('after', restify.auditLogger({
	log: logger
}));

require('./api')(server);

server.listen(8080, 'localhost', function () {
	logger.info('%s listening at %s in %s mode', server.name, server.url, process.env.NODE_ENV);
});

module.exports = server;
