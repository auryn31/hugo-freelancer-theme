var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    ''
].join('');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('static/scss/freelancer.scss')
        .pipe(sass())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('static/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('static/css/freelancer.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('static/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});



// Default task
gulp.task('default', ['sass', 'minify-css']);

gulp.task('dev', ['sass', 'minify-css'], function() {
    gulp.watch('static/scss/*.scss', ['sass']);
    gulp.watch('static/css/*.css', ['minify-css']);    
});