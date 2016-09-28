var home = require('../../../components/homework_v_1_0_0/home.jsx');
var work = require('../../../components/homework_v_1_0_0/work.jsx');
var dealView = require('../../../components/dealView_v_1_0_1/dealView.jsx');
var $ = require('jquery');
require('./main.css');

var main = function(){
    var controller = {

        initialize: function(){
            console.log(home + ',' + work + ', ' + dealView + '!!');
            //document.write(home + ',' + work + ', ' + dealView + '!!()');
        }
    };
    controller.initialize();
};

module.exports = main;

