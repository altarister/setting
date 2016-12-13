define(function() { return webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var utility = __webpack_require__(3);
	var Menu = __webpack_require__(1);
	var Header = __webpack_require__(64);

	__webpack_require__(66);

	var SignUpSNS = function SignUpSNS() {
	    var controller = {

	        element: '#memebox-service',
	        ui: {},

	        initialize: function initialize() {
	            new Menu();
	            new Header();
	            utility.uiEnhancements.call(this);
	        },

	        addEventListener: function addEventListener() {
	            this.element.off().on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this));
	        }
	    };
	    controller.initialize();
	};

	module.exports = SignUpSNS;

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var utility = __webpack_require__(3);

	__webpack_require__(65);

	var header = function header() {
	    var controller = {

	        element: '#memebox-service',
	        ui: {},

	        initialize: function initialize() {
	            console.log('pc - header');
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

	module.exports = header;

/***/ },

/***/ 65:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"header-top-content":"header-top-content","header-status-wrap":"header-status-wrap","app-down-trigger":"app-down-trigger","header-status-review":"header-status-review","header-status-review-li":"header-status-review-li","header-user-menus":"header-user-menus","header-user-menu-li":"header-user-menu-li","header-main-content":"header-main-content","searchBar-wrap":"searchBar-wrap","header-rolling-arrow-banner":"header-rolling-arrow-banner","header-gnb-content":"header-gnb-content","header-gnb-category":"header-gnb-category","header-gnb-content-ul":"header-gnb-content-ul","header-gnb-content-li":"header-gnb-content-li","select-layer":"select-layer","select-layer-ul":"select-layer-ul"};

/***/ },

/***/ 66:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"easy-signUp-SNS":"easy-signUp-SNS","easy-signUp-SNS-list":"easy-signUp-SNS-list","easy-signUp-SNS-email":"easy-signUp-SNS-email","easy-signUp-SNS-naver":"easy-signUp-SNS-naver","easy-signUp-SNS-facebook":"easy-signUp-SNS-facebook","easy-signUp-SNS-kakao":"easy-signUp-SNS-kakao","easy-signUp-SNS-text":"easy-signUp-SNS-text"};

/***/ }

})});;