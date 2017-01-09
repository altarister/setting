var $ = require('jquery');
var utility = require('utility');

var verification_templates = {
    identity: require('components/verification/identity/v.1.0.0/trigger.hbs')
};

require('./trigger.scss');

var trigger = function ($element, result) {
    var controller = {

        element: $element,
        ui: {
            identityVerification: '.identity-verification'
        },

        API: {
            ownership: ''
        },

        message: {
            AJAX_ERROR: 'ajax 실패 ',
            SYSTEM_CELLPHONE_ERROR: '번호인증 전송이 실패했습니다. 잠시 후 다시 시도해 주세요.',
            SYSTEM_VERIFICATION_ERROR: '인증번호 전송이 실패했습니다. 잠시 후 다시 시도해 주세요.',
            EMPTY: '필수 입력란입니다.'
        },

        verification: {
            "window": "true",
                "url": "/member/verification",
                "title": "verification",
                "size": {
                "width": "1000",
                    "height": "690"
            }
        },

        interval: null,

        initialize: function(){
            this.makeElement();
            utility.uiEnhancements.call(controller);
            this.addEventListener();
        },

        makeElement: function(){
            var template = verification_templates.identity(result);
            $element.empty().append(template);
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.identityVerification, $.proxy(this.identityEvent,this));
        },

        identityEvent:function(event){
            console.log('본인 인증');
            event.preventDefault();
            var $element = $(event.currentTarget);
            var popupData = $element.data('popup');
            var params = [
                'menubar=no',
                'scrollbars=no',
                'status=no',
                'width='+popupData.size.width,
                'height='+popupData.size.height
            ];
            var service = 'memebox';
            var popupObject = window.open(popupData.url, service, params.join(','));

            if (popupObject && popupObject.focus) {
                popupObject.focus();
            }
        }
    };
    controller.initialize();
    return controller;
};

module.exports = trigger;