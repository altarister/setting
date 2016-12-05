var $ = require('jquery');
var utility = require('utility');
var Menu = require('components/menu/v.1.0.0/_menu.jsx');

require('./signUp.scss');
require('modules/_designViewer/_select/v.1.0.0/line/_select.scss');

var SignUp = function () {
    var controller = {

        element: '#memebox-service',
        ui: {
            emailSelect: '.signUp-email-wrap .select-design-viewer-option-selector',
            emailSelectBox: '.signUp-email-wrap .select-design-viewer-list',
            emailSelectOption: '.signUp-email-wrap .signUp-email-host-option',

            emailHost: '.signUp-email-input-host'
        },

        initialize: function () {
            new Menu();
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

module.exports = SignUp;