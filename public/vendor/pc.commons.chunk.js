define(["jquery"], function(__WEBPACK_EXTERNAL_MODULE_5__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		5:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"./dist/memebox/pc/cart/cart","1":"./dist/memebox/pc/deal/deal","2":"./dist/memebox/pc/initialize","3":"./dist/memebox/pc/main/main","4":"./dist/memebox/pc/order/order"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(6);
	module.exports = __webpack_require__(39);


/***/ },

/***/ 5:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(5);

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

/***/ 37:
/***/ function(module, exports) {

	"use strict";

	module.exports = function (value) {
	    return JSON.stringify(value);
	};

/***/ },

/***/ 38:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
	    if (!value) {
	        return '0';
	    }
	    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

/***/ },

/***/ 39:
/***/ function(module, exports) {

	'use strict';

	// jquery: event.keyCode
	// http://www.cambiaresearch.com/articles/15/javascript-key-codes
	var keycodes = {
	    BACKSPACE: 8,
	    TAB: 9,

	    ENTER: 13,
	    ESCAPE: 27,
	    SPACE: 32,

	    SHIFT: 16,
	    CTRL: 17,
	    ALT: 18,

	    PAGE_UP: 33,
	    PAGE_DOWN: 34,

	    END: 35,
	    HOME: 36,
	    INSERT: 45,
	    DELETE: 46,

	    NUM_LOCK: 144,

	    CAPS_LOCK: 20,

	    LEFT_ARROW: 37,
	    UP_ARROW: 38,
	    RIGHT_ARROW: 39,
	    DOWN_ARROW: 40
	};

	var validCharArr = [
	// refer to http://jrgraphix.net/research/unicode_blocks.php
	' -\x7F', // Basic Latin
	'\u1100-\u11FF', // Hangul Jamo
	'\u3130-\u318F', // Hangul Compatibility Jamo
	'\uAC00-\uD7AF', // Hangul Syllables
	'\u4E00-\u9FFF', // CJK Unified Ideographs
	'\u3000-\u303F', // CJK Symbols and Punctuation
	'\uFF00-\uFFEF' // Halfwidth and Fullwidth Forms
	];

	var validate = {
	    keycodes: keycodes,

	    trim: function trim(str) {
	        var str = typeof str !== 'string' ? '' + str : str;
	        return str.replace(/(^\s*)|(\s*$)/g, "");
	    },
	    isNull: function isNull(obj) {
	        return obj === 0 ? false : !!obj ? false : true;
	    },
	    isNotNull: function isNotNull(obj) {
	        return !isNull(obj);
	    },
	    isEmpty: function isEmpty(obj) {
	        if (typeof obj == "string") {
	            return validate.trim(obj).length > 0 ? false : true;
	        }
	        return validate.isNull(obj);
	    },
	    isNotEmpty: function isNotEmpty(obj) {
	        return !this.isEmpty(obj);
	    },
	    isNumber: function isNumber(input) {
	        return typeof input === 'number' && isFinite(input);
	    },
	    isNumeric: function isNumeric(input) {
	        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
	        return RE.test(input);
	    },
	    isNumberByEvent: function isNumberByEvent(e) {
	        return e.which && (48 <= e.which && e.which <= 57 || e.which == keycodes.BACKSPACE);
	    },
	    defaultValue: function defaultValue(arg, _defaultValue) {
	        if (this.isEmpty(arg)) return _defaultValue;
	        return arg;
	    },
	    isKor: function isKor(str) {
	        str = validate.trim(str);
	        return (/^[가-힝]+$/.test(str)
	        );
	    },
	    isEng: function isEng(str) {
	        str = validate.trim(str);
	        return (/^[a-zA-Z]+$/.test(str)
	        );
	    },
	    isEmail: function isEmail(str) {
	        return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/.test(str)
	        );
	    },
	    isCellPhone: function isCellPhone(first, second, third) {
	        var cellPhoneNumber = first + "-" + second + "-" + third;
	        if (!this.isTel(cellPhoneNumber)) return false;
	        var secondPattern = "010" === first ? /\d{4}/ : /\d{3,4}/;
	        var thirdPattern = /\d{4}/;
	        var validSecond = secondPattern.test(second);
	        var validThird = thirdPattern.test(third);
	        if (validSecond && validThird) return true;
	        return false;
	    },
	    cellphoneByAll: function cellphoneByAll(cellphoneNumber) {
	        var cellphoneByAll = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
	        return cellphoneByAll.test(cellphoneNumber);
	    },
	    isSelected: function isSelected(selectValue) {
	        return selectValue.length > 0;
	    },
	    isTel: function isTel(val) {
	        var phonestr = /^\d{2,6}-\d{3,4}-\d{4}$/;
	        if (!phonestr.test(val)) return false;else return true;
	    },
	    isValidCharacters: function isValidCharacters(val) {
	        if (val != null && val != "") {
	            var formatStr = "^[" + validCharArr.join('') + "]*$";
	            var format = new RegExp(formatStr);
	            if (!format.test(val)) {
	                return false;
	            }
	        }
	        return true;
	    }
	};

	module.exports = validate;

/***/ }

/******/ })});;