/*
 * Tasks related to development:
 * watch, ...
 */
'use strict';

var gulp = require('gulp');
var conf = require('../config');

/**
 * watch task`
 * Watch on javascript files, tests and sass files
 */
gulp.task('watch', function () {
	process.env.NODE_ENV = 'development'
	gulp.watch("**/*.js", ['test']);
});
