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
    var controller = {

        element: null,

        ui: {
            moduleModalLayer__contents: '.module-layer-modal__contents',
            moduleModalLayer__title: '.module-layer-modal-title',
            moduleModalLayer__closing: '.module-layer-modal-closing',
            moduleModalLayer__controller: '.module-layer-modal-controller'
        },

        targetElement: {
            opener: _options.selector.opener ? _options.selector.opener : '.dialogue-modal-trigger',
            wrapper: _options.selector.wrapper ? _options.selector.wrapper : 'window',
            append: _options.selector.appendTarget ? _options.selector.appendTarget : 'body',
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
            $(this.targetElement.append).append(this.element);
            console.log(2)
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
            console.log('export-----------------------')
            $(window).on('resize.ui.modal', function () {
                console.log('+++++++++++', controller.element)
                console.log('+++++++++++', $.position)
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
            this.element.css(_options.style);

            console.log('params = ',params);
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

        hide : function (params) {
            var breforeEvt = $.Event('hide.ui.modal', this.element),
                afterEvt = $.Event('hidden.ui.modal', this.element);

            if (this.isShown == false) return false;

            this.element.trigger(breforeEvt);
            this.isShown = false;

            $(document).off('focusin.ui.modal');

            $("html").removeClass("modal-open");
            this.$backdrop.remove();
            this.$layout.hide();
            this.element.empty();

            this.element.trigger(afterEvt);
            $(params && params.escape || this.element.data("ui.modal.escape") || {}).trigger('focus');
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

    controller.initialize();
    return controller;
};