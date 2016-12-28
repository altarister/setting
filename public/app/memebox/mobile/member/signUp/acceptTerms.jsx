var $ = require('jquery');
var utility = require('utility');
var SignUpSNS = require('components/member/signUpSNS/v.1.0.0/signUpSNS.jsx');

require('./acceptTerms.scss');
require('./signUpHeader/signUpHeader.scss');

var AcceptTerms = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            SNSWrap: '.signUp-SNS-wrap'
            ,form: '.signUp-form'
            ,agreementAll: '.agreement-all-checkbox'
            ,agreement: '.signUp-agreement'
            ,allInput: '.signUp-agreement input[type="checkbox"]'
            ,requiredInput: '.signUp-agreement-required input[type="checkbox"]'
            ,validateMessage: '.validate-message'
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