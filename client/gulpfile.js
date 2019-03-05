'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jsDest = './static/js'
 
gulp.task('sass', function () {
  return gulp.src('./src/app/styles.scss')
    .pipe(sass({
      includePaths: ['static', 'src/app']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./static/css'))
    .pipe(livereload());
});

gulp.task('build-js', function () {
  return gulp.src('./src/app/**/**.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(jsDest))
    .pipe(livereload());
});

gulp.task('reload-html', function () {
  return gulp.src('./src/app/**/**.html')
    .pipe(livereload());
})

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/app/**/**.scss', ['sass'])
  gulp.watch('./src/app/**/**.js', ['build-js'])
  gulp.watch('./src/app/**/**.html', ['reload-html']);
});
