/**
 * Usage
 * gulp [task]  --env development
 */
'use strict';

var gulp = require('gulp');

var minimist = require('minimist');
var requireDir = require('require-dir');

// all known options that can be passed by --option
// and their defaults
var knownOptions = {
	string: ['env'],
	default: {
		env: process.env.NODE_ENV || 'test'
	}
};

// parse optional arguments and set environment variables
var options = minimist(process.argv.slice(2), knownOptions);
process.env.NODE_ENV = options.env;

// include tasks
requireDir('./gulp/tasks');

/**
 * Grouped task definitions
 */
gulp.task('serve', ['jshint', 'codestyle', 'unit', 'watch']);

gulp.task('build:all', ['test']);

gulp.task('default', ['build:all']);
