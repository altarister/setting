var $ = require('jquery');
var utility = require('utility');

require('./enterUserInformation.scss');
require('./signUpHeader/signUpHeader.scss');
require('./signUpSNS/signUpSNS.scss');

var EnterUserInformation = function () {
    var controller = {

        element: '#memebox-service',
        ui: {
            emailSelect: '.signUp-email-wrap .select-design-viewer-option-selector',
            emailSelectBox: '.signUp-email-wrap .select-design-viewer-list',
            emailSelectOption: '.signUp-email-wrap .signUp-email-host-option',

            emailHost: '.signUp-email-input-host'
        },

        initialize: function () {
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },

        addEventListener: function () {
            this.element.off()
                .on('click', this.ui.__uiString.emailSelect, $.proxy(this.emailSelectEvent, this))
                .on('click', this.ui.__uiString.emailSelectOption, $.proxy(this.emailSelectOptionEvent, this))
        },

        emailSelectEvent: function (event) {
            this.ui.emailSelectBox.toggle();
        },

        emailSelectOptionEvent: function (event) {
            var $element = $(event.currentTarget);
            var elementText = $element.data('value');
            this.ui.emailHost.val(elementText)
            this.ui.emailSelectBox.toggle();
        },


    };
    controller.initialize();
};

module.exports = EnterUserInformation;