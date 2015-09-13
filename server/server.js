'use strict';

// Set default node environment to development

var minimist = require('minimist');

// parse optional arguments and set environment variables

// all known options that can be passed by --option
// and their defaults
var knownOptions = {
	string: ['env'],
	default: {
		env: process.env.NODE_ENV || 'test'
	}
};

var options = minimist(process.argv.slice(2), knownOptions);
process.env.NODE_ENV = options.env;

var config = require('./config/index');
var db = require('./config/mongoose');
var restify = require('restify');
var bunyan = require('bunyan');
var PrettyStream = require('bunyan-prettystream');
var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var logger = bunyan.createLogger({
	name: 'server',
	streams: [{
		level: 'info',
		type: 'raw',
		stream: prettyStdOut
	}]
});

/*
 See documentation at http://restifyjs.com/#creating-a-server
 Name: 			By default, this will be set in the Server response header, default is restify
 Log: 			You can optionally pass in a bunyan instance; not required
 */
var server = restify.createServer({name: 'microservice-server', log: logger});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// audit logging
server.on('after', restify.auditLogger({
	log: logger
}));

// load all API routes
require('./api')(server);

exports.server = server;
exports.server.start = serverStart;

function serverStart() {
	db.connect();
	server.listen(config.port, function () {
		logger.info('%s listening at %s in %s mode', server.name, server.url, process.env.NODE_ENV);
	});
}
