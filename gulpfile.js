const gulp = require('gulp'); 
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create(); 
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mediaquery = require('postcss-combine-media-query');
const htmlMinify = require('html-minifier');

function html() {
    return gulp.src('src/*.html')
            .pipe(plumber())
            .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));
  }

  function css() {
    const plugins = [
      autoprefixer(),
      mediaquery()
    ];
    return gulp.src(['src/**/globals.css', 
                     'src/**/fonts.css', 
                     'src/**/variables.css', 
                     'src/**/style.css',
                     'src/**/**/header-decor.css',
                     'src/**/**/header__theme-menu.css',
                     'src/**/**/header__text_block.css',
                     'src/**/**/article__content.css',
                     'src/**/**/article.css',
                     'src/**/**/advice__list.css',
                     'src/**/**/gallery.css',
                     'src/**/**/footer.css',
                     'src/**/dark.css',
                     'src/**/light.css'])
            .pipe(plumber())
            .pipe(concat('bundle.css'))
            .pipe(postcss(plugins))
            .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));
  }

  function scripts() {
    return gulp.src('src/scripts/*.js')
            .pipe(plumber())
            .pipe(gulp.dest('dist/scripts/'))
            .pipe(browserSync.reload({stream: true}));
  }

  function images() {
    return gulp.src('src/images/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
  }
  
  function fonts() {
    return gulp.src('src/fonts/*.woff')
            .pipe(gulp.dest('dist/fonts/'))
            .pipe(browserSync.reload({stream: true}));
  }

  function clean() {
    return del('dist');
  }

  function watchFiles() {
    gulp.watch(['src/*.html'], html);
    gulp.watch(['src/styles/*.css', 'src/styles/header/*.css',  'src/styles/content/*.css',  'src/styles/footer/*.css'], css);
    gulp.watch(['src/fonts/*.woff'], fonts);
    gulp.watch(['src/images/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  }

  function serve() {
    browserSync.init({
      server: {
        baseDir: './dist'
      }
    });
  } 

exports.html = html
exports.css = css;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;

const build = gulp.series(clean, gulp.parallel(html, css, scripts, images, fonts));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.build = build;
exports.watchapp = watchapp; 

exports.default = watchapp;