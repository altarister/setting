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
var SpritesmithPlugin = require('webpack-spritesmith');

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
    //"placeholder": requirejsConfig.PROVIDER.common + "/util/placeholder/_placeholder"
};

var PC_COMMON_CHUNK = {
    "pcCommon": requirejsConfig.PROVIDER.pc + "/common/_common"
};

var MOBILE_COMMON_CHUNK = {
    "mobileCommon": requirejsConfig.PROVIDER.mobile + "/common/_common"
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

    var objectAssignAgs = (function(){

        var commmonObject = {};

        var name = 'dist/'+serviceString+'/'+(device.isMobile ? 'mobile' : 'pc')+'/common/common.chunk';
        //var name = 'common'
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
        commmonObject[name] = HELPER_CHUNK;
        //return HELPER_CHUNK;
        return commmonObject;
    })();

    var ENTRY_POINTS = device.isMobile ? webpackMobileEntries : webpackPcEntries;

    return {
        context: PUBLIC_DIR,
        // entry: objectAssign(
        //     {common: (function(){
        //         var HELPER_CHUNK = [
        //             requirejsConfig.PROVIDER.common + '/handlebars-helpers/json',
        //             requirejsConfig.PROVIDER.common + '/handlebars-helpers/formatNumber'
        //
        //             //requirejsConfig.PROVIDER.helper + '/json'
        //             //HELPER_DIR + '/json'
        //         ];
        //
        //         for(var key in COMMON_CHUNK){
        //             HELPER_CHUNK.push(COMMON_CHUNK[key]);
        //         }
        //         // console.log('HELPER_CHUNK = ',HELPER_CHUNK)
        //
        //         return HELPER_CHUNK;
        //     })()},
        //     ENTRY_POINTS
        // ),
        entry: objectAssign(
            //objectAssignAgs['common']

            objectAssignAgs,
            ENTRY_POINTS
        ),
        output: {
            textFunction: (function(){console.log('PUBLIC_DIR ===== ',PUBLIC_DIR)})(),
            path: PUBLIC_DIR,
            filename: '[name].js',
            publicPath: '/static/',
            libraryTarget: "amd"
        },
        watch: true,
        debug: environment.develop,
        devtool: environment.production && device.isMobile ? '' : '',//source-map
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
                // {
                //     test: /\.png$/,
                //     loaders: ['file?name=i/[hash].[ext]']
                // },
                {
                    test: /\.(s?)css$/,
                    loader: ExtractTextPlugin.extract('style-loader', ['css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader', 'sass-loader'])
                }
            ]
        },
        externals: Object.keys(requirejsConfig.REQUIRE_JS_PATHS_CDN),
        resolve: {
            root: [ROOT_DIR, PUBLIC_DIR, path.resolve('./package')],
            extensions: ['', '.js', '.jsx'],
            modulesDirectories: ['node_modules'],
            //alias: COMMON_CHUNK
            alias: (function(){
                COMMON_CHUNK['device'] = './'+deviceString;
                COMMON_CHUNK['deal_inline_gallery'] = 'modules/dealViews/_deal_inline_gallery/v.1.0.0/'+deviceString;
                COMMON_CHUNK['deal_tooltip_floating'] = 'modules/dealViews/_deal_tooltip_floating/v.1.0.0/'+deviceString;

                return COMMON_CHUNK;
            })()
        },plugins: (function () {
            var plugins = [];

            if (!environment.test) {
                plugins = [
                    new webpack.NoErrorsPlugin(),
                    // new SpritesmithPlugin({
                    //     src: {
                    //         cwd: path.resolve(__dirname, 'src/ico'),
                    //         glob: '*.png'
                    //     },
                    //     target: {
                    //         image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
                    //         css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.styl')
                    //     },
                    //     apiOptions: {
                    //         cssImageRef: "~sprite.png"
                    //     }
                    // }),

                    new CommonsChunkPlugin({
                        name: 'common',
                        //name: 'dist/'+serviceString+'/'+(device.isMobile ? 'mobile' : 'pc')+'/common/common.chunk',
                        filename: 'dist/'+serviceString+'/'+(device.isMobile ? 'mobile' : 'pc')+'/common/common.chunk.js',

                        //filename: device.isMobile ? "dist/memebox/mobile/common/commons.chunk.js" : "dist/memebox/pc/common/commons.chunk.js",
                        //filename: device.isMobile ? "vendor/mobile.commons.chunk.js" : "vendor/pc.commons.chunk.js",
                        minChunks: Infinity
                    }),
                    new ExtractTextPlugin(
                        '[name].css',
                        {allChunks: true}
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

            // if (environment.production && device.isMobile) {
            //     plugins.push(
            //         new webpack.optimize.UglifyJsPlugin({
            //             compress: {
            //                 warnings: false
            //             }
            //         })
            //     );
            // }
            return plugins;
        })()
    };
}
