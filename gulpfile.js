'use strict';
var path = require('path');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var Cache = require('gulp-file-cache');
var del = require('del');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var webpackConfig = require('./gulp/webpack.config');

var cache = new Cache();

// config/////////////////////////
var BASE_DIR = './';
var APP_DIR_RESOURCES = BASE_DIR + 'public/';
var APP_DIR_APP = APP_DIR_RESOURCES + 'app/';
var APP_DIR_DIST = APP_DIR_RESOURCES + 'dist/';
var APP_DIR_VIEW = BASE_DIR + 'views/';
var SERVER_DIR = BASE_DIR + 'server/';

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
gulp.task('clean', function(){
    return del.sync([config.APP_DIR_DIST]);
});

gulp.task('hbs', function() {
    return gulp.src(files.view)
});

gulp.task('Webpack_mobile', function() {
    return gulp.src(files.app)
        // .pipe(cache.filter())
        .pipe(gulpWebpack(webpackConfig('memebox', 'production', 'mobile')))
        // .pipe(cache.cache())
        .pipe(gulp.dest(config.APP_DIR_RESOURCES));
});

gulp.task('Webpack_pc', function() {
    return gulp.src(files.app)
        // .pipe(cache.filter())
        .pipe(gulpWebpack(webpackConfig('memebox', 'production', 'pc')))
        // .pipe(cache.cache())
        .pipe(gulp.dest(config.APP_DIR_RESOURCES));
});

gulp.task('server', function() {
    return gulp.src(files.server)
});

gulp.task('watch', function(){
    var watcher = {
        Webpack_pc: gulp.watch(files.app, ['Webpack_pc']),
        Webpack_mobile: gulp.watch(files.app, ['Webpack_mobile']),
        hbs: gulp.watch(files.view, ['hbs']),
        server: gulp.watch(files.server, ['server'])
    };

    var notify = function(event) {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for(var key in watcher) {
        watcher[key].on('change', notify);
    }
});

gulp.task('start', ['server'], function() {
    return nodemon({
        script: 'server.js',//SERVER_DIR+
        watch: SERVER_DIR
    });
});

gulp.task('browser-sync', function(){
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: [files.dist, files.view, files.server],
        port: 8000
    })
});

gulp.task('default', ['clean', 'Webpack_pc', 'Webpack_mobile', 'watch', 'start', 'browser-sync'], function() { //
    gutil.log('Gulp is running');
});