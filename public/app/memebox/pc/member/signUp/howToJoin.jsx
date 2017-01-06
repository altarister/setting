var $ = require('jquery');
var utility = require('utility');

require('./howToJoin.scss');
require('./signUpHeader/signUpHeader.scss');

var HowToJoin = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            popupWindow: '.easy-signUp-SNS-list a[data-popup]'
        },

        initialize: function(){
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.popupWindow, $.proxy(this.popupWindowOpenEvent, this));

            $.subscribe('sns.popupWindow.close', $.proxy(this.popupWindowCloseEvent, this));
        },

        popupWindowCloseEvent: function(event, data){

            console.log('popupWindowCloseEvent', data);
        },

        popupWindowOpenEvent: function(event){
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
            var service = this.element.data('controllerInfo').service;
            var popupObject = window.open(popupData.url, service, params.join(','));

            if (popupObject && popupObject.focus) {
                popupObject.focus();
            }
        }
    };
    controller.initialize();
};

module.exports = HowToJoin;