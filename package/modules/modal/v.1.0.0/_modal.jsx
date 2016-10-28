var $ = require('jquery');
require('jquery.ui.position');
require('./_modal.scss');

var Modal = function (_element, _options) {
    this.isShown = false;
    this.options = _options;

    this.$element = $(_element);

    this.$backdrop = null;
    this.$layout = null;

    this.options.enableModalFocus && this.$element.attr("tabindex", 0);
    this.$element.on("click", ".modal-close", $.proxy(function (e) {
        e.preventDefault();
        this.hide();
    }, this));
};

Modal.DEFAULTS = {
    enableModalFocus: false,
    enableClickBackdrop: false
};

Modal.prototype.show = function (params) {
    console.log('params = ',params)
    var breforeEvt = $.Event('show.ui.modal', this.$element),
        afterEvt = $.Event('shown.ui.modal', this.$element),
        $body = $("body"),
        prevObj = $body.data("ui.Modal");

    this.$element.trigger(breforeEvt);
    if (this.isShown || breforeEvt.isDefaultPrevented()) return;

    this.isShown = true;

    this.enforceFocus();

    prevObj && prevObj.hide && (prevObj !== this) && prevObj.hide();

    this.$backdrop = $('<div class="modal-backdrop"/>').appendTo("body");
    if (!this.$element.parent().hasClass('modal-scrollArea')) {
        this.$layout = this.$element.wrap('<div class="modal-scrollArea"/>').parent();
        this.$layout.appendTo('body');
    }

    $("html").addClass("modal-open");

    this.$backdrop.show();
    this.$layout.show();
    this.$element.show().scrollTop(0).focus();

    $body.data("ui.Modal", this);
    if (params && params.escape) this.$element.data("ui.modal.escape", params.escape);
    this.$element.trigger(afterEvt);

    this.options.enableClickBackdrop && this.clickBackdrop();
};

Modal.prototype.hide = function (params) {
    var breforeEvt = $.Event('hide.ui.modal', this.$element),
        afterEvt = $.Event('hidden.ui.modal', this.$element);

    if (this.isShown == false) return false;

    this.$element.trigger(breforeEvt);
    this.isShown = false;

    $(document).off('focusin.ui.modal');

    $("html").removeClass("modal-open");
    this.$backdrop.remove();
    this.$layout.hide();

    this.$element.trigger(afterEvt);
    $(params && params.escape || this.$element.data("ui.modal.escape") || {}).trigger('focus');
};

Modal.prototype.empty = function (params) {
    var breforeEvt = $.Event('hide.ui.modal', this.$element),
        afterEvt = $.Event('hidden.ui.modal', this.$element);

    this.$element.find('iframe').prop('src','');
    if (this.isShown == false) return false;

    this.$element.trigger(breforeEvt);
    this.isShown = false;

    $(document).off('focusin.ui.modal');

    $("html").removeClass("modal-open");
    this.$backdrop.remove();
    this.$layout.hide();

    this.$element.trigger(afterEvt);
    $(params && params.escape || this.$element.data("ui.modal.escape") || {}).trigger('focus');
};

Modal.prototype.enforceFocus = function () {
    $(document)
        .off('focusin.ui.modal')
        .on('focusin.ui.modal', $.proxy(function (e) {
            if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                this.$element.trigger("focus");
            }
        }, this));
};

Modal.prototype.clickBackdrop = function () {
    var that = this,
        flickingStart, isScroll,
        $back = this.$element.add(this.$backdrop).add(this.$layout);

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
};

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

$.fn.modal = function (method, _params) {
    var arg = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
        var $this = $(this),
            data = $this.data('ui.modal'),
            options = $.extend({}, Modal.DEFAULTS, $this.data(), (typeof _params == 'object') && _params);

        if (!data) $this.data('ui.modal', (data = new Modal(this, options)));
        if (typeof method == 'string') data[method].apply(data, arg);
        else data.show.apply(data, arg);
    });
};