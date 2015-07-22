/**
 * @author Gigi-DS
 */
//include gulp
var gulp = require('gulp');

//include plugins
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

//Coping and minify jquery
gulp.task('copy-min-jquery',function(){
	return gulp.src('bower_components/jquery/dist/jquery.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('scripts/'));
});

// Concatinate and Minize CSS
gulp.task('minifyCSS',function(){
	return gulp.src('css/*.css')
	.pipe(sourcemaps.init())
	.pipe(concat('style.css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifyCSS({compatibility: 'ie8'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('mod_files/css'));
});

//concatinate and minify js 
gulp.task("scripts",function(){
	return gulp.src("js/*.js")
	.pipe(sourcemaps.init())
	.pipe(concat('scripts.js'))
	.pipe(rename({suffix: ".min"}))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('mod_files/js'))
});

//default task
gulp.task('default',['copy-min-jquery' ,'minifyCSS', 'scripts']);
