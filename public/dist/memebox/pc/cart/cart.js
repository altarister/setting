define(function() { return webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//var $ = require('jquery');
	var utility = __webpack_require__(1);
	//var dealView = require('components/dealView/v.1.0.0/_dealView.jsx');
	//var menu = require('components/menu/v.1.0.0/_menu.jsx');
	// webpack 이면 풀어야 한다.
	// var zipcode = require('components/zipcode/v.1.0.0/_zipcode.jsx');
	// var layer_modal = require('modules/layer/modal/v.1.0.0/_modal.jsx');
	//require('modules/modal/v.1.0.0/_modal.jsx');
	//require('./cart.scss');

	var cart = function cart() {
	    var controller = {

	        element: '#memebox-service',
	        ui: {
	            components: '[data-component]',
	            zipcodeTrigger: '.memebox-altari-zipcode-trigger'
	        },

	        server: {
	            development: 'https://internal.memeboxlabs.com:8012',
	            production: 'http://contents-api.memeboxlabs.com',
	            stage: 'http://contents-api-stage.memeboxlabs.com'
	        },

	        initialize: function initialize() {
	            utility.uiEnhancements.call(this);
	            this.addEventListener();
	            this.ui.zipcodeTrigger.trigger('click');
	        },

	        addEventListener: function addEventListener() {
	            this.element.off().on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this));
	        },

	        zipcodeEvent: function zipcodeEvent() {
	            var layer_params = {
	                selector: {
	                    opener: '.memebox-altari-zipcode-trigger',
	                    wrapper: 'window',
	                    appendTarget: 'body'
	                },
	                style: {
	                    width: 520,
	                    height: 600,
	                    backgroundColor: 'white',
	                    position: 'center'
	                },
	                content: {
	                    title: '우편번호',
	                    hasCloseButton: true
	                }
	            };

	            var zipcode_params = {
	                requestUrl: {
	                    sido: this.server.stage + '/api/zipcode/sido',
	                    sigungu: this.server.stage + '/api/zipcode/sigungu',
	                    jibun: this.server.stage + '/api/zipcode/jibuns',
	                    range: this.server.stage + '/api/zipcode/ranges',
	                    road: this.server.stage + '/api/zipcode/roads'
	                },
	                contactUsUrl: {
	                    mobile: '//m.memebox.com/mypage/inquiry/write',
	                    pc: '//www.memebox.com/my/inquiry'
	                },
	                device: 'pc'
	            };
	            this.layerModal = new layer_modal(layer_params);
	            this.layerModal.show();
	            this.zipcode = new zipcode(this.collBackZipcode, this.layerModal.getContentWrap(), zipcode_params);
	        },

	        zipcode: null,
	        layerModal: null,

	        collBackZipcode: function collBackZipcode(data) {
	            console.log('data ++++++++++ ', data, ' ++++++++');
	            //db저장 //
	            controller.ui.zipcodeValue.text(data.zipcode);
	            controller.ui.addressValue.text(data.roads);
	            controller.layerModal.hide();
	            controller.layerModal = null;
	            controller.zipcode = null;
	            console.log('%%%%%%%%%%%%%%%%%%%%%%%', data);
	        },

	        makeMenu: function makeMenu() {
	            new menu();
	        }
	    };
	    controller.initialize();
	};

	module.exports = cart;

/***/ }
])});;