var path = require('path');
var glob = require("glob");//특정 패턴으로 파일을 찾은 후 배열 형태로 제공해주는 기능 등을 가진 모듈
var objectAssign = require('object-assign');
var ROOT_DIR = process.cwd();
//console.log('ROOT_DIR = ',ROOT_DIR);
var PUBLIC_DIR = path.resolve(process.cwd(), 'public');
var APP_DIR = path.resolve(process.cwd(), 'public/app');
//path.resolve([from ...], to) to를 절대경로로 변환한다.

//console.log('PUBLIC_DIR = ',PUBLIC_DIR);
var requirejsConfig = require(path.resolve(PUBLIC_DIR, 'vendor/requirejs-config.js'));
//console.log('requirejsConfig = ',requirejsConfig);
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //sass 를  최종 css로 변환

var webpackMobileEntries = {};
var webpackPcEntries = {};
var commonEntries = [];

glob.sync(APP_DIR + "/**/*.jsx").forEach(function (sourceFilesPath) {
    //console.log('sourceFilesPath 1 = ',sourceFilesPath);
    sourceFilesPath = "." + path.resolve(sourceFilesPath)
            .replace(PUBLIC_DIR, '')
            .replace(/\\/g, '/');
    //console.log('sourceFilesPath 2 = ',sourceFilesPath);
    var chunkName = sourceFilesPath
        .replace('/app/', '/dist/')
        .replace('.jsx', '');
    //console.log('chunkName = ',chunkName);
    var isPageControllerPath = /\/[^_]+.jsx/.test(sourceFilesPath);
    //console.log('isPageControllerPath = ',isPageControllerPath);
    if (isPageControllerPath) {
        if (/\/mobile\//.test(sourceFilesPath)) {
            webpackMobileEntries[chunkName] = sourceFilesPath;
        }else if (/\/pc\//.test(sourceFilesPath)) {
            webpackPcEntries[chunkName] = sourceFilesPath;
        }
    } else {
        commonEntries.push(sourceFilesPath);
    }
});


var DEFAULT_COMMON_CHUNK = {
    // common

    // util
    "utility": requirejsConfig.PROVIDER.common + "/util/_utility",
    "validate": requirejsConfig.PROVIDER.common + "/util/_validate"
};

var PC_COMMON_CHUNK = {

};

var MOBILE_COMMON_CHUNK = {

};

module.exports = function (envString, deviceString) {
    console.log('envString = ',envString);
    console.log('deviceString = ',deviceString);
    var environment = {
        develop: envString === 'develop',
        production: envString === 'production',
        test: envString === 'test'
    };

    var device = {
        isMobile: deviceString === 'mobile',
        isPc: deviceString === 'pc'
    };

    var COMMON_CHUNK = objectAssign(
        {},
        DEFAULT_COMMON_CHUNK,
        environment.test ? objectAssign({}, MOBILE_COMMON_CHUNK, PC_COMMON_CHUNK)
            : device.isMobile ? MOBILE_COMMON_CHUNK
            : PC_COMMON_CHUNK
    );

    console.log('COMMON_CHUNK = ',COMMON_CHUNK);

    var ENTRY_POINTS = device.isMobile ? webpackMobileEntries : webpackPcEntries;

    console.log('ENTRY_POINTS = ',ENTRY_POINTS)

    return {
        context: PUBLIC_DIR,
        entry: objectAssign(
            {common: (function(){
                var HELPER_CHUNK = [];
                for(var key in COMMON_CHUNK){
                    HELPER_CHUNK.push(COMMON_CHUNK[key]);
                }
                return HELPER_CHUNK;
            })()},
            ENTRY_POINTS
        ),
        //entry: './app/memebox/pc/main/main.js',
        output: {
            path: PUBLIC_DIR,
            filename: '[name].js',
            publicPath: '/static/',
            libraryTarget: "amd"
        },
        watch: true,
        debug: environment.develop,
        devtool: environment.production && device.isMobile ? 'source-map' : '',
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: 'style!css'
                }
            ]
        },
        externals: Object.keys(requirejsConfig.REQUIRE_JS_PATHS_CDN),
        resolve: {
            root: [ROOT_DIR, PUBLIC_DIR],
            extensions: ['', '.js', '.jsx'],
            modulesDirectories: ['node_modules'],
            alias: COMMON_CHUNK
        },plugins: (function () {
            var plugins = [];

            console.log(!environment.test,'  plugins------------device.isMobile = ',device.isMobile)

            if (!environment.test) {
                console.log('배포버전')
                plugins = [
                    new webpack.NoErrorsPlugin(),
                    new CommonsChunkPlugin({
                        name: "common",
                        filename: device.isMobile ? "vendor/mobile.commons.chunk.js" : "vendor/pc.commons.chunk.js",
                        minChunks: Infinity
                    }),
                    new ExtractTextPlugin(
                        'app/scss-dist-' + (device.isMobile ? 'mobile' : 'pc') + '/[name].css',
                        { allChunks: true }
                    )
                ];
            }else{
                plugins = [
                    new ExtractTextPlugin(
                        'app/scss-dist-test/[name].css',
                        { allChunks: true }
                    )
                ]
            }

            console.log('plugins = ',plugins)

            if (environment.production && device.isMobile) {
                plugins.push(
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    })
                );
            }
            return plugins;
        })()
    };
}

