var $ = require('jquery');
var utility = require('utility');
var Menu = require('components/menu/v.1.0.0/_menu.jsx');
var Header = require('components/layout/header/v.1.1.0/pc/header.jsx');

require('./signUpSNS.scss');

var SignUpSNS = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            new Menu();
            new Header();
            utility.uiEnhancements.call(this);
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        }
    };
    controller.initialize();
};

module.exports = SignUpSNS;