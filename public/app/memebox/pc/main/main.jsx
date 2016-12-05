var $ = require('jquery');
var utility = require('utility');
var Menu = require('components/menu/v.1.0.0/_menu.jsx');

require('./main.scss');

var main = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            utility.uiEnhancements.call(this);
            new Menu();
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