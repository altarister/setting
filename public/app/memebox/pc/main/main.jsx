var home = require('components/homework/v.1.0.0/_home.jsx');
var work = require('components/homework/v.1.0.0/_work.jsx');
var dealView = require('components/dealView/v.1.0.0/_dealView.jsx');
var Menu = require('components/menu/v.1.0.0/_menu.jsx');

var $ = require('jquery');
var utility = require('utility');

require('./main.scss');

var main = function(){
    var controller = {

        element: '#memebox-service',

        initialize: function(){
            this.makeMenu();
            console.log(home + ',' + work + ', ' + dealView + '!!');
        },

        makeMenu: function(){
            new Menu();
        }
    };
    controller.initialize();
};

module.exports = main;