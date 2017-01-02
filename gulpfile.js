'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var browserSync_front = require('browser-sync').create('front');
var nodemon = require('gulp-nodemon')
var del = require('del');
var webpackConfig = require('./gulp/webpack.config');
var webpackBuild = require('./gulp/webpack.build');

// config/////////////////////////
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
    app : APP_DIR_APP + '**/*.*',
    dist : APP_DIR_DIST + '**/*.*',
    view : APP_DIR_VIEW + '**/*.*',
    server : SERVER_DIR + '**/*.*'
};

// task/////////////////////////
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

gulp.task('local_build_pc', webpackBuild(webpackConfig('memebox', 'production', 'pc')));
gulp.task('local_build_mobile', webpackBuild(webpackConfig('memebox', 'production', 'mobile')));

gulp.task('front-browser-mobile-sync', ['local_build_mobile'], function() {//'local_build_pc',
    browserSync_front.init({
        proxy: "http://localhost:5000",
        browser: "google chrome",
        port: 8000
    });

    gulp.watch(files.view).on("change", browserSync_front.reload);
    gulp.watch(files.app).on("change", webpackBuild(webpackConfig('memebox', 'production', 'mobile')));
    gulp.watch(files.dist).on("change", browserSync_front.reload);
});

gulp.task('front-browser-pc-sync', ['local_build_pc'], function() {//'local_build_pc',
    browserSync_front.init({
        proxy: "http://localhost:5000",
        browser: "google chrome",
        port: 8000
    });

    gulp.watch(files.view).on("change", browserSync_front.reload);
    gulp.watch(files.app).on("change", webpackBuild(webpackConfig('memebox', 'production', 'pc')));
    gulp.watch(files.dist).on("change", browserSync_front.reload);
});

gulp.task('default', ['nodemon'], function(){
    return gutil.log('Gulp is running');
});
