var $ = require('jquery');
var utility = require('utility');
var validate = require('validate');

var verification_templates = {
    //error: require('./_templates/_error.hbs'),
    cellphone: require('./_templates/cellphone.hbs'),
    identity: require('components/verification/identity/v.1.0.0/trigger.hbs')
};

require('device/cellphone.scss');

var HasCellphone = function ($element, callbackFunction, requestData) {
    var controller = {

        element: $element,
        ui: {
            certificationTime: '.cellphone-certification-remaining-time',
            input: '.cellphone-certification-input',
            certification: '.cellphone-certification-wrap',
            certificationStart: '.cellphone-certification-start',
            certificationEnd: '.cellphone-certification-end',
            remainingTimeWrap: '.cellphone-certification-remaining-time-wrap'
        },

        API: {
            confirmRepetition: '/ajax',
            verification: '/verification',
            checkRedundantMembership: '/member/checkRedundantMembership',
            checkTheReceivedCharacter: '/member/checkTheReceivedCharacter',
            ownership: ''
        },

        message: {
            AJAX_ERROR: 'ajax 실패 ',
            SYSTEM_CELLPHONE_ERROR: '번호인증 전송이 실패했습니다. 잠시 후 다시 시도해 주세요.',
            SYSTEM_VERIFICATION_ERROR: '인증번호 전송이 실패했습니다. 잠시 후 다시 시도해 주세요.',
            EMPTY: '필수 입력란입니다.'
        },

        interval: null,

        initialize: function(){
            this.openEvent();
        },

        addEventListener: function(){
            this.element.off()
                 .on('click', this.ui.__uiString.certificationStart, $.proxy(this.verificationStart,this));
        },

        openEvent: function(){
            console.log('서버에 전화 번호 넘김1');
            $.ajax({
                url: this.API.checkRedundantMembership,
                data: requestData
            }).done(function(result){
                if(result.status === 'success'){
                    controller.makeElement(result)
                }else{
                    alert('fail')
                }
            }).fail(function() {
                alert(controller.message.SYSTEM_CELLPHONE_ERROR);
            });
        },

        makeElement: function(result){
            var template = '';

            if(result.hasNumber){
                console.log('동일 폰이 있음. 본인인증 필요');
                template = verification_templates.identity(result);
                console.log('result.hasNumber',result.hasNumber)
                $element.empty().append(template);
                utility.uiEnhancements.call(controller);
            }else{
                console.log('동일 폰 없음. 인증번호 문자 발송');
                template = verification_templates.cellphone();
                console.log('타이머 시작');
                $element.empty().append(template);
                utility.uiEnhancements.call(controller);
                this.setTimer(result.remainingTime);
            }
            //문자 발송..
            this.addEventListener();
        },

        verificationAjax: function(value){
            console.log('서버에 폰으로 받은 문자 넘김');
            $.ajax({
                url: this.API.checkTheReceivedCharacter,
                data: value
            }).done(function(result){
                if(result.status === 'success'){
                    controller.verificationEnd(true, result)
                }else{
                    alert('fail')
                }
            }).fail(function(result) {
                alert(controller.message.SYSTEM_VERIFICATION_ERROR);
            });
        },

        verificationStart: function(){
            var value = this.ui.input.val();
            if(validate.isEmpty(value)){
                alert(this.message.EMPTY);
            }else{
                this.verificationAjax(value)
                console.log('verificationCellphone start');
                console.log('api 에 값요청');
            }
        },

        verificationEnd: function(isInsideCall, result){

            clearInterval(this.interval);
            if(isInsideCall){
                //var data = {success:value};
                callbackFunction(result);
            }
        },

        setTimer: function(remainingTime){
            this.interval = setInterval(function () {
                controller.displayTimer(--remainingTime);
                if (remainingTime < 0) {
                    controller.verificationEnd(true);
                }
            }, 1000);
            this.displayTimer(remainingTime);
        },

        displayTimer: function(remainingTime){
            var minutes = parseInt((remainingTime / 60) % 60, 10);
            var seconds = parseInt(remainingTime % 60, 10);

            seconds = seconds < 10 ? "0" + seconds : seconds;

            this.ui.certificationTime.text(minutes + ":" + seconds);
        },

        validate: function($element){
            var value = validate.trim($element.val());
            var name = $element.prop('name');
            var message = null;
            var isValidate = true;

            this.displayValidateMessage($element, isValidate, message);
            return isValidate;
        },

        displayValidateMessage: function($element, isValidate, message){
            var name = $element.prop('name');
            var $wrap = $element.closest('.'+$element.data('required-wrap'));
            if(!message){
                message = $element.data('required-message');
            }
            var $validate = $wrap.siblings('.validate-message');
            if(isValidate){
                $validate.hide();
            }else{
                $validate.text(message).show();
            }
        }
    };
    controller.initialize();
    return controller;
};

module.exports = HasCellphone;