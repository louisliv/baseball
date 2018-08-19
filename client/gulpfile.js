'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/app/styles.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./static/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/app/**/**.scss', ['sass']);
});