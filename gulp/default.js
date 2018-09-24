// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

const cfg = require('../package.json').config;
const gulp = require('gulp');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');

// --------------------------------------------------------------------
// Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function () {
	if (cfg.dev === true) {
		browserSync.init({
			//proxy: 'localhost',
			server: 'build/',
			plugins: [require('bs-console-qrcode')],
			ghostMode: {
				clicks: true,
				forms: true,
				scroll: true
			}
		});
		gulp.watch(cfg.src.css_img + '/sprites/*.png', ['sprite']).on('change', browserSync.reload);
		gulp.watch(cfg.src.sass + '/**/*.{scss,sass}', ['sass']).on('change', browserSync.reload);
		gulp.watch(cfg.src.css_img + '/*', ['css_img']).on('change', browserSync.reload);
		gulp.watch(cfg.src.js_lib + '/**/*.*', ['js:lib']).on('change', browserSync.reload);
		gulp.watch(cfg.src.js + '/**/*.*', ['js']).on('change', browserSync.reload);
		gulp.watch(cfg.src.img + '/*', ['img']).on('change', browserSync.reload);
		gulp.watch(cfg.src.fonts + '/*', ['fonts']).on('change', browserSync.reload);
		gulp.watch([cfg.src.templates + '/**/[^_]*.html'], ['nunjucks:changed']).on('change', browserSync.reload);
		gulp.watch([cfg.src.templates + '/**/_*.html'], ['nunjucks']).on('change', browserSync.reload);
	} else {
		gulp.watch(cfg.src.css_img + '/sprites/*.png', ['sprite']);
		gulp.watch(cfg.src.sass + '/**/*.{scss,sass}', ['sass:web']);
		gulp.watch(cfg.src.css_img + '/*', ['css_img:web']);
		gulp.watch(cfg.src.js + '/**/*.*', ['js:web']);
		gulp.watch(cfg.src.img + '/*', ['img:web']);
		gulp.watch(cfg.src.fonts + '/*', ['fonts:web']);
	}
});

// --------------------------------------------------------------------
// Task: OK
// --------------------------------------------------------------------

gulp.task('ok', function () {
	gulp.src('').pipe(
		notify({
			title: 'Все готово сер!',
			message: 'Поехали!',
			wait: true
		})
	);
});

// --------------------------------------------------------------------
// Task: DEFAULT
// --------------------------------------------------------------------

gulp.task('default', ['fonts', 'css_img', 'img', 'sprite', 'sass', 'js:lib', 'js', 'nunjucks', 'watch', 'ok']);
