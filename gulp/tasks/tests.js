/*
 * Tasks performing tests on code, style and functionality
 */
'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var jscs = require('gulp-jscs');
var utils = require('gulp-util');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var notify = require('gulp-notify');
var map = require('map-stream');
var conf = require('../config');

module.exports = {
	jshintFn: jshintFn,
	testFn: testFn,
	jscsFn: jscsFn
};

/**
 * Custom linting reporter used for error notify
 */
var jsHintErrorReporter = map(function (file, cb) {
	if (!file.jshint.success) {
		file.pipe(notify({
			'message': "Check console for more details",
			'title': "Gulp failed linting code",
			'sound': true
		}));
	}
	cb(null, file);
});

/**
 * Pipe jshint tests
 * @param src     glob of jshint files to run
 * @param config  defining which jshintrc files to use
 */
function jshintFn(src, config) {
	return gulp.src(src)
		.pipe(jshint(config))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))
		.pipe(jsHintErrorReporter);
};

/**
 * Pipe mocha tests
 * @param src     glob of test files to run
 * @param reporter the mocha reporter to use
 */
function testFn(src, reporter) {
	reporter = reporter && {reporter: reporter} || {};
	return gulp.src(src, {read: false})
		.pipe(mocha(_.defaults(reporter, conf.options.mocha)))
		.on('error', utils.log);
};

/**
 * Pipe jscs
 * @param src     glob of source files to check
 * @param config  the jscs config object to use
 */
function jscsFn(src, config) {
	return gulp.src(src)
		.pipe(jscs(config))
		.on('error', utils.log);
};

/**
 * jshint:server tasks
 * Lint server JavaScript source files
 */
gulp.task('jshint:server', function () {
	return jshintFn(
		conf.src.server.js,
		conf.options.jshint.server.src);
});

/**
 * jshint:server tasks
 * Lint server JavaScript source files
 */
gulp.task('jshint:server:exitIfError', function () {
	return jshintFn(
		conf.src.server.js,
		conf.options.jshint.server.src);
});

/**
 * jshint:test:server tasks
 * Lint server JavaScript unit
 */
gulp.task('jshint:test:server', function () {
	return jshintFn(
		conf.src.server.unitTests,
		conf.options.jshint.server.test);
});

/**
 * test task
 * Run server unit tests
 */
gulp.task('unit:server', function () {
	return testFn(conf.src.server.unitTests, null);
});

/**
 * codestyle task for server files
 * Run js code style tests
 */
gulp.task('codestyle:server', function () {
	return jscsFn(
		conf.src.server.js.concat(conf.src.server.unitTests),
		conf.options.jscs);
});

gulp.task('jshint', ['jshint:server', 'jshint:test:server']);

gulp.task('unit', ['unit:server']);

gulp.task('codestyle', ['codestyle:server']);

gulp.task('lint', ['jshint', 'codestyle']);

gulp.task('test', ['lint', 'unit']);

