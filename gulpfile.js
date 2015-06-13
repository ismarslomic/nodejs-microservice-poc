'use strict';

var gulp   = require('gulp'),
  bump   = require('gulp-bump'),
  istanbul   = require('gulp-istanbul'),
  jscs   = require('gulp-jscs'),
  jshint   = require('gulp-jshint'),
  mocha   = require('gulp-mocha'),
  plumber   = require('gulp-plumber'),
  util   = require('gulp-util'),
  del   = require('del');

var conf = {
  dirs: {
    docs: 'docs',
    coverage: 'coverage'
  }
};

/**
 * Clean task
 * Removes the docs and coverage folders
 */
gulp.task('clean', function () {
  return del([conf.dirs.docs, conf.dirs.coverage]);
});

var testFiles = ['./test/**/*.js', '!test/{temp,fixtures,temp/**,fixtures/**}'];

var paths = {
  lint: ['./gulpfile.js', './src/**/*.js'],
  watch: ['./gulpfile.js', './src/**'].concat(testFiles),
  tests: testFiles,
  source: ['./src/**/*.js']
};

var plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(jshint('.jshintrc'))
    .pipe(plumber(plumberConf))
    .pipe(jscs())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(paths.tests)
        .pipe(plumber(plumberConf))
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});

gulp.task('bump', ['test'], function () {
  var bumpType = util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, function() {
    // use child process, otherwise will get error.
    require('child_process').spawn('gulp', ['test'], {
      env: process.env,
      cwd: process.cwd(),
      stdio: [
        process.stdin,
        process.stdout,
        process.stderr
      ]
    });
  });
});

gulp.task('test', ['lint', 'istanbul']);

gulp.task('release', ['bump']);

gulp.task('default', ['watch']);
