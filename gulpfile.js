'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
//var nodemon = require('nodemon');
var nodemon = require('gulp-nodemon')
var del = require('del');
var reload = browserSync.reload;

// config
var BASE_DIR = './';
var APP_DIR_RESOURCES = BASE_DIR + 'public/';
var APP_DIR_APP = APP_DIR_RESOURCES + 'app/';
var APP_DIR_DIST = APP_DIR_RESOURCES + 'dist/';
var APP_DIR_VIEW = BASE_DIR + 'views/';
var SERVER_DIR = BASE_DIR + 'controllers/';

var config = {
    BASE_DIR : BASE_DIR,
    APP_DIR_RESOURCES : APP_DIR_RESOURCES,
    APP_DIR_APP : APP_DIR_APP,
    APP_DIR_DIST : APP_DIR_DIST,
    APP_DIR_VIEW : APP_DIR_VIEW
};

var files = {
    public : APP_DIR_APP + '**/*.*',
    view : APP_DIR_VIEW + '**/*.*',
    server : SERVER_DIR + '**/*.*'
};

gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: 'server.js'
    }).on('resatt', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('front-browser-sync', ['local_build_pc'], function() {
    browserSync.init({
        proxy: "http://localhost:5000",
        files: [files.public],
        browser: "google chrome",
        port: 7000
    });
});

gulp.task('server-browser-sync', ['nodemon'], function() {
    browserSync.init({
        proxy: "http://localhost:5000",
        files: [files.server],
        browser: "google chrome",
        port: 7000
    });
});

gulp.task('watch', function(){

});

// webpack config
var webpackConfig = require('./gulp/webpack.config');
var webpackBuild = require('./gulp/webpack.build');
console.log('webpackConfig = ',webpackConfig('production', 'pc'));
gulp.task('local_build_pc', webpackBuild(webpackConfig('production', 'pc')));


gulp.task('default', ['nodemon'], function(){
    return gutil.log('Gulp is running');
});
