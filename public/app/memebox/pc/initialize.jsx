require('modernizr');
var $ = require('jquery');
var Common = require('pcCommon');
var memeboxWrapSelector = '#memebox-service';

function globalSubscribePublishEvent(){
    var o = $({});

    $.subscribe   = function(){ o.on.apply(o, arguments); };
    $.unsubscribe = function(){ o.off.apply(o, arguments); };
    $.publish     = function(){ o.trigger.apply(o, arguments); };
    window.publish = function(){
        o.trigger.apply(o, arguments);
    }
}

function pageControllerInitialize(){
    var controller = $(memeboxWrapSelector).data('controller');

    if (controller) {
        memeboxRequire(['dist/' + controller], function (controller) {
            if (controller && controller instanceof Function) {
                controller();
            }
        });
    }
}

function widgetControllerInitialize(){
    $('[data-widget]').each(function (index, widget) {
        var path = $(widget).data('widget'),
            data = $(widget).data('widget-data');

        memeboxRequire([path], function (widgetFunction) {
            if (widgetFunction && widgetFunction instanceof Function) {
                widgetFunction(widget, data);
            }
        });
    });
}

module.exports = function () {

    // payment subscribe/publish 패턴
    globalSubscribePublishEvent();

    // payment 전체 공통함수 실행
    // new Common(memeboxWrapSelector);
    new Common();

    // 페이지 controller 실행하기
    pageControllerInitialize();

    // 독립적인 위젯컨트롤러 실행하기
    // widgetControllerInitialize();
};

