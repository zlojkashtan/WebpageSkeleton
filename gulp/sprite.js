const cfg = require('../package.json').config;
const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const path = require('path');
const replace = require('gulp-replace');

gulp.task('svg', function () {
	return gulp.src(cfg.src.css_img + '/sprites-svg/*.svg')

		// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true,
			},
		}))

		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($, file) {
				var fname = path.basename(file.path, '.svg');
				if (!fname.match(/^(c-)/)) {
					$('[fill]').removeAttr('fill');
					console.log('Очистили:' + fname);
				}

				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},

			parserOptions: {
				xmlMode: true,
			},
		}))

		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))

		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../img/sprite.svg',
					render: {
						sass: {
							dest: '../helpers/_sprite-svg.sass',
							template: cfg.src.sass + '/templates/_sprite_template.scss',
						},
					},
				},
			},
		}))

		.pipe(gulp.dest(cfg.src.sass));
});
