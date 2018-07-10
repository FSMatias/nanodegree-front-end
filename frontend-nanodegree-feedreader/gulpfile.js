var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', function () {
	
	gulp.watch('./index.html').on('change', browserSync.reload);
	gulp.watch('./jasmine/spec/*.js').on('change', browserSync.reload);

	browserSync.init({
		server: './'
	});
});
