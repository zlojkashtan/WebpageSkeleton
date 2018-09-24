const cfg = require('../package.json').config;
const changed = require('gulp-changed');
const frontMatter = require('gulp-front-matter');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const nunjucksRender = require('gulp-nunjucks-render');
const plumber = require('gulp-plumber');
const prettify = require('gulp-prettify');
const htmlmin = require('gulp-htmlmin');

var onError = function (err) {
	console.log(err);
	this.emit('end');
};

const dest = cfg.dev ? cfg.build.html : cfg.web.html;

function renderHtml(onlyChanged) {
	nunjucksRender.nunjucks.configure({
		watch: false,
		trimBlocks: true,
		lstripBlocks: false
	});

	return gulp
		.src([cfg.src.templates + '/**/[^_]*.html'])
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(gulpif(onlyChanged, changed(cfg.build.html)))
		.pipe(frontMatter({
			property: 'data'
		}))
		.pipe(nunjucksRender({
			path: [cfg.src.templates]
		}))
		.pipe(prettify({
			indent_size: 2,
			wrap_attributes: 'auto', // 'force'
			preserve_newlines: false,
			// unformatted: [],
			end_with_newline: true
		}))
		// .pipe(htmlmin({
		// 	collapseWhitespace: true,
		// 	removeComments: true
		// }))
		.pipe(gulp.dest(dest));
}

gulp.task('nunjucks', function () {
	return renderHtml();
});

gulp.task('nunjucks:changed', function () {
	return renderHtml(true);
});
