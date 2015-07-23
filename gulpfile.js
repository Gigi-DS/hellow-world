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
var browserSync = require('browser-sync');

gulp.task('copy-min-jquery',function(){
	return gulp.src('bower_components/jquery/dist/jquery.js')
	.pipe(sourcemaps.init())
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('scripts/plugins'));
});

// Concatinate and Minize CSS
gulp.task('minifyCSS',function(){
	return gulp.src('content/*.css')
	.pipe(sourcemaps.init())
	.pipe(concat('style.css'))
	.pipe(gulp.dest('content'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifyCSS({compatibility: 'ie8'}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('content'));
});

//concatinate and minify js 
gulp.task('compress', function() {
  return gulp.src('scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('scripts'));
});

// Static Server + watching scss/html files
gulp.task('serve',['minifyCSS', 'compress'], function() {

    browserSync.init({
        server: {
        	baseDir: "./",
        	index: "index.html"
        }
    });
    gulp.watch("content/*.css", ['minifyCSS']);
    gulp.watch("./content/style.min.css").on('change', browserSync.reload);
    gulp.watch("scripts/*.js", ['compress']);
    gulp.watch("./scripts/scripts.min.js").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


    
//default task
gulp.task('default',['copy-min-jquery', 'minifyCSS', 'compress', 'serve' ]);