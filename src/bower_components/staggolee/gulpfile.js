var gulp = require('gulp');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var size = require('gulp-filesize');
var gzip = require('gulp-gzip');

/**
 * Craete the placeholder files
 */
gulp.task('default', function(){
	return gulp.src('./src/staggolee.scss')
		.pipe(replace(/\.(?!(["\./]))/g, '%'))
		.pipe(rename('./src/_staggolee-placeholder.scss'))
		.pipe(gulp.dest('./'));
});


gulp.task('build', function(){
	gulp.src('./src/staggolee.scss')
		.pipe(sass())
		.pipe(size())
		.pipe(gulp.dest('./src/'));
})