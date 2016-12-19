var $ = require('jquery');
var utility = require('utility');
var SignUpSNS = require('components/member/signUpSNS/v.1.0.0/signUpSNS.jsx');

require('./acceptTerms.scss');
require('./signUpHeader/signUpHeader.scss');

var AcceptTerms = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            new SignUpSNS();
            console.log('aaaaaa')
            utility.uiEnhancements.call(this);
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        }
    };
    controller.initialize();
};

module.exports = AcceptTerms;