var $ = require('jquery');
var utility = require('utility');
var validate = require('validate');
var Verification_hasCellphone = require('components/verification/cellphone/v.1.0.0/cellphone.jsx');
var validatePassword = require('modules/util/validate/password/v.1.0.0/_password.jsx');

require('./enterUserInformation.scss');
require('./signUpHeader/signUpHeader.scss');

var EnterUserInformation = function () {
    var controller = {

        element: '#memebox-service',
        ui: {
            param_name: '[name=name]'
            ,param_email: '[name=email]'
            ,param_password: '[name=password]'
            ,param_confirm: '[name=confirm]'
            ,param_cellphone: '[name=cellphone]'
            ,param_recommendUser: '[name=recommendUser]'
            ,param_required: '[data-required="true"]'

            ,form: '.signUp-form'
            ,certificationTrigger: '.signUp-cellphone-certification-trigger'
            ,certificationEnd: '.cellphone-certification-end'
            ,certificationContent: '.signUp-cellphone-certification-content'
            ,submit: '.signUp-form-submit'
            ,hostSelect : '.signUp-email-host-select'
        },

        message: {
            EMPTY: '필수 입력란입니다.',
            VERIFICATION: '인증을 하여야 합니다.'
        },

        API: {
            recommendUser : '/recommendUser',
            validateRegisterUser: '/signup/validateRegisterUser'
        },

        // 인증 object
        verification_hasCellphone: null,

        // 초기화
        initialize: function(){
            utility.uiEnhancements.call(this);
            this.ui.submit.prop('disabled', false);
            this.addEventListener();
        },

        // 이벤트 등록
        addEventListener: function(){
            this.element.off()
                .on('focusin focusout', this.ui.__uiString.param_name, $.proxy(this.requiredFocusEvent,this))
                .on('focusin focusout', this.ui.__uiString.param_email, $.proxy(this.requiredFocusEvent,this))
                .on('change', this.ui.__uiString.hostSelect, $.proxy(this.hostSelectEvent,this))
                .on('focusin focusout', this.ui.__uiString.param_password, $.proxy(this.requiredFocusEvent,this))
                .on('keyup', this.ui.__uiString.param_password, $.proxy(this.passwordKeyEvent,this))
                .on('focusin focusout', this.ui.__uiString.param_confirm, $.proxy(this.requiredFocusEvent,this))
                .on('focusin focusout', this.ui.__uiString.param_cellphone, $.proxy(this.requiredFocusEvent,this))
                .on('keydown', this.ui.__uiString.param_cellphone, $.proxy(this._allowOnlyNumber,this))
                .on('keyup', this.ui.__uiString.param_cellphone, $.proxy(this.cellphoneKeyEvent,this))
                .on('click', this.ui.__uiString.certificationTrigger, $.proxy(this.verificationCellphoneTriggerEvent,this))
                .on('focusin focusout', this.ui.__uiString.param_recommendUser, $.proxy(this.requiredFocusEvent,this))

                .on('submit', this.ui.__uiString.form, $.proxy(this.submitEvent,this));
        },

        // 포커스 이벤트
        requiredFocusEvent: function(event){
            var $element = $(event.currentTarget);

            switch (event.type) {
                case 'focusin':
                    this.displayValidateMessage($element, true, '');
                    break;
                case 'focusout':
                    this.validate($element
                        .data('validate','')
                        .data('runValidate',true));
                    break;
                default:
                    alert('event error');
                    break;
            }
        },

        // 이메일 호스트 변경
        hostSelectEvent: function(event){
            this.makeEmailText($(event.currentTarget).val())
        },

        // 비밀번호 입력
        passwordKeyEvent: function(event){
            var $element = $(event.currentTarget);
            var temp = $element.val();
            var value = temp.replace(/(\s)/g, '');

            $element.val(value);
        },

        // 휴대폰번호 포커스 인 event
        cellphoneFocusInEvent: function(event){
            var $element = $(event.currentTarget);

            this.cellphoneKeyEvent(event);
            if(this.verification_hasCellphone){
                this.verification_hasCellphone.verificationEnd();
            }
            this.hideVerificationCellphone();
            this.validate($element);
            this.displayValidateMessage($(event.currentTarget), true, '');
        },

        // 휴대폰 폰번호 형식
        cellphoneKeyEvent: function(event){
            var $element = $(event.currentTarget);
            var value = $element
                .val()
                .replace(/-/g, '')
                .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
            $element.val(value);
            this.validate($element);
        },

        // 휴대전화
        cellphoneFocusOutEvent: function(event){
            $(event.currentTarget).data('runValidate',true);
            this.cellphoneKeyEvent(event);
        },

        // 번호 인증
        verificationCellphoneTriggerEvent: function(event){
            event.preventDefault();
            this.verification_hasCellphone = new Verification_hasCellphone(
                this.ui.certificationContent,
                this.hideVerificationCellphone,
                {cellphoneNumber: this.ui.param_cellphone.val()}
            );
            this.ui.certificationContent.show();
            this.ui.certificationTrigger.hide();
        },

        // 인증 영역 숨김
        hideVerificationCellphone: function(data){
            controller.verification_hasCellphone = null;
            controller.ui.certificationContent.empty().hide();
            if(data){
                if(data.success){
                    controller.ui.certificationTrigger.hide();
                    controller.ui.certificationEnd.show();
                    controller.ui.param_cellphone.prop('disabled', true);
                    controller.validate(controller.ui.param_cellphone);
                }else{
                    controller.ui.certificationTrigger.show();
                }
            }else{
                controller.ui.certificationTrigger.hide();
            }
        },

        // 이메일 호스트 선택시 input value 변경
        makeEmailText: function(host){
            var currentEmailValue = this.ui.param_email.val();
            var emailId = currentEmailValue.replace(/@.*/, '');
            var cursorPosition = emailId.length;
            var madeEmailValue = emailId + host;

            this.ui.param_email.val(madeEmailValue);
            this.setSelectionRange(this.ui.param_email.get(0), cursorPosition, cursorPosition);
        },

        // 이메일 호스트 선택시 커서 위치 변경.
        setSelectionRange: function(input, selectionStart, selectionEnd) {
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(selectionStart, selectionEnd);
            }
            else if (input.createTextRange) {
                var range = input.createTextRange();
                range.collapse(true);
                range.moveEnd('character', selectionEnd);
                range.moveStart('character', selectionStart);
                range.select();
            }
        },

        // 유효 검증
        validate: function($element){
            var value = validate.trim($element.val());
            var name = $element.prop('name');
            var isValidate = true;
            var elementData = $element.data();
            var message = elementData.requiredMessage;

            switch (name){
                case 'name':
                    if(value.length <= 1 || !validate.isName(value)){
                        isValidate = false;
                    }
                    break;
                case 'email':
                    if(!validate.isEmail(value)){
                        isValidate = false;
                    }else{
                        message = '';
                        if(elementData.validate === ''){
                            controller.ajaxRegisterEmail();
                            isValidate = false;
                        }else{
                            if(!elementData.validate){
                                $element.data('runValidate',false);
                                isValidate = false;
                            }else{
                            }
                        }
                    }
                    break;
                case 'password':
                    if(value.length < 6 || value.length > 15 || !validatePassword.validatePassword(value)){
                        isValidate = false;
                    }
                    break;
                case 'confirm':
                    if(this.ui.param_password.val() !== value){
                        isValidate = false;
                    }else if(validate.isEmpty(value)){
                        message = this.message.EMPTY;
                        isValidate = false;
                    }
                    break;
                case 'cellphone':
                    if(!validate.cellphoneByAll(value)){
                        this.ui.certificationTrigger.hide();
                        isValidate = false;
                    }else{
                        if(this.ui.certificationContent.is(':visible')){
                            this.ui.certificationTrigger.hide();
                        }else{
                            this.ui.certificationTrigger.show();
                        }
                    }
                    break;
                case 'verification':
                    if(!this.ui.param_cellphone.prop('disabled')){
                        message = this.message.VERIFICATION;
                        isValidate = false;
                    }
                    break;
                case 'recommendUser':
                    if(!validate.isEmpty(value)){
                        message = '';
                        if(elementData.validate === ''){
                            this.ajaxRecommendUser();
                            isValidate = false;
                        }else{
                            if(!elementData.validate){
                                $element.data('runValidate',false);
                                isValidate = false;
                            }
                        }
                    }
                    break;
            }
            if(elementData.runValidate){
                this.displayValidateMessage($element, isValidate, message);
            }else{
                isValidate = false;
            }
            return isValidate;
        },

        // 중복 이메일 서버 체크
        ajaxRegisterEmail: function(){
            var $element = this.ui.param_email;
            var isValidate = false;

            $.ajax({
                url: this.API.validateRegisterUser,
                data: $element.val()
            }).done(function(result){
                controller.doneAjaxEmail(result, $element, isValidate);
            }).fail(function() {
                var random = Math.floor(Math.random() * 2);
                var result = {
                    status:'success',
                    isRegisterEmail: (random > 0)? true : false,
                    message: (random > 0)? 'ajax 중복된 아이디입니다 ' : '등록 가능한 아이디 입니다'
                };
                controller.doneAjaxEmail(result, $element, isValidate);
            });
        },

        // 이메일 중복 확인 완료
        doneAjaxEmail: function(result, $element, isValidate){
            if(result.status === 'success'){
                if(!result.isRegisterEmail){
                    isValidate = true;
                }
            }
            $element.data('validate',isValidate);
            this.displayValidateMessage($element, isValidate, result.message);
        },

        // 추천인 서버 체크
        ajaxRecommendUser: function(){
            var $element = this.ui.param_recommendUser;
            var isValidate = false;

            $.ajax({
                url: this.API.recommendUser,
                data: $element.val()
            }).done(function(result){
                controller.doneAjaxRecommendUser(result, $element, isValidate);
            }).fail(function() {
                var random = Math.floor(Math.random() * 2);
                var result = {
                    status:'success',
                    findUser: (random > 0)? true : false,
                    message: (random > 0)? '친구추천 성공 ' : '추천인 아이디 또는 코드가 없습니다.'
                };
                controller.doneAjaxRecommendUser(result, $element, isValidate);
            });
        },

        // 추천인 서버 확인 완료
        doneAjaxRecommendUser: function(result, $element, isValidate){
            console.log(isValidate , result);
            if(result.status === 'success'){
                if(result.findUser){
                    isValidate = true;
                }
            }
            $element.data('validate',isValidate);
            this.displayValidateMessage($element, isValidate, result.message);
        },

        // 유효검증 표현,삭제
        displayValidateMessage: function($element, isValidate, message){
            var name = $element.prop('name');
            var $wrap = $element.closest('.'+$element.data('required-wrap'));
            var $validate = $wrap.siblings('.validate-message');
            if(isValidate){
                $validate.hide();
            }else{
                $validate.text(message).show();
            }
        },

        // 확인 (입력값 전송)
        submitEvent: function(event) {
            var isValidate = true;
            var $element;

            this.ui.param_required.each(function(index, element){
                $element = $(element);
                $element.data('runValidate',true);

                if(!controller.validate($element)){
                    isValidate = false;
                }
            });

            if( isValidate ){
                console.log('성공')
                alert('성공')
            }else{
                event.preventDefault();
                console.log('실패')
            }
        },

        // keydown 번호 입력 추출
        _allowOnlyNumber: function(event){
            var code = event.keyCode || event.which;
            console.log('code = ',code)
            var isValidKey = !(code != 46 && code > 31 && (code < 48 || code > 57));

            return ( isValidKey )? true : false;
        }
    };
    controller.initialize();
};

module.exports = EnterUserInformation;