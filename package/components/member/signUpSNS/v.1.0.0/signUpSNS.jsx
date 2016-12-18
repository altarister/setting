var $ = require('jquery');
var utility = require('utility');

require('device/SignUpSNS.scss');

var SignUpSNS = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            console.log('SignUpSNS')
            utility.uiEnhancements.call(this);
        },

        addEventListener: function(){
            // this.element.off()
            //     .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        }
    };
    controller.initialize();
};

module.exports = SignUpSNS