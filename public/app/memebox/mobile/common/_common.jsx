var Menu = require('components/menu/v.1.0.0/_menu.jsx');
//var header = require('components/layout/header/v.1.1.0/mobile/header.jsx');
var footer = require('components/layout/footer/v.1.1.0/mobile/footer.jsx');

require('vendor/normalize/v.5.0.0/normalize.css');

var Common = function(){
    var controller = {

        initialize: function(){
            new Menu();
            new footer();
        }
    };
    controller.initialize();
};

module.exports = Common;