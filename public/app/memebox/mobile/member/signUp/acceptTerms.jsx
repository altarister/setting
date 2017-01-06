var $ = require('jquery');
var utility = require('utility');
var SignUpSNS = require('components/member/signUpSNS/v.1.0.0/signUpSNS.jsx');

require('./acceptTerms.scss');
require('./signUpHeader/signUpHeader.scss');

var AcceptTerms = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            param_required: '[data-required="true"]'

            ,SNSWrap: '.signUp-SNS-wrap'
            ,form: '.signUp-form'
            ,agreementAll: '.agreement-all-checkbox'
            // ,agreement: '.signUp-agreement'
            ,allInput: '.signUp-agreement input[type="checkbox"]'
            ,toggle: '.terms-view-trigger'
            ,termsContent: '.signUp-terms-content'
        },

        initialize: function(){
            utility.uiEnhancements.call(this);
            this.addEventListener();
            new SignUpSNS(this.ui.SNSWrap);
        },


        addEventListener: function(){
            this.element.off()
                .on('change', this.ui.__uiString.agreementAll, $.proxy(this.agreementAllEvent, this))
                .on('change', this.ui.__uiString.param_required, $.proxy(this.changeEvent, this))
                .on('click', this.ui.__uiString.toggle, $.proxy(this.displayTermContent,this))
                .on('submit', this.ui.__uiString.form, $.proxy(this.submitEvent,this));
        },

        agreementAllEvent: function(event){
            var $allAgreement = $(event.currentTarget);
            var allAgreementValue = $allAgreement.prop('checked');

            this.ui.param_required.data('runValidate',true);
            if(allAgreementValue){
                this.ui.allInput.prop('checked', true);
            }else{
                this.ui.allInput.prop('checked', false);
            }

            this.ui.param_required.each(function(index, element){
                controller.validate($(element));
            });
        },

        changeEvent: function(event){
            this.validate($(event.currentTarget));
        },

        validate: function($element){
            var runValidate = $element.data('runValidate');
            var message = $element.data('required-message');
            var isValidate = true;

            this.ui.param_required.each(function(index, element){
                if(!$(element).prop('checked')){
                    isValidate = false;
                }
            });

            if(!isValidate){
                this.ui.agreementAll.prop('checked', false);
            }

            if(runValidate){
                this.displayValidateMessage($element, isValidate, message);
            }else{
                isValidate = false;
            }
            return isValidate;
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
        },
        /*
        addEventListener: function(){
            this.element.off()
                .on('change', this.ui.__uiString.agreementAll, $.proxy(this.agreementAllEvent, this))
                .on('change', this.ui.__uiString.requiredInput, $.proxy(this.validate, this))
                .on('click', this.ui.__uiString.toggle, $.proxy(this.displayTermContent,this))
                .on('submit', $.proxy(this.submitEvent, this))
        },

        agreementAllEvent: function(event){
            var $allAgreement = $(event.currentTarget);
            var allAgreementValue = $allAgreement.prop('checked');

            if(allAgreementValue){
                this.ui.allInput.prop('checked', true);
            }else{
                this.ui.allInput.prop('checked', false);
            }
            this.displayValidateMessage(allAgreementValue);
        },

        submitEvent: function(event) {
            if( this.validate() ){
                //event.preventDefault();
                alert('성공')
            }else{
                event.preventDefault();
                console.log('실패')
            }
        },

        validate: function(){
            var isValidate = true;
            this.ui.requiredInput.each(function(index, element){
                var $element = $(element);
                var isCurrentValidate = $element.prop('checked');
                if (!isCurrentValidate){
                    isValidate = isCurrentValidate;
                    controller.ui.agreementAll.prop('checked', false);
                }
            });
            this.displayValidateMessage(isValidate);
            return isValidate;
        },

        displayValidateMessage: function(isShow){
            if(isShow){
                this.ui.validateMessage.hide();
            }else{
                this.ui.validateMessage.show();
            }
        },


        */

        displayTermContent: function(event){
            event.preventDefault();
            var $current = $(event.currentTarget);
            var targetUrl = $current.attr('href');
            var $targetContent = $(targetUrl);
            var visible = $targetContent.is(':visible');

            this.ui.termsContent.hide();
            if( visible ){
                $targetContent.hide();
            }else{
                $targetContent.show();
            }
        }

    };
    controller.initialize();
};

module.exports = AcceptTerms;