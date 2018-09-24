// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

const cfg = require('../package.json').config;
const gulp = require('gulp');
const image = require('gulp-image');
const spritesmith = require('gulp.spritesmith');


// --------------------------------------------------------------------
// Task: Image
// --------------------------------------------------------------------

const dest = cfg.dev ? cfg.build.img : cfg.web.img;

gulp.task('img', function () {
	return gulp.src(cfg.src.img + '/*')
		.pipe(image({
			pngquant: true,
			optipng: false,
			zopflipng: true,
			jpegRecompress: false,
			mozjpeg: true,
			guetzli: false,
			gifsicle: true,
			svgo: true,
			concurrent: 10,
			quiet: false // defaults to false
		}))
		.pipe(gulp.dest(dest));
});

// --------------------------------------------------------------------
// Task: CSS Image
// --------------------------------------------------------------------

const destCss = cfg.dev ? cfg.build.css_img : cfg.web.css_img;

gulp.task('css_img', function () {
	return gulp.src(cfg.src.css_img + '/*')
		.pipe(image({
			pngquant: true,
			optipng: false,
			zopflipng: true,
			jpegRecompress: false,
			mozjpeg: true,
			guetzli: false,
			gifsicle: true,
			svgo: true,
			concurrent: 10,
			quiet: true // defaults to false
		}))
		.pipe(gulp.dest(destCss));
});


// --------------------------------------------------------------------
// Task: SPRITE
// --------------------------------------------------------------------

gulp.task('sprite', function () {
	var spriteData = gulp.src(cfg.src.css_img + '/sprites/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprite.sass',
			imgPath: 'img/sprite.png',
			cssVarMap: function (sprite) {
				sprite.name = 'sp-' + sprite.name;
			}
		}));
	spriteData.img.pipe(gulp.dest(cfg.src.css_img));
	spriteData.css.pipe(gulp.dest(cfg.src.sass));
});
