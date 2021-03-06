var PROVIDER = {
    "cdn": function(url){
        return [
            //((typeof window == 'object' && window.VALVE_BASEURL) ? window.VALVE_BASEURL : "//s2cdn.memebox.com//cdnjs") + url,
            "vendor" + url
        ]
    },
    "pc"    : "app/memebox/pc",
    "mobile": "app/memebox/mobile",
    "common": "app/common",
    "package": "package",
    "vendor": "vendor"
    //,"helper" : "package/helper"
};

var REQUIRE_JS_PATHS = {};

// directory
var REQUIRE_JS_PATHS_DIRECTORY = {
    "path_common": PROVIDER.common.replace("app/", "dist/"),
    "path_mobile": PROVIDER.mobile.replace("app/", "dist/"),
    "path_pc"    : PROVIDER.pc    .replace("app/", "dist/")
};

var REQUIRE_JS_PATHS_CDN = {
    "text": PROVIDER.cdn("/require-text/2.0.12/text.min"),
    "css" : PROVIDER.cdn("/require-css/0.1.8/css.min"),
    "hbs" : PROVIDER.cdn("/requirejs-handlebars/0.0.2/hbars.min"),

    "modernizr" : PROVIDER.cdn("/modernizr/2.8.3/modernizr.min"),
    "es5-shim" : PROVIDER.cdn("/es5-shim/4.3.1/es5-shim.min"),
    "jquery": PROVIDER.cdn("/jquery/1.11.3/jquery.min"),
    "handlebars": PROVIDER.cdn("/handlebars.js/1.3.0/handlebars.min"),
    "slick"  : PROVIDER.vendor + "/slick/1.6.0/slick",
    //"jquery.ui.position" : PROVIDER.vendor + "/jqueryUi/jquery-ui-position.min"
    "jquery.ui.position" : PROVIDER.vendor + "/jqueryUi/jquery-ui-position"
};

(function(){
    var targetPaths = [REQUIRE_JS_PATHS_DIRECTORY, REQUIRE_JS_PATHS_CDN];
    var length = targetPaths.length;

    for(var i=0; i<length; i++){
        var path = targetPaths[i];
        for(var key in path){
            if(path.hasOwnProperty(key)){
                REQUIRE_JS_PATHS[key] = path[key];
            }
        }
    }
})();

var REQUIRE_JS_SHIM = {
    "jquery.spin" : {
        deps    : ["jquery"],
        exports : "jQuery.fn.spin"
    },
    "rng": {
        deps: ["prng4"]
    },
    "moment-ko": {
        deps: ["moment"],
        exports: "moment"
    }
};

var REQUIRE_JS_MAP = {
    "hbs" : {
        "Handlebars" : "handlebars"
    }
};

// for webpack
if (typeof exports === "object"){
    module.exports = {
        PROVIDER: PROVIDER,
        REQUIRE_JS_PATHS_CDN: REQUIRE_JS_PATHS_CDN
    };
}