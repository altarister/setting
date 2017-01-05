var $ = require('jquery');
var utility = require('utility');

require('./home.scss');

var main = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            console.log('a')
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

module.exports = main;