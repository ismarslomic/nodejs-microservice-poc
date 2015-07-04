/**
 * Connect to the database and add connection handlers
 * @module {MongooseConnection} config:mongoose
 * @requires {@link config}
 */
'use strict';

var mongoose = require('mongoose');
var config = require('./index');
// using bunyan logger since restify is supporting it
var bunyan = require('bunyan');
var connection;

// pretty printing capabilities
var PrettyStream = require('bunyan-prettystream');

var prettyStdOut = new PrettyStream();

prettyStdOut.pipe(process.stdout);

var logger = bunyan.createLogger({
	name: 'mongoose',
	streams: [{
		level: 'debug',
		type: 'raw',
		stream: prettyStdOut
	}]
});

var connect = function (cb) {
	// connect to mongodb
	connection = mongoose.connect(config.mongo.uri, config.mongo.options);

	// reconnect if connection is disconnected or disconnecting
	// throw any errors that occur while reconnecting
	if (connection.state === 0 || connection.state === 3) {
		connection.open(function connectionReconnect(err) {
			if (err) {
				logger.error('Error while reinitializing the database connection: %s', err);
				throw err; // throw error to stop application launch
			}
			logger.info('Database Connection reopened');
			cb();
		});
	}
	cb();
}

var disconnect = function (cb) {
	mongoose.connection.close(function () {
		cb();
	});
}

module.exports.connect = connect;
module.exports.disconnect = disconnect;


// register global database error handler
mongoose.connection.on('error', function connectionError(err) {
	logger.error('Database Error: ', err);
});

// register the connection handler once only
mongoose.connection.once('open', function connectionOpen() {
	logger.info('Database connection open at %s', config.mongo.uri);

	// Populate DB with sample data if the seedDB is set to true for this env
	if (config.seedDB) {
		logger.info('Seeding the database...')
		require('./seed');
	}
});

mongoose.connection.on('reconnected', function () {
	logger.info('MongoDB reconnected!');
});
