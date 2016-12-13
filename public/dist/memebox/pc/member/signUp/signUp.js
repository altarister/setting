define(function() { return webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(2);
	var utility = __webpack_require__(3);
	var Menu = __webpack_require__(1);

	__webpack_require__(62);
	__webpack_require__(63);

	var SignUp = function SignUp() {
	    var controller = {

	        element: '#memebox-service',
	        ui: {
	            emailSelect: '.signUp-email-wrap .select-design-viewer-option-selector',
	            emailSelectBox: '.signUp-email-wrap .select-design-viewer-list',
	            emailSelectOption: '.signUp-email-wrap .signUp-email-host-option',

	            emailHost: '.signUp-email-input-host'
	        },

	        initialize: function initialize() {
	            new Menu();
	            utility.uiEnhancements.call(this);
	            this.addEventListener();
	        },

	        addEventListener: function addEventListener() {
	            this.element.off().on('click', this.ui.__uiString.emailSelect, $.proxy(this.emailSelectEvent, this)).on('click', this.ui.__uiString.emailSelectOption, $.proxy(this.emailSelectOptionEvent, this));
	        },

	        emailSelectEvent: function emailSelectEvent(event) {
	            this.ui.emailSelectBox.toggle();
	        },

	        emailSelectOptionEvent: function emailSelectOptionEvent(event) {
	            var $element = $(event.currentTarget);
	            var elementText = $element.data('value');
	            this.ui.emailHost.val(elementText);
	            this.ui.emailSelectBox.toggle();
	        }

	    };
	    controller.initialize();
	};

	module.exports = SignUp;

/***/ },

/***/ 62:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"memebox-service":"memebox-service","validate-message":"validate-message","signUp-SNS-wrap":"signUp-SNS-wrap","signUp-SNS-confirmation":"signUp-SNS-confirmation","signUp-SNS-icon-email":"signUp-SNS-icon-email","signUp-SNS-icon-naver":"signUp-SNS-icon-naver","signUp-SNS-icon-facebook":"signUp-SNS-icon-facebook","signUp-SNS-icon-kakao":"signUp-SNS-icon-kakao","signUp-SNS-information-wrap":"signUp-SNS-information-wrap","signUp-SNS-contactUs":"signUp-SNS-contactUs","module-tooltip-hover":"module-tooltip-hover","module-tooltip-hover-content-wrap":"module-tooltip-hover-content-wrap","module-tooltip-hover-trigger":"module-tooltip-hover-trigger","module-tooltip-hover-arrow":"module-tooltip-hover-arrow","signUp-form":"signUp-form","signUp-form-required":"signUp-form-required","signUp-form-optional":"signUp-form-optional","signUp-form-agreement":"signUp-form-agreement","signUp-form-required-title":"signUp-form-required-title","signUp-form-optional-title":"signUp-form-optional-title","signUp-form-agreement-title":"signUp-form-agreement-title","signUp-form-required-ul":"signUp-form-required-ul","signUp-form-optional-ul":"signUp-form-optional-ul","signUp-form-required-li":"signUp-form-required-li","signUp-form-optional-li":"signUp-form-optional-li","signUp-name-label":"signUp-name-label","signUp-name-input":"signUp-name-input","signUp-email-wrap":"signUp-email-wrap","signUp-email-label":"signUp-email-label","signUp-email-at-sign":"signUp-email-at-sign","signUp-email-input-id":"signUp-email-input-id","signUp-email-input-host":"signUp-email-input-host","signUp-email-host-select":"signUp-email-host-select","signUp-email-host-option":"signUp-email-host-option","signUp-password-label":"signUp-password-label","signUp-password-input":"signUp-password-input","signUp-password-confirm-label":"signUp-password-confirm-label","signUp-password-confirm-input":"signUp-password-confirm-input","signUp-cellphone-wrap":"signUp-cellphone-wrap","signUp-cellphone-label":"signUp-cellphone-label","signUp-cellphone-input":"signUp-cellphone-input","signUp-cellphone-certification":"signUp-cellphone-certification","signUp-recommendUser-label":"signUp-recommendUser-label","signUp-recommendUser-input":"signUp-recommendUser-input","signUp-form-agreement-ul":"signUp-form-agreement-ul","signUp-form-agreement-li":"signUp-form-agreement-li","agreement-memeboxUse":"agreement-memeboxUse","agreement-privacy":"agreement-privacy","agreement-thirdParty":"agreement-thirdParty","agreement-overFourteen":"agreement-overFourteen","agreement-memeboxUse-checkbox":"agreement-memeboxUse-checkbox","agreement-privacy-checkbox":"agreement-privacy-checkbox","agreement-thirdParty-checkbox":"agreement-thirdParty-checkbox","agreement-overFourteen-checkbox":"agreement-overFourteen-checkbox","agreement-memeboxUse-label":"agreement-memeboxUse-label","agreement-privacy-label":"agreement-privacy-label","agreement-thirdParty-label":"agreement-thirdParty-label","agreement-overFourteen-label":"agreement-overFourteen-label","terms-view-trigger":"terms-view-trigger","signUp-form-controller":"signUp-form-controller","signUp-form-submit":"signUp-form-submit","signUp-terms":"signUp-terms","signUp-terms-ul":"signUp-terms-ul","signUp-terms-li":"signUp-terms-li","signUp-terms-title":"signUp-terms-title","signUp-terms-content-text":"signUp-terms-content-text","signUp-terms-content-table":"signUp-terms-content-table"};

/***/ },

/***/ 63:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"select-design-viewer":"select-design-viewer","select-design-viewer-option-selector":"select-design-viewer-option-selector","value":"value","trigger":"trigger","select-design-viewer-option-box":"select-design-viewer-option-box","select-design-viewer-list":"select-design-viewer-list","select-design-viewer-option":"select-design-viewer-option"};

/***/ }

})});;