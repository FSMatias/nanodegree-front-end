'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('default', defaultTask);

function defaultTask(done) {
  browserSyncTask();
  // Call styleTask when changes happens on scss files
  gulp.watch('sass/**/*.scss', stylesTask);
  // Reload on any change made on html files
  gulp.watch("*.html").on('change', browserSync.reload);
  // Reload on any change made on js files
  gulp.watch("js/*.js").on('change', browserSync.reload);
  done();
}

function stylesTask() {
    // Regenerate css files based on the changes made on scss files 
    return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

// Static server
function browserSyncTask() {
    browserSync.init({
        server: "./"
    });
}
