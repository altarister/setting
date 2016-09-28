var home = require('../../../components/homework_v_1_0_0/home.jsx');
var work = require('../../../components/homework_v_1_0_0/work.jsx');
var dealView = require('../../../components/dealView_v_1_0_1/dealView.jsx');
var menu = require('../../../components/menu_v_1_0_0/_menu.jsx');


var $ = require('jquery');
var utility = require('utility');


require('./main.css');

var main = function(){
    var controller = {

        element: '#memebox-service',


        initialize: function(){

            //utility.uiEnhancements.call(this);

            this.makeMenu();
            console.log(home + ',' + work + ', ' + dealView + '!!');
            //document.write(home + ',' + work + ', ' + dealView + '!!()');
        },

        makeMenu: function(wrap){
            console.log('component-data = component-dat,$wrap.data');
            new menu();
        }
    };
    controller.initialize();
};

module.exports = main;

