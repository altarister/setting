var utility = require('utility');
var Menu = require('components/menu/v.1.0.0/_menu.jsx');
//var header = require('components/layout/header/v.1.1.0/pc/header.jsx');
var footer = require('components/layout/footer/v.1.1.0/pc/footer.jsx');

require('vendor/normalize/v.5.0.0/normalize.css');

var Common = function(){
    var controller = {

        element: '',
        ui:{
            footer: '.layout-structure-footer'
        },

        initialize: function(){
            utility.uiEnhancements.call(this);
            //new Menu();
            // new header();
            //new footer();
            this.makeFooter();
        },

        makeFooter: function(){
          if(this.ui.footer.length > 0){
              new footer();
          }
        }
    };
    controller.initialize();
};

module.exports = Common;