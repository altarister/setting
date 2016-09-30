var path = require('path');
var glob = require("glob");//특정 패턴으로 파일을 찾은 후 배열 형태로 제공해주는 기능 등을 가진 모듈
var objectAssign = require('object-assign');
var ROOT_DIR = process.cwd();
var PUBLIC_DIR = path.resolve(process.cwd(), 'public');//path.resolve([from ...], to) to를 절대경로로 변환한다.
var PACKAGE_DIR = path.resolve(process.cwd(), 'package');
var HELPER_DIR = path.resolve(process.cwd(), 'package/helper');
var APP_DIR = path.resolve(process.cwd(), 'public/app');
var requirejsConfig = require(path.resolve(PUBLIC_DIR, 'vendor/requirejs-config.js'));
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //sass 를  최종 css로 변환

var webpackMobileEntries = {};
var webpackPcEntries = {};
var commonEntries = [];

glob.sync(APP_DIR + "/**/*.jsx").forEach(function (sourceFilesPath) {
    sourceFilesPath = "." + path.resolve(sourceFilesPath)
        .replace(PUBLIC_DIR, '')
        .replace(/\\/g, '/');
    var chunkName = sourceFilesPath
        .replace('/app/', '/dist/')
        .replace('.jsx', '');
    var isPageControllerPath = /\/[^_]+.jsx/.test(sourceFilesPath);
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
    //"pcCommon": requirejsConfig.PROVIDER.pc + "/common/_common"
};

var MOBILE_COMMON_CHUNK = {
    //"mobileCommon": requirejsConfig.PROVIDER.mobile + "/common/_common"
};

module.exports = function (serviceString, envString, deviceString) {

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

    var ENTRY_POINTS = device.isMobile ? webpackMobileEntries : webpackPcEntries;

    return {
        context: PUBLIC_DIR,
        entry: objectAssign(
            {common: (function(){
                var HELPER_CHUNK = [
                    requirejsConfig.PROVIDER.common + '/handlebars-helpers/json',
                    requirejsConfig.PROVIDER.common + '/handlebars-helpers/formatNumber'
                    //requirejsConfig.PROVIDER.helper + '/json'
                    //HELPER_DIR + '/json'
                ];

                for(var key in COMMON_CHUNK){
                    HELPER_CHUNK.push(COMMON_CHUNK[key]);
                }
                console.log('HELPER_CHUNK = ',HELPER_CHUNK)

                return HELPER_CHUNK;
            })()},
            ENTRY_POINTS
        ),
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
                    test: /\.js(x?)$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules|bower_components)/,
                    query: {
                        presets: ['es2015', 'stage-0', 'react']
                    }
                },
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader?helperDirs[]=' + path.resolve(PUBLIC_DIR, './app/common/handlebars-helpers')
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader')
                }
            ]
        },
        externals: Object.keys(requirejsConfig.REQUIRE_JS_PATHS_CDN),
        resolve: {
            root: [ROOT_DIR, PUBLIC_DIR, path.resolve('./package')],
            extensions: ['', '.js', '.jsx'],
            modulesDirectories: ['node_modules'],
            alias: COMMON_CHUNK
        },plugins: (function () {
            var plugins = [];

            if (!environment.test) {
                plugins = [
                    new webpack.NoErrorsPlugin(),
                    new CommonsChunkPlugin({
                        name: "common",
                        filename: device.isMobile ? "vendor/mobile.commons.chunk.js" : "vendor/pc.commons.chunk.js",
                        minChunks: Infinity
                    }),
                    new ExtractTextPlugin(
                        '[name].css',
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
