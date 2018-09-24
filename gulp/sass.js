// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

const cfg = require('../package.json').config;
const gulp = require('gulp');
const gcmq = require('gulp-group-css-media-queries');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const header = require('gulp-header');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------

var onError = function (err) {
	console.log(err);
	this.emit('end');
};

var srcs = [
	cfg.src.sass + '/**/*.{scss,sass}'
];

// --------------------------------------------------------------------
// Task: Sass
// --------------------------------------------------------------------

const dest = cfg.dev ? cfg.build.css : cfg.web.css;

gulp.task('sass', function () {
	return gulp.src(srcs)
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(sass())
		.pipe(prefixer('last 2 versions'))
		.pipe(concat('styles.min.css'))
		.pipe(gcmq())
		.pipe(cleanCss())
		.pipe(header(cfg.banner.join('\n')))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest));
});