//
// glob.sync(PUBLIC_DIR + "/**/*.jsx").forEach(function (sourceFilesPath) {
//     sourceFilesPath = "." + path.resolve(sourceFilesPath)
//             .replace(PUBLIC_DIR, '')
//             .replace(/\\/g, '/');
//
//     var chunkName = sourceFilesPath
//         .replace('/js/', '/js-dist/')
//         .replace('.jsx', '');
//
//     var isPageControllerPath = /\/[^_]+.jsx/.test(sourceFilesPath);
//     if (isPageControllerPath) {
//         if (/\/mobile\//.test(sourceFilesPath)) {
//             webpackMobileEntries[chunkName] = sourceFilesPath;
//
//         }else if (/\/pc\//.test(sourceFilesPath)) {
//             webpackPcEntries[chunkName] = sourceFilesPath;
//         }
//     } else {
//         commonEntries.push(sourceFilesPath);
//     }
// });
//
// // webpack 에서 하나의 js로 bundle 되어질 파일 목록
// var DEFAULT_COMMON_CHUNK = {
//     // common
//     "commonControllerData": requirejsConfig.PROVIDER.common + "/controller/_data",
//     "wiseLog": requirejsConfig.PROVIDER.common + "/components/wiseLog/_wiseLog",
//     "SpeedChecker": requirejsConfig.PROVIDER.common + "/components/SpeedChecker/_SpeedChecker",
//     "CoupangAppTracking": requirejsConfig.PROVIDER.common + "/components/coupangTrack/_CoupangAppTracking",
//     "dialogue-modal": requirejsConfig.PROVIDER.common + "/components/dialogue/_modal",
//     "imagesLoaded": requirejsConfig.PROVIDER.common + "/components/imagesLoaded/_imagesLoaded",
//
//     // util
//     "utility": requirejsConfig.PROVIDER.common + "/util/_utility",
//     "validate": requirejsConfig.PROVIDER.common + "/util/_validate",
//     "placeholder": requirejsConfig.PROVIDER.common + "/util/placeholder/_placeholder"
// };
//
// var PC_COMMON_CHUNK = {
//     "pcCommon": requirejsConfig.PROVIDER.pc + "/common/_common",
//     "PcDialogueModal": requirejsConfig.PROVIDER.pc + "/components/dialogue/_dialogue-modal",
//     "alert2": requirejsConfig.PROVIDER.pc + "/components/alert2/_alert2",
//     "pcBankAccount": requirejsConfig.PROVIDER.pc + "/components/bankAccount/_main"
// };
//
// var MOBILE_COMMON_CHUNK = {
//     "mobileCommon": requirejsConfig.PROVIDER.mobile + "/common/_common",
//     "MobileDialogueModal": requirejsConfig.PROVIDER.mobile + "/components/dialogue/_dialogue-modal",
//     "alert2": requirejsConfig.PROVIDER.mobile + "/components/alert2/_alert2",
//     "bankAccount": requirejsConfig.PROVIDER.mobile + "/components/bankAccount/_main"
// };
//
// module.exports = function (envString, deviceString) {
//     console.log('aaaaaa')
//     var environment = {
//         develop: envString === 'develop',
//         production: envString === 'production',
//         test: envString === 'test'
//     };
//
//     var device = {
//         isMobile: deviceString === 'mobile',
//         isPc: deviceString === 'pc'
//     };
//
//     var COMMON_CHUNK = objectAssign(
//         {},
//         DEFAULT_COMMON_CHUNK,
//         environment.test ? objectAssign({}, MOBILE_COMMON_CHUNK, PC_COMMON_CHUNK)
//             : device.isMobile ? MOBILE_COMMON_CHUNK
//             : PC_COMMON_CHUNK
//     );
//
//     var ENTRY_POINTS = device.isMobile ? webpackMobileEntries : webpackPcEntries;
//
//     return {
//         context: PUBLIC_DIR,
//         entry: objectAssign(
//             {common: (function(){
//                 var HELPER_CHUNK = [
//                     requirejsConfig.PROVIDER.common + '/util/handlebars-helpers/cdnStaticImage',
//                     requirejsConfig.PROVIDER.common + '/util/handlebars-helpers/default',
//                     requirejsConfig.PROVIDER.common + '/util/handlebars-helpers/ellipsis',
//                     requirejsConfig.PROVIDER.common + '/util/handlebars-helpers/formatDate',
//                     requirejsConfig.PROVIDER.common + '/util/handlebars-helpers/formatNumber',
//                     requirejsConfig.PROVIDER.common + '/util/handlebars-helpers/json',
//                     requirejsConfig.PROVIDER.common + '/util/handlebars-helpers/when'
//                 ];
//                 for(var key in COMMON_CHUNK){
//                     HELPER_CHUNK.push(COMMON_CHUNK[key]);
//                 }
//                 return HELPER_CHUNK;
//             })()},
//             ENTRY_POINTS
//         ),
//         output: {
//             path: PUBLIC_DIR,
//             filename: '[name].js',
//             publicPath: '/static/',
//             libraryTarget: "amd"
//         },
//         watch: true,
//         debug: environment.develop,
//         devtool: environment.production && device.isMobile ? 'source-map' : '',
//         module: {
//             loaders: [
//                 {
//                     test: /\.js(x?)$/,
//                     loader: 'babel-loader',
//                     exclude: /(node_modules|bower_components)/,
//                     query: {
//                         presets: ['es2015', 'stage-0', 'react']
//                     }
//                 },
//                 {
//                     test: /\.hbs$/,
//                     loader: 'handlebars-loader?helperDirs[]=' + path.resolve(PUBLIC_DIR, './app/js/common/util/handlebars-helpers')
//                 },
//                 {
//                     test: /\.css$/,
//                     loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader')
//                 }
//             ]
//         },
//
//         postcss: [
//             require('autoprefixer'),
//             require('precss')
//         ],
//
//         externals: Object.keys(requirejsConfig.REQUIRE_JS_PATHS_CDN),
//         resolve: {
//             root: [ROOT_DIR, PUBLIC_DIR],
//             extensions: ['', '.js', '.jsx'],
//             modulesDirectories: ['node_modules'],
//             alias: COMMON_CHUNK
//         },
//         plugins: (function () {
//             var plugins = [];
//             if (!environment.test) {
//                 plugins = [
//                     new webpack.NoErrorsPlugin(),
//                     new CommonsChunkPlugin({
//                         name: "common",
//                         filename: device.isMobile ? "vendor/mobile.commons.chunk.js" : "vendor/pc.commons.chunk.js",
//                         minChunks: Infinity
//                     }),
//                     new ExtractTextPlugin(
//                         'app/scss-dist-' + (device.isMobile ? 'mobile' : 'pc') + '/[name].css',
//                         { allChunks: true }
//                     )
//                 ];
//             }else{
//                 plugins = [
//                     new ExtractTextPlugin(
//                         'app/scss-dist-test/[name].css',
//                         { allChunks: true }
//                     )
//                 ]
//             }
//
//             if (environment.production && device.isMobile) {
//                 plugins.push(
//                     new webpack.optimize.UglifyJsPlugin({
//                         compress: {
//                             warnings: false
//                         }
//                     })
//                 );
//             }
//             return plugins;
//         })()
//     };
// };
