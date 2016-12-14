var $ = require('jquery');
var utility = require('utility');

require('./footer.scss');

var footer = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            console.log('mobile-footer')
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },

        addEventListener: function(){
            // this.element.off()
            //     .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        }
    };
    controller.initialize();
};

module.exports = footer;