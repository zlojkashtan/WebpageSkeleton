// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

const cfg = require('../package.json').config;
const gulp = require('gulp');
const concat = require('gulp-concat');
const header = require('gulp-header');
const jshint = require('gulp-jshint');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------

var onError = function (err) {
	console.log(err);
	this.emit('end');
};

const dest = cfg.dev ? cfg.build.js : cfg.web.js;

// --------------------------------------------------------------------
// Task: JS-LIB
// --------------------------------------------------------------------

var srcs = [
	cfg.src.jslibs + '/jQuery/jquery-3.3.1.js',
	//   cfg.src.jslibs + '/GreenSock/src/uncompressed/TweenMax.js'
];

gulp.task('js:lib', function () {
	return gulp.src(srcs)
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(concat('lib.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(dest));
});

// --------------------------------------------------------------------
// Task: JS
// --------------------------------------------------------------------

gulp.task('js', function () {
	return gulp.src(cfg.src.js + '/**/*.*')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.init())
		.pipe(header(cfg.banner.join('\n')))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest(dest));
});
