var $ = require('jquery');
var utility = require('utility');

var Select = require('modules/_designViewer/_select/v.1.0.0/box/_select.jsx');

require('./enterUserInformation.scss');
require('./signUpHeader/signUpHeader.scss');

var EnterUserInformation = function () {
    var controller = {

        element: '#memebox-service',
        ui: {
            emailSelect: '.signUp-email-wrap .select-design-viewer-option-selector',
            emailSelectBox: '.signUp-email-wrap .select-design-viewer-list',
            emailSelectOption: '.signUp-email-wrap .signUp-email-host-option',

            emailHost: '.signUp-email-input-host'
            ,selectWrap: '.signUp-email-host-select'
        },

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
            utility.uiEnhancements.call(this);
            this.makeEmailSelect(this.ui.selectWrap);
            this.addEventListener();
        },

        makeEmailSelect: function(selectWrap){
            var select = new Select(this.selectData); //data, element
            var selectElement = select.getElement();
            selectWrap.append(selectElement);
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