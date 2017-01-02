var $ = require('jquery');
var utility = require('utility');

require('./acceptTerms.scss');
require('./signUpHeader/signUpHeader.scss');

var AcceptTerms = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            param_required: '[data-required="true"]'

            ,form: '.signUp-form'
            ,agreementAll: '.agreement-all-checkbox'
            ,allInput: '.signUp-agreement input[type="checkbox"]'
        },

        initialize: function(){
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },

        addEventListener: function(){
            this.element.off()
                .on('change', this.ui.__uiString.agreementAll, $.proxy(this.agreementAllEvent, this))
                .on('change', this.ui.__uiString.param_required, $.proxy(this.changeEvent, this))
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

            if(isValidate){
                this.ui.agreementAll.prop('checked', true);
            }else{
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
        }

    };
    controller.initialize();
};

module.exports = AcceptTerms;