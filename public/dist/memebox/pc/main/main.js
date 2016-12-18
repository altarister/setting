define(["jquery"], function(__WEBPACK_EXTERNAL_MODULE_2__) { return webpackJsonp([3,14],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var utility = __webpack_require__(3);

	__webpack_require__(67);

	var main = function main() {
	    var controller = {

	        element: '#memebox-service',
	        ui: {},

	        initialize: function initialize() {
	            utility.uiEnhancements.call(this);
	            this.addEventListener();
	        },

	        addEventListener: function addEventListener() {
	            // this.element.off()
	            //     .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
	        }

	    };
	    controller.initialize();
	};

	module.exports = main;

/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);

	var utility = {
	    // element의 data를 json 형식으로 리턴한다.
	    data: function data(element, attributeName) {
	        var data = $(element).data(attributeName);

	        if (typeof data === 'string') {
	            try {
	                data = $.parseJSON(data);
	            } catch (err) {}
	        }
	        return data;
	    },

	    // 단순한 dom 요소 선택을 위한 용도
	    uiEnhancements: function uiEnhancements(element) {
	        var $element = $(this.element || element || document),
	            uiObject = this.ui || this;

	        // dom 갱신되는 경우에 다시 dom을 탐색하기 위해서 string객체저장
	        if (!uiObject.__uiString) {
	            uiObject.__uiString = $.extend(true, {}, uiObject);
	        }

	        if (this.ui) {
	            this.element = $element;
	        }
	        for (var key in uiObject.__uiString) {
	            if (key !== "__uiString") {
	                uiObject[key] = typeof uiObject.__uiString[key] === "function" ? uiObject.__uiString[key]() : $element.find(uiObject.__uiString[key]);
	            }
	        }

	        return {
	            element: $element,
	            ui: uiObject,
	            getSelector: function getSelector(key) {
	                return uiObject.__uiString[key];
	            }
	        };
	    },

	    cssRedraw: function cssRedraw(selector) {
	        $(selector).offset();
	    },

	    event: function event() {
	        var o = $({});
	        $.subscribe = function () {
	            o.on.apply(o, arguments);
	        };
	        $.unsubscribe = function () {
	            o.off.apply(o, arguments);
	        };
	        $.publish = function () {
	            o.trigger.apply(o, arguments);
	        };

	        window.publish = function () {
	            o.trigger.apply(o, arguments);
	        };
	    },

	    price: {
	        /**
	         * 숫자를 3자리씩 점을 찍어 통화 단위로 리턴
	         * @param number
	         * @returns string
	         */
	        addComma: function addComma(number) {
	            var reg = /(^[+-]?\d+)(\d{3})/;
	            if (isNaN(number)) {
	                return 0;
	            }
	            number += '';
	            while (reg.test(number)) {
	                number = number.replace(reg, '$1' + ',' + '$2');
	            }
	            return number;
	        },

	        /**
	         * ,이 있는 통화 단위를 숫자로 리턴
	         * @param string
	         * @returns number
	         */
	        removeComma: function removeComma(string) {
	            var value;
	            string = string.replace(/[^-\d]/g, "");
	            value = isNaN(string) ? 0 : Number(string);
	            return value;
	        }
	    },

	    cookie: {
	        /**
	         * 쿠키 생성하기
	         * @param name
	         * @param value
	         * @param max_age 시간(1시간)단위, 값이 없는 경우 Session 종료시 캐시값도 같이 삭제됨
	         * @param path
	         * @param domain
	         */
	        set: function set(name, value, max_age, path, domain) {
	            var cookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=" + (path ? path : "/") + "; domain=" + (domain ? domain : document.domain);

	            // max_age 값이 있는 경우만 저장일을 설정하고
	            // max_age 값이 없는 경우 Session 종료될때 쿠키도 삭제될 수 있도록 설정
	            if (max_age) {
	                var today = new Date();
	                var expires = new Date();
	                expires.setTime(today.getTime() + 1000 * 60 * 60 * max_age);
	                cookieString += "; expires=" + expires.toGMTString();
	            }
	            document.cookie = cookieString;
	        },
	        get: function get(name) {
	            var allCookies = document.cookie;
	            var strCnt = name.length;
	            var pos = allCookies.indexOf(name + "=");

	            if (pos == -1) return undefined;

	            var start = pos + strCnt + 1;
	            var end = allCookies.indexOf(";", start);
	            if (end == -1) end = allCookies.length;
	            var value = allCookies.substring(start, end);
	            return decodeURIComponent(value);
	        },
	        /**
	         * set 메소드와 같은 param 를 가진다.
	         * @param name
	         * @param path
	         * @param domain
	         */
	        remove: function remove(name, path, domain) {
	            path = path ? path : "/";
	            domain = domain ? domain : document.domain;
	            utility.cookie.set(name, "", -1, path, domain);
	        }
	    },

	    cursor: {
	        setPosition: function setPosition($tag, position) {
	            $tag.each(function () {
	                if (this.setSelectionRange) {
	                    this.focus();
	                    this.setSelectionRange(position.start, position.end);
	                } else if (this.createTextRange) {
	                    var range = this.createTextRange();
	                    range.collapse(true);
	                    range.moveEnd('character', position.end);
	                    range.moveStart('character', position.start);
	                    range.select();
	                }
	            });
	        },
	        getPosition: function getPosition($tag) {
	            var tag = $tag.get(0);
	            var position = { start: 0, end: 0 };

	            // ie 10 이상 & 그외 브라우저.
	            if (tag.selectionStart) {
	                position.start = tag.selectionStart;
	                position.end = tag.selectionEnd;
	            }

	            // ie 9 이하.
	            else if (document.selection) {
	                    var range = document.selection.createRange();

	                    var copyRange = range.duplicate();
	                    copyRange.expand("textedit");
	                    copyRange.setEndPoint("EndToEnd", range);

	                    var start = copyRange.text.length - range.text.length;
	                    var end = start - range.text.length;

	                    position.start = parseInt(start);
	                    position.end = parseInt(end);
	                }
	            return position;
	        }
	    }
	};

	module.exports = utility;

/***/ },

/***/ 67:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"layout-structure-content":"layout-structure-content"};

/***/ }

})});;