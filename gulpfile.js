/* gulpfile.js
 * Script for build tasks publishing this site
 * David Lenkner, c. 2017
 */

// Include gulp and packages
var gulp = require('gulp');
var concat = require('gulp-concat');


/* Presently, basically the only tasks are to concatenate stuff and send
 * everything to the public directory.  Concatenation helps load faster.
 * Later we should be a bit more complete and minify, etc.
 */
gulp.task('default', [])

pubRoot = '/var/www/lenknerd.com/scoopem/'

// Concatenate all javascript and send it to publish dir


// Send CSS to to publish dir

 
gulp.task('scripts', function() {
	  return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
		      .pipe(concat('all.js'))
			      .pipe(gulp.dest('./dist/'));
});





// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map']).pipe(gulp.dest(pubRoot + 'vendor/bootstrap'));

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js']).pipe(gulp.dest(pubRoot + 'vendor/jquery'));

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ]).pipe(gulp.dest(pubRoot + 'vendor/font-awesome'));
});

