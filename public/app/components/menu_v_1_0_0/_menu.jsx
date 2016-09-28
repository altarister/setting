/**
 * Created by 160727-b on 2016. 9. 28..
 */
require('./_menu.css');
var $ = require('jquery');
var utility = require('utility');
var templates = {
    menu: require('./_menu.hbs')
}

var menu = function(){
    var component = {

        element: '.memebox-menu-wrap',
        ui: {
            memeboxMenuWrap : '.memebox-menu-wrap'
        },

        initialize: function(){
            console.log('menu require!!!');

            utility.uiEnhancements.call(this);

            // var html = templates.menu({
            //     menu : this.element.data('component-data')
            // });
            // this.element.append(html);
        }
    };
    component.initialize();
};

module.exports = menu;