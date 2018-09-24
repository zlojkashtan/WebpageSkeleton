// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

const cfg = require('../package.json').config;
const gulp = require('gulp');


// --------------------------------------------------------------------
// Task: FONTS
// --------------------------------------------------------------------

const dest = cfg.dev ? cfg.build.fonts : cfg.web.fonts;

gulp.task('fonts', function () {
	return gulp.src(cfg.src.fonts + '/*')
		.pipe(gulp.dest(dest));
});
