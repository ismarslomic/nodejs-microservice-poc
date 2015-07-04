/*
 * Tasks related to development:
 * watch, ...
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../config');
var nodemon = require('gulp-nodemon');

/**
 * watch task`
 * Watch on javascript files, tests and sass files
 */
gulp.task('watch', function () {
	nodemon({
		script: path.join(conf.dirs.bin, 'server.js'),
		ext: 'js',
		env: {
			'NODE_ENV': 'development'
		}
	})
		.on('restart', function () {
			console.log('Server restarted!');
		});
});
