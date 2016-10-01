/**
 * Created by 160727-b on 2016. 9. 28..
 */
require('./_menu.scss');
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

            this.makeList()
        },

        makeList: function(){
            var menuData = this.element.data('component-data');

            var addData = menuData.push(
                {
                    "url" : "/order",
                    "text" : "order"
                });
            var component = {
                "component":{
                    "menu" : menuData
                }
            };
            console.log('component = ',component)
            var html = templates.menu(component);
            this.element.html(html);
        }
    };
    component.initialize();
};

module.exports = menu;