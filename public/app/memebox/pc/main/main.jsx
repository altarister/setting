var $ = require('jquery');
var utility = require('utility');
var Menu = require('components/menu/v.1.0.0/_menu.jsx');
var header = require('components/layout/header/v.1.1.0/pc/header.jsx');
var footer = require('components/layout/footer/v.1.1.0/pc/footer.jsx');

require('./main.scss');

var main = function(){
    var controller = {

        element: '#memebox-service',
        ui: {},

        initialize: function(){
            new header();
            new footer();
            //new Menu();
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