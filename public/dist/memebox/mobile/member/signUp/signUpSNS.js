define(function() { return webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var utility = __webpack_require__(2);
	var Menu = __webpack_require__(3);

	__webpack_require__(61);

	var SignUpSNS = function SignUpSNS() {
	    var controller = {

	        element: '#memebox-service',
	        ui: {},

	        initialize: function initialize() {
	            new Menu();
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

/***/ 61:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"easy-signUp-SNS":"easy-signUp-SNS","easy-signUp-SNS-list":"easy-signUp-SNS-list","easy-signUp-SNS-email":"easy-signUp-SNS-email","easy-signUp-SNS-naver":"easy-signUp-SNS-naver","easy-signUp-SNS-facebook":"easy-signUp-SNS-facebook","easy-signUp-SNS-kakao":"easy-signUp-SNS-kakao","easy-signUp-SNS-text":"easy-signUp-SNS-text"};

/***/ }

})});;