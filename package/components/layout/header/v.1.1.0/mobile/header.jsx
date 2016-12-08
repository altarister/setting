var $ = require('jquery');
var utility = require('utility');

require('./main.scss');

var header = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            console.log('pc - header');
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },

        addEventListener: function(){
            // this.element.off()
            //     .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        },

    };
    controller.initialize();
};

module.exports = header;