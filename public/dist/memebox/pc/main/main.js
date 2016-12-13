define(function() { return webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var utility = __webpack_require__(3);

	__webpack_require__(61);

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

/***/ 61:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"layout-structure-content":"layout-structure-content"};

/***/ }

})});;