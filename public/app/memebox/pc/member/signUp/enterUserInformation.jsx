var $ = require('jquery');
var utility = require('utility');
var validate = require('validate');
var SignUpSNS = require('components/member/signUpSNS/v.1.0.0/signUpSNS.jsx');
var Select = require('modules/_designViewer/_select/v.1.0.0/box/_select.jsx');
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

            ,SNSWrap: '.signUp-SNS-wrap'
            ,hostSelectBox: '.signUp-email-wrap .select-design-viewer-list'
            ,hostSelectOption: '.signUp-email-wrap .signUp-email-host-option'

            ,form: '.signUp-form'
            ,certificationTrigger: '.signUp-cellphone-certification-trigger'
            ,certificationEnd: '.cellphone-certification-end'
            ,certificationContent: '.signUp-cellphone-certification-content'
            ,submit: '.signUp-form-submit'
            ,hostSelect : '.signUp-email-host-select'
        },

        message: {
            EMPTY: '필수 입력란입니다.',
            VERIFICATION: '인증을 하여야 합니다.',
            CHECKING_RECOMMEND: '추천인 코드를 조회 중입니다.',
            CHECKING_REGISTER_EMAIL: '중복 아이디를 조회 중입니다',
            CHECKING_SEQUENTIAL_NUMBER: '동일한 문자나 숫자를 연속으로 사용할 수 없습니다.'
        },

        API: {
            recommendUser : '/recommendUser',
            validateRegisterUser: '/signup/validateRegisterUser'
        },

        verification_hasCellphone: null,

        selectData: {
            isDefaultType: true,
            options: [
                {
                    tegName: 'span',
                    attribute: [
                        {class: 'signUp-email-host-option'}
                    ],
                    data: [
                        {value: '', name: ''}
                    ],
                    text: '직접입력'
                },
                {
                    tegName: 'span',
                    attribute: [
                        {class: 'signUp-email-host-option'}
                    ],
                    data: [
                        {value: '@naver.com', name: 'naver'}
                    ],
                    text: '@naver.com'
                },
                {
                    tegName: 'span',
                    attribute: [
                        {class: 'signUp-email-host-option'}
                    ],
                    data: [
                        {value: '@daum.net', name: 'daum'}
                    ],
                    text: '@daum.net'
                },
                {
                    tegName: 'span',
                    attribute: [
                        {class: 'signUp-email-host-option'}
                    ],
                    data: [
                        {value: '@gmail.com', name: 'gmail'}
                    ],
                    text: '@gmail.com'
                },
                {
                    tegName: 'span',
                    attribute: [
                        {class: 'signUp-email-host-option'}
                    ],
                    data: [
                        {value: '@hotmail.com', name: 'hotmail'}
                    ],
                    text: '@hotmail.com'
                },
                {
                    tegName: 'span',
                    attribute: [
                        {class: 'signUp-email-host-option'}
                    ],
                    data: [
                        {value: '@lycos.co.kr', name: 'lycos'}
                    ],
                    text: '@lycos.co.kr'
                },
                {
                    tegName: 'span',
                    attribute: [
                        {class: 'signUp-email-host-option'}
                    ],
                    data: [
                        {value: '@empal.com', name: 'empal'}
                    ],
                    text: '@empal.com'
                },
                {
                    tegName: 'span',
                    attribute: [
                        {class: 'signUp-email-host-option'}
                    ],
                    data: [
                        {value: '@dreamwiz.com', name: 'dreamwiz'}
                    ],
                    text: '@dreamwiz.com'
                },
                {
                    tegName: 'span',
                    attribute: [
                        {class: 'signUp-email-host-option'}
                    ],
                    data: [
                        {value: '@korea.com', name: 'korea'}
                    ],
                    text: '@korea.com'
                }
            ]
        },

        initialize: function () {
            new SignUpSNS(this.ui.SNSWrap);
            utility.uiEnhancements.call(this);

            this.ui.submit.prop('disabled', false);
            this.makeEmailSelect(this.ui.hostSelect);
            this.addEventListener();
        },

        makeEmailSelect: function($hostSelect){
            var select = new Select(this.selectData); //data, element
            var selectElement = select.getElement();
            $hostSelect.append(selectElement);
        },

        addEventListener: function () {
            this.element.off()
                .on('keyup', this.ui.__uiString.param_name, $.proxy(this.nameKeyEvent,this))
                .on('focusout', this.ui.__uiString.param_name, $.proxy(this.setRunValidate,this))
                .on('keyup', this.ui.__uiString.param_email, $.proxy(this.emailKeyEvent,this))
                .on('focusout', this.ui.__uiString.param_email, $.proxy(this.setRunValidate,this))

                // .on('change', this.ui.__uiString.hostSelect, $.proxy(this.hostSelectEvent,this))
                .on('click', this.ui.__uiString.hostSelect, $.proxy(this.hostSelectEvent, this))
                .on('click', this.ui.__uiString.hostSelectOption, $.proxy(this.hostSelectOptionEvent, this))

                .on('keyup', this.ui.__uiString.param_password, $.proxy(this.passwordKeyEvent,this))
                .on('focusout', this.ui.__uiString.param_password, $.proxy(this.setRunValidate,this))
                .on('focusout', this.ui.__uiString.param_confirm, $.proxy(this.setRunValidate,this))
                .on('focusin', this.ui.__uiString.param_cellphone, $.proxy(this.cellphoneFocusInEvent,this))
                .on('focusout', this.ui.__uiString.param_cellphone, $.proxy(this.cellphoneFocusOutEvent,this))
                .on('keypress', this.ui.__uiString.param_cellphone, $.proxy(this._allowOnlyNumber,this))
                .on('keyup', this.ui.__uiString.param_cellphone, $.proxy(this.cellphoneKeyEvent,this))
                .on('click', this.ui.__uiString.certificationTrigger, $.proxy(this.verificationCellphoneTriggerEvent,this))
                .on('keyup', this.ui.__uiString.param_recommendUser, $.proxy(this.recommendUserKeyEvent,this))
                .on('focusout', this.ui.__uiString.param_recommendUser, $.proxy(this.setRunValidate,this))
                .on('submit', this.ui.__uiString.form, $.proxy(this.submitEvent,this));

            $.subscribe('verification.cellphone.close', $.proxy(this.hasCellphoneWrapClose, this));
        },



        setRunValidate: function(event){
            this.validate($(event.currentTarget)
                .data('validate','')
                .data('runValidate',true));
        },

        nameKeyEvent: function(event){
            this.validate($(event.currentTarget));
        },

        emailKeyEvent: function(event){
            this.validate($(event.currentTarget));
        },

        // hostSelectEvent: function(event){
        //     this.makeEmailText($(event.currentTarget).val())
        // },

        hostSelectEvent: function (event) {
            this.ui.hostSelectBox.toggle();
        },

        hostSelectOptionEvent: function (event) {
            var $element = $(event.currentTarget);
            var elementText = $element.data('value');
            console.log('elementText',elementText)
            this.ui.hostSelect.val(elementText);
            this.ui.hostSelectBox.toggle();
            this.makeEmailText(elementText)
        },

        passwordKeyEvent: function(event){
            this.validate($(event.currentTarget));
        },

        cellphoneFocusInEvent: function(event){
            var $element = $(event.currentTarget);

            this.cellphoneKeyEvent(event);
            if(this.verification_hasCellphone){
                this.verification_hasCellphone.verificationEnd();
            }
            this.hasCellphoneWrapClose();
            this.validate($element);
        },

        cellphoneKeyEvent: function(event){
            var $element = $(event.currentTarget);
            var value = $element
                .val()
                .replace(/-/g, '')
                .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
            $element.val(value);
            this.validate($element);
        },

        cellphoneFocusOutEvent: function(event){
            $(event.currentTarget).data('runValidate',true);
            this.cellphoneKeyEvent(event);
        },

        _allowOnlyNumber: function(event){
            var code = event.keyCode || event.which;
            var isValidKey = !(code != 46 && code > 31 && (code < 48 || code > 57));

            return ( isValidKey )? true : false;
        },

        recommendUserKeyEvent: function(event){
            var $element = $(event.currentTarget);
            $element.data('validate','');
        },

        verificationCellphoneTriggerEvent: function(event){
            event.preventDefault();
            console.log('오픈');
            var requestData = {
                cellphoneNumber: this.ui.param_cellphone.val()
            };
            this.verification_hasCellphone = new Verification_hasCellphone(
                this.ui.certificationContent,
                this.hasCellphoneWrapClose,
                requestData
            );
            console.log('this.verification_hasCellphone',this.verification_hasCellphone)
            this.ui.certificationContent.show();
            this.ui.certificationTrigger.prop('disabled', true);//.hide();
        },

        hasCellphoneWrapClose: function(data){
            controller.verification_hasCellphone = null;
            controller.ui.certificationContent.empty().hide();

            if(data){
                if(data.success){
                    controller.ui.certificationTrigger.prop('disabled', true);//.hide();
                    controller.ui.certificationEnd.show();
                    controller.ui.param_cellphone.prop('disabled', true);
                    controller.validate(controller.ui.param_cellphone);
                }else{
                    controller.ui.certificationTrigger.prop('disabled', false);//.show();
                }
            }else{
                controller.ui.certificationTrigger.prop('disabled', true);//.hide();
            }
        },

        makeEmailText: function(host){
            var currentEmailValue = this.ui.param_email.val();
            var emailId = currentEmailValue.replace(/@.*/, '');
            var cursorPosition = emailId.length;
            var madeEmailValue = emailId + host;

            this.ui.param_email.val(madeEmailValue);
            this.setSelectionRange(this.ui.param_email.get(0), cursorPosition, cursorPosition);
            this.validate(this.ui.param_email);
        },

        setSelectionRange: function(input, selectionStart, selectionEnd) {
            if (input.setSelectionRange) {
                $(input).focus();
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

        validate: function($element){
            var value = validate.trim($element.val());
            var name = $element.prop('name');
            var runValidate = $element.data('runValidate');
            var message = $element.data('required-message');
            var isValidate = true;

            switch (name){
                case 'name':
                    if(value.length <= 1 || !validate.isName(value)){
                        isValidate = false;
                    }
                    break;
                case 'email':
                    var registerEmail = this.ui.param_email.data('validate');

                    if(!validate.isEmail(value)){
                        isValidate = false;
                    }else{
                        if(registerEmail === ''){
                            message = controller.message.CHECKING_REGISTER_EMAIL;
                            controller.ajaxRegisterEmail();
                            isValidate = false;
                        }else{
                            message = '';
                            if(registerEmail){
                            }else{
                                isValidate = false;
                                console.log('여기면 메시지 지우기 ')
                            }
                        }
                    }
                    break;
                case 'password':
                    if(!validatePassword.validatePassword(value)){
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
                        this.ui.certificationTrigger.prop('disabled', true);//.hide();
                        isValidate = false;
                    }else{
                        if(this.ui.certificationContent.is(':visible')){
                            this.ui.certificationTrigger.prop('disabled', true);//.hide();
                        }else{
                            this.ui.certificationTrigger.prop('disabled', false);//.show();
                        }
                    }
                    break;
                case 'verification':
                    //인증 중인지 확인..
                    console.log('올바른 전화 번호이고 인증 여부 확인 필요 ');
                    if(this.ui.param_cellphone.prop('disabled') ){
                        console.log('인증 완료');
                    }else{
                        console.log('인증 미 완료');
                        message = this.message.VERIFICATION;
                        isValidate = false;
                    }
                    break;
                case 'recommendUser':
                    var findUser = this.ui.param_recommendUser.data('validate');

                    if(validate.isEmpty(value)){//|| 확인 완료
                        console.log('aaa');
                    }else{
                        if(findUser === ''){
                            message = this.message.CHECKING_RECOMMEND;
                            this.ajaxRecommendUser();
                            isValidate = false;
                        }else{
                            message = '';
                            if(findUser){
                            }else{
                                //message = this.message.CHECK_FAIL_RECOMMEND;
                                isValidate = false;
                            }
                        }
                    }
                    break;
            }
            if(runValidate){
                this.displayValidateMessage($element, isValidate, message);
            }else{
                isValidate = false;
            }
            return isValidate;
        },

        ajaxRegisterEmail: function(){
            console.log('서버에 아이디 중복 체크');
            var $email = this.ui.param_email;
            var isValidate = false;
            var data = $email.val();

            $.ajax({
                url: this.API.validateRegisterUser,
                data: data
            }).done(function(result){
                if(result.status === 'success'){
                    console.log('success')
                }else{
                    console.log('false')
                }
            }).fail(function() {
                var random = Math.floor(Math.random() * 2);
                var result = {
                    status:'success',
                    isRegisterEmail: (random > 0)? true : false,
                    message: (random > 0)? 'ajax 중복된 아이디입니다 ' : '등록 가능한 아이디 입니다'
                };

                if(result.status === 'success'){
                    if(result.isRegisterEmail){
                    }else{
                        isValidate = true;
                    }
                }else{
                    console.log('fail')
                }
                controller.ui.param_email.data('validate',isValidate);
                controller.displayValidateMessage($email, isValidate, result.message);
            });
        },

        ajaxRecommendUser: function(){
            console.log('서버에 추천인 코드 넘김');
            var $recommendUser = this.ui.param_recommendUser;
            var isValidate = false;
            var data = $recommendUser.val();

            $.ajax({
                url: this.API.recommendUser,
                data: data
            }).done(function(result){
                if(result.status === 'success'){
                    console.log('success')
                }else{

                }
            }).fail(function() {
                alert(controller.message.SYSTEM_CELLPHONE_ERROR);
                var random = Math.floor(Math.random() * 2);
                var result = {
                    status:'success',
                    findUser: (random > 0)? true : false,
                    message: (random > 0)? '친구추천 성공 ' : '추천인 아이디 또는 코드가 없습니다.'
                };

                if(result.status === 'success'){
                    if(result.findUser){
                        isValidate = true;
                    }else{
                    }
                }else{
                    console.log('fail')
                }
                controller.ui.param_recommendUser.data('validate',isValidate);
                controller.displayValidateMessage($recommendUser, isValidate, result.message);
            });
        },

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
                alert('성공')
            }else{
                event.preventDefault();
                console.log('실패')
            }
        }
    };
    controller.initialize();
};

module.exports = EnterUserInformation;