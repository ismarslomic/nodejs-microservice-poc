/*
 * Configurable paths and config parameters
 */
'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '../../');
var conf = {
	dirs: {
		build: 'build',
		docs: 'docs',
		coverage: 'coverage'
	},
	src: {
		server: {
			js: [
				'server/**/*.js',
				'!server/**/*.spec.js'
			],
			unitTests: [
				'server/**/*.spec.js'
			]
		}
	},
	options: {
		mocha: {
			ui: 'bdd',
			reporter: 'spec'
		},
		jshint: {
			server: {
				src: 'server/.jshintrc',
				test: 'server/.jshintrc-spec'
			}
		},
		jscs: {
			configPath: path.join(rootPath, '.jscsrc')
		},
	}
};

module.exports = conf;
