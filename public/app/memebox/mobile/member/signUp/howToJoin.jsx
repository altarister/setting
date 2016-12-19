var $ = require('jquery');
var utility = require('utility');

require('./howToJoin.scss');
require('./signUpHeader/signUpHeader.scss');

var HowToJoin = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            utility.uiEnhancements.call(this);
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        }
    };
    controller.initialize();
};

module.exports = HowToJoin;