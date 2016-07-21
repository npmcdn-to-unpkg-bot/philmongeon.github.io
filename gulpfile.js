var gulp = require('gulp');
var browserify = require('browserify');
var envify = require('envify');
var streamify  = require('gulp-streamify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var watchify = require('watchify');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var assign = require('lodash.assign');
// var autoprefixer = require('gulp-autoprefixer');
var php = require('gulp-connect-php');
var plumber = require('gulp-plumber');
var autoprefixer = require('autoprefixer-core');
var postcss = require('gulp-postcss');


gulp.task('serve', ['js', 'sass'], function() {
  
  var bundle = createBundle();
  
  bundle.on('update', function() { execBundle(bundle); });
  
  bundle.on('log', gutil.log);

  gulp.watch([
    './assets/stylesheets/src/*.scss',
    './assets/stylesheets/src/*/*.scss',
  ], ['sass']);

  gulp.watch([
    './assets/js/src/main.js'
  ], ['js']);

  gulp.watch([
    './assets/js/dist/*.js',
    './*.php', './*/*.php'
  ]).on('change', browserSync.reload);

  // execBundle(bundle);

});

gulp.task('php', function() {
  php.server({ base: './', port: 8020, keepalive: true});
});

gulp.task('browser-sync', ['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8020',
        port: 1234,
        open: true,
        notify: false
    });
});

gulp.task('release', ['js', 'sass'], function() {
  console.log('Build complete.');
});

gulp.task('js', function() {
  var bundle = createBundle();
  execBundle(bundle);
});

gulp.task('sass', function() {
  return gulp.src(['./assets/stylesheets/src/main.scss'])
    .pipe(sass())
    .on('error', gutil.log.bind(gutil, 'Sass Error'))
    // .pipe(autoprefixer({
    //   browsers: ['> 5%'],
    //   cascade: false
    // }))
    .pipe(postcss([ autoprefixer({ browsers: ["> 0%"] }) ]))
    .pipe(gulp.dest('./assets/stylesheets/dist/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['serve', 'browser-sync']);

function createBundle() {
  var customOpts = {
    entries: [
      './assets/js/src/main.js'
    ],
    debug: false,
    transform: [envify]
  };

  var opts = assign({}, watchify.args, customOpts);
  var bundle = watchify(browserify(opts));

  return bundle;
}

function execBundle(b) {
  return b
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    // .pipe(streamify(uglify({ mangle: false })))
    .pipe(gulp.dest('./assets/js/dist/'));
}