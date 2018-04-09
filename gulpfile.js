/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-04-05 22:19:43 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-04-09 11:45:49
 */

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass and inject to browser
gulp.task('sass', () => {
    return gulp
        .src(['node_modules/bootstrap/scss/bootstrap.scss', '/src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

//Move JS file to src/js
gulp.task('js', function() {
    return gulp
        .src([
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/popper.js/dist/umd/popper-utils.js.mappopper.min.js'
        ])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

// Watch Sass and server
gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: './src'
    });

    gulp.watch(
        ['node_modules/bootstrap/scss/bootstrap.scss', '/src/scss/*.scss'], ['sass']
    );
    gulp
        .watch(['src/*.html', 'src/css/*.css', 'src/js/*.js'])
        .on('change', browserSync.reload);
});

// Move fonts-folder to src
gulp.task('fonts', function() {
    return gulp
        .src(['node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('src/fonts'));
});

// Move font css -folder to src
gulp.task('fa', function() {
    return gulp
        .src(['node_modules/font-awesome/css/font-awesome.min.css'])
        .pipe(gulp.dest('src/css'));
});

// Default gulp task
gulp.task('default', ['js', 'server', 'fa', 'fonts']);