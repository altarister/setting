var $ = require('jquery');
var utility = require('utility');

require('./acceptTerms.scss');
require('./signUpHeader/signUpHeader.scss');

var AcceptTerms = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            console.log('aaa')
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