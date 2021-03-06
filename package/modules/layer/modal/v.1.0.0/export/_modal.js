var functions = {
    _coordinates: function (e) {
        var t = e.type;
        switch (t) {
            case "pointerdown":
            case "MSPointerDown":
            case "pointermove":
            case "MSPointerMove":
            case "pointerup":
            case "MSPointerUp":
                return [e.originalEvent.pageY, e.originalEvent.pageX];
                break;
            case "touchstart":
            case "touchmove":
            case "touchend":
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                return [touch.pageY, touch.pageX];
                break;
            default:
                return [e.pageY, e.pageX];
        }
    }
};

var layer_modal = function(_options){

    !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){return function(){function m(a,b,c){return[parseFloat(a[0])*(k.test(a[0])?b/100:1),parseFloat(a[1])*(k.test(a[1])?c/100:1)]}function n(b,c){return parseInt(a.css(b,c),10)||0}function o(b){var c=b[0];return 9===c.nodeType?{width:b.width(),height:b.height(),offset:{top:0,left:0}}:a.isWindow(c)?{width:b.width(),height:b.height(),offset:{top:b.scrollTop(),left:b.scrollLeft()}}:c.preventDefault?{width:0,height:0,offset:{top:c.pageY,left:c.pageX}}:{width:b.outerWidth(),height:b.outerHeight(),offset:b.offset()}}a.ui=a.ui||{};var b,c,d=Math.max,e=Math.abs,f=Math.round,g=/left|center|right/,h=/top|center|bottom/,i=/[\+\-]\d+(\.[\d]+)?%?/,j=/^\w+/,k=/%$/,l=a.fn.position;c=function(){var b=a("<div>").css("position","absolute").appendTo("body").offset({top:1.5,left:1.5}),d=1.5===b.offset().top;return b.remove(),c=function(){return d},d},a.position={scrollbarWidth:function(){if(void 0!==b)return b;var c,d,e=a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),f=e.children()[0];return a("body").append(e),c=f.offsetWidth,e.css("overflow","scroll"),d=f.offsetWidth,c===d&&(d=e[0].clientWidth),e.remove(),b=c-d},getScrollInfo:function(b){var c=b.isWindow||b.isDocument?"":b.element.css("overflow-x"),d=b.isWindow||b.isDocument?"":b.element.css("overflow-y"),e="scroll"===c||"auto"===c&&b.width<b.element[0].scrollWidth,f="scroll"===d||"auto"===d&&b.height<b.element[0].scrollHeight;return{width:f?a.position.scrollbarWidth():0,height:e?a.position.scrollbarWidth():0}},getWithinInfo:function(b){var c=a(b||window),d=a.isWindow(c[0]),e=!!c[0]&&9===c[0].nodeType;return{element:c,isWindow:d,isDocument:e,offset:c.offset()||{left:0,top:0},scrollLeft:c.scrollLeft(),scrollTop:c.scrollTop(),width:c.outerWidth(),height:c.outerHeight()}}},a.fn.position=function(b){if(!b||!b.of)return l.apply(this,arguments);b=a.extend({},b);var k,p,q,r,s,t,u=a(b.of),v=a.position.getWithinInfo(b.within),w=a.position.getScrollInfo(v),x=(b.collision||"flip").split(" "),y={};return t=o(u),u[0].preventDefault&&(b.at="left top"),p=t.width,q=t.height,r=t.offset,s=a.extend({},r),a.each(["my","at"],function(){var c,d,a=(b[this]||"").split(" ");1===a.length&&(a=g.test(a[0])?a.concat(["center"]):h.test(a[0])?["center"].concat(a):["center","center"]),a[0]=g.test(a[0])?a[0]:"center",a[1]=h.test(a[1])?a[1]:"center",c=i.exec(a[0]),d=i.exec(a[1]),y[this]=[c?c[0]:0,d?d[0]:0],b[this]=[j.exec(a[0])[0],j.exec(a[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===b.at[0]?s.left+=p:"center"===b.at[0]&&(s.left+=p/2),"bottom"===b.at[1]?s.top+=q:"center"===b.at[1]&&(s.top+=q/2),k=m(y.at,p,q),s.left+=k[0],s.top+=k[1],this.each(function(){var g,h,i=a(this),j=i.outerWidth(),l=i.outerHeight(),o=n(this,"marginLeft"),t=n(this,"marginTop"),z=j+o+n(this,"marginRight")+w.width,A=l+t+n(this,"marginBottom")+w.height,B=a.extend({},s),C=m(y.my,i.outerWidth(),i.outerHeight());"right"===b.my[0]?B.left-=j:"center"===b.my[0]&&(B.left-=j/2),"bottom"===b.my[1]?B.top-=l:"center"===b.my[1]&&(B.top-=l/2),B.left+=C[0],B.top+=C[1],c()||(B.left=f(B.left),B.top=f(B.top)),g={marginLeft:o,marginTop:t},a.each(["left","top"],function(c,d){a.ui.position[x[c]]&&a.ui.position[x[c]][d](B,{targetWidth:p,targetHeight:q,elemWidth:j,elemHeight:l,collisionPosition:g,collisionWidth:z,collisionHeight:A,offset:[k[0]+C[0],k[1]+C[1]],my:b.my,at:b.at,within:v,elem:i})}),b.using&&(h=function(a){var c=r.left-B.left,f=c+p-j,g=r.top-B.top,h=g+q-l,k={target:{element:u,left:r.left,top:r.top,width:p,height:q},element:{element:i,left:B.left,top:B.top,width:j,height:l},horizontal:0>f?"left":c>0?"right":"center",vertical:0>h?"top":g>0?"bottom":"middle"};j>p&&e(c+f)<p&&(k.horizontal="center"),l>q&&e(g+h)<q&&(k.vertical="middle"),k.important=d(e(c),e(f))>d(e(g),e(h))?"horizontal":"vertical",b.using.call(this,a,k)}),i.offset(a.extend(B,{using:h}))})},a.ui.position={fit:{left:function(a,b){var j,c=b.within,e=c.isWindow?c.scrollLeft:c.offset.left,f=c.width,g=a.left-b.collisionPosition.marginLeft,h=e-g,i=g+b.collisionWidth-f-e;b.collisionWidth>f?h>0&&0>=i?(j=a.left+h+b.collisionWidth-f-e,a.left+=h-j):a.left=i>0&&0>=h?e:h>i?e+f-b.collisionWidth:e:h>0?a.left+=h:i>0?a.left-=i:a.left=d(a.left-g,a.left)},top:function(a,b){var j,c=b.within,e=c.isWindow?c.scrollTop:c.offset.top,f=b.within.height,g=a.top-b.collisionPosition.marginTop,h=e-g,i=g+b.collisionHeight-f-e;b.collisionHeight>f?h>0&&0>=i?(j=a.top+h+b.collisionHeight-f-e,a.top+=h-j):a.top=i>0&&0>=h?e:h>i?e+f-b.collisionHeight:e:h>0?a.top+=h:i>0?a.top-=i:a.top=d(a.top-g,a.top)}},flip:{left:function(a,b){var n,o,c=b.within,d=c.offset.left+c.scrollLeft,f=c.width,g=c.isWindow?c.scrollLeft:c.offset.left,h=a.left-b.collisionPosition.marginLeft,i=h-g,j=h+b.collisionWidth-f-g,k="left"===b.my[0]?-b.elemWidth:"right"===b.my[0]?b.elemWidth:0,l="left"===b.at[0]?b.targetWidth:"right"===b.at[0]?-b.targetWidth:0,m=-2*b.offset[0];0>i?(n=a.left+k+l+m+b.collisionWidth-f-d,(0>n||n<e(i))&&(a.left+=k+l+m)):j>0&&(o=a.left-b.collisionPosition.marginLeft+k+l+m-g,(o>0||e(o)<j)&&(a.left+=k+l+m))},top:function(a,b){var o,p,c=b.within,d=c.offset.top+c.scrollTop,f=c.height,g=c.isWindow?c.scrollTop:c.offset.top,h=a.top-b.collisionPosition.marginTop,i=h-g,j=h+b.collisionHeight-f-g,k="top"===b.my[1],l=k?-b.elemHeight:"bottom"===b.my[1]?b.elemHeight:0,m="top"===b.at[1]?b.targetHeight:"bottom"===b.at[1]?-b.targetHeight:0,n=-2*b.offset[1];0>i?(p=a.top+l+m+n+b.collisionHeight-f-d,(0>p||p<e(i))&&(a.top+=l+m+n)):j>0&&(o=a.top-b.collisionPosition.marginTop+l+m+n-g,(o>0||e(o)<j)&&(a.top+=l+m+n))}},flipfit:{left:function(){a.ui.position.flip.left.apply(this,arguments),a.ui.position.fit.left.apply(this,arguments)},top:function(){a.ui.position.flip.top.apply(this,arguments),a.ui.position.fit.top.apply(this,arguments)}}}}(),a.ui.position});

    var controller = {

        element: null,

        ui: {
            moduleModalLayer__contents: '.module-layer-modal__contents',
            moduleModalLayer__title: '.module-layer-modal-title',
            moduleModalLayer__closing: '.module-layer-modal-closing',
            moduleModalLayer__controller: '.module-layer-modal-controller'
        },

        isShown: false,
        options: _options,
        $backdrop: null,
        $element: null,
        $layout: null,
        DEFAULTS: {
            enableModalFocus: false,
            enableClickBackdrop: false
        },

        initialize: function(){
            this.element = $(layer_templates.modal(_options.content));
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },

        addEventListener: function(){
            this.element.off()
                .on('shown.ui.modal', $.proxy(this.windowResizeEventListener, this))

                .on('hide.ui.modal', function () {
                    $(window).off('resize.ui.modal');
                })
                .on('click', this.ui.__uiString.moduleModalLayer__closing, function (event) {
                    event.preventDefault();
                    controller.hide();
                })
        },

        windowResizeEventListener: function(event){
            $(window).on('resize.ui.modal', function () {
                controller.element.position({
                    my: _options.style.position,
                    at: _options.style.position,
                    of: window,
                    using: function (pos) {
                        var topOffset = $(this).css(pos).offset();
                        if (topOffset.top < 20) { $(this).css("top", 20); }
                        if (topOffset.left < 20) { $(this).css("left", pos.left - topOffset.left); }
                    }
                });
            }).trigger('resize.ui.modal');
        },

        show: function(params){
            this.initialize();
            this.element.css(_options.style);

            var breforeEvt = $.Event('show.ui.modal', this.element),
                afterEvt = $.Event('shown.ui.modal', this.element),
                $body = $("body"),
                prevObj = $body.data("ui.Modal");

            this.element.trigger(breforeEvt);
            if (this.isShown || breforeEvt.isDefaultPrevented()) return;

            this.isShown = true;

            this.enforceFocus();

            prevObj && prevObj.hide && (prevObj !== this) && prevObj.hide();

            this.$backdrop = $('<div class="modal-backdrop"/>').appendTo("body");
            if (!this.element.parent().hasClass('modal-scrollArea')) {
                this.$layout = this.element.wrap('<div class="modal-scrollArea"/>').parent();
                this.$layout.appendTo('body');
            }

            $("html").addClass("modal-open");

            this.$backdrop.show();
            this.$layout.show();
            this.element.show().scrollTop(0).focus();

            $body.data("ui.Modal", this);
            if (params && params.escape) this.element.data("ui.modal.escape", params.escape);
            this.element.trigger(afterEvt);

            this.options.enableClickBackdrop && this.clickBackdrop();
        },

        hide : function () {
            var breforeEvt = $.Event('hide.ui.modal', this.element),
                afterEvt = $.Event('hidden.ui.modal', this.element);

            if (this.isShown == false) return false;

            this.element.trigger(breforeEvt);
            this.isShown = false;

            $(document).off('focusin.ui.modal');

            $("html").removeClass("modal-open");
            this.$backdrop.remove();
            this.element.trigger(afterEvt);
            this.$layout.remove();
        },


        getLayerContentHeight: function(){
            var layerHeight = this.element.height();
            var layerHeaderHeight = this.ui.moduleModalLayer__title.outerHeight();

            return layerHeight - layerHeaderHeight;
        },

        getContentWrap: function(){
            var contentHeight = this.getLayerContentHeight();
            return this.ui.moduleModalLayer__contents.height(contentHeight);
        },

        enforceFocus: function () {
            $(document)
                .off('focusin.ui.modal')
                .on('focusin.ui.modal', $.proxy(function (event) {
                    if (this.element[0] !== event.target && !this.element.has(event.target).length) {
                        this.element.trigger("focus");
                    }
                }, this));
        },

        clickBackdrop: function () {
            var that = this,
                flickingStart, isScroll,
                $back = this.element.add(this.$backdrop).add(this.$layout);

            $back
                .on("touchstart mousedown", function (e) {
                    $(document).off("touchmove mousemove", onMove).off("touchend mouseup", onEnd);
                    flickingStart = functions._coordinates(e);
                    isScroll = false;
                    $(document).on("touchmove mousemove", onMove).on("touchend mouseup", onEnd);
                });

            function onMove(e) {
                if (!isScroll && Math.abs(functions._coordinates(e)[0] - flickingStart[0]) >= 20) {
                    isScroll = true;
                }
            }

            function onEnd(e) {
                var dy = functions._coordinates(e)[0] - flickingStart[0],
                    dx = functions._coordinates(e)[1] - flickingStart[1];
                if (isScroll) {
                }
                if (Math.sqrt(dx * dx + dy * dy) < 3) {
                    $back.is(e.target) && that.hide();
                }
                $(document).off("touchmove touchend");
            }
        }
    };

    return controller;
};