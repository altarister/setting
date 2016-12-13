define(function() { return webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var utility = __webpack_require__(2);

	__webpack_require__(59);

	var main = function main() {
	    var controller = {

	        element: '#memebox-service',
	        ui: {},

	        initialize: function initialize() {
	            utility.uiEnhancements.call(this);
	            //new header();
	            new footer();
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

/***/ 59:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

})});;