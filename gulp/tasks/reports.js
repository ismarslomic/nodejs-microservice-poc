/*
 * Tasks related to report generation:
 * generate reports and documentation ...
 */
'use strict';

var gulp = require('gulp');
var path = require('path');
var istanbul = require('gulp-istanbul');
var utils = require('gulp-util');
var jsdoc = require('gulp-jsdoc');
var coveralls = require('gulp-coveralls');
var del = require('del');
var conf = require('../config');
var tests = require('./tests.js'); // require tests for reuse of test functions

/**
 * coverage task
 * Run code coverage on server files
 */
gulp.task('coverage', ['clean:coverage'], function (cb) {
	gulp.src(conf.src.server.js)
		.pipe(istanbul()) // Covering files
		.pipe(istanbul.hookRequire()) // Force `require` to return covered files
		.on('finish', function () {
			tests.testFn(conf.src.server.unitTests, false)
				.pipe(istanbul.writeReports({
					dir: path.join(conf.dirs.build, conf.dirs.coverage),
					reporters: ['lcov']
				}))
				.on('error', utils.log)
				.on('end', cb);
		})
		.on('error', utils.log);
});

gulp.task('coveralls', ['coverage'], function (cb) {
	return gulp.src(path.join(conf.dirs.build, conf.dirs.coverage, 'lcov.info'))
		.pipe(coveralls());
});

/**
 * docs task
 * Generate the JavaScript documentation by use of jsdoc
 * old: //rm -rf docs && ./node_modules/.bin/jsdoc -c ./jsdoc.json ./README.md && echo 'code{padding: 2px 4px;font-size: 90%;color:#c7254e;background-color:#f9f2f4;border-radius:4px;}' >> ./docs/styles/jsdoc-default.css
 */
gulp.task('docs', ['clean:docs'], function () {
	var docPath = path.join(conf.dirs.build, conf.dirs.docs);
	var docSource = conf.src.server.js.concat("README.md");
	return gulp.src(docSource)
		.pipe(jsdoc(docPath))
		.on('error', utils.log);
});

/**
 * Clean docs task
 * Removes the docs folder
 */
gulp.task('clean:docs', function () {
	return del(path.join(conf.dirs.build, conf.dirs.docs));
});

/**
 * Clean coverage task
 * Removes the coverage folder
 */
gulp.task('clean:coverage', function () {
	return del(path.join(conf.dirs.build, conf.dirs.coverage));
});

gulp.task('reports', ['coveralls', 'docs']);
