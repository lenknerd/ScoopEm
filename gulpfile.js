/* gulpfile.js
 * Script for build tasks publishing this site
 * David Lenkner, c. 2017
 */

// Include gulp and packages
var gulp = require('gulp');
var concat = require('gulp-concat');
var copydir = require('copy-dir');

/* Presently, basically the only tasks are to concatenate stuff and send
 * everything to the public directory.  Concatenation helps load faster.
 * Later we should be a bit more complete and minify, etc.
 */
gulp.task('default', [
	'css',
	'js',
	'html',
	'php',
	'vendor',
	'fonts',
	'img',
	'index'
])

// Where everything is actually read by Apache
pubRoot = '/var/www/lenknerd.com/scoopem/'

// Concatenate CSS and send to publish dir
gulp.task('css', function() {
	return gulp.src([
		'css/*.css',
		'node_modules/bootstrap/dist/css/*min.css'
	]).pipe(concat('all.css'))
		.pipe(gulp.dest(pubRoot + 'css'));
});

// Concatenate JS and send to publish dir
gulp.task('js', function() {
	jsources = [
		'node_modules/jquery/dist/jquery.js', // .min
		'node_modules/bootstrap/dist/js/bootstrap.js', // .min
		'node_modules/underscore/underscore.js', // -min
		'node_modules/backbone/backbone.js', // -min
		'node_modules/backbone.radio/build/backbone.radio.js', // .min
		'node_modules/backbone.marionette/lib/backbone.marionette.js', // .min
		'js/*.js',
		'js/views/*.js'
	]
	// Later use min versions (or put in minify flag to use those)
	return gulp.src(jsources).pipe(concat('all.js'))
		.pipe(gulp.dest(pubRoot + 'js'));
});

// Send HTML to publish dir
gulp.task('html', function() {
	return gulp.src('html/*.html')
		.pipe(gulp.dest(pubRoot + 'html'));
});

// Send PHP to publish dir (okay, this is my php, not Slim)
gulp.task('php', function() {
	return gulp.src('php/*.php')
		.pipe(gulp.dest(pubRoot + 'php'));
});

// Here is vendor php
gulp.task('vendor', function() {
	copydir.sync('./vendor', pubRoot + 'vendor')
});


// Send images to publish dir
gulp.task('img', function() {
	return gulp.src('img/*')
		.pipe(gulp.dest(pubRoot + 'img'));
});

// Send fonts to publish dir
gulp.task('fonts', function() {
	return gulp.src('node_modules/bootstrap/dist/fonts/*')
		.pipe(gulp.dest(pubRoot + 'fonts'));
});

// Lastly the index php
gulp.task('index', function() {
	return gulp.src('index.php')
		.pipe(gulp.dest(pubRoot));
});
