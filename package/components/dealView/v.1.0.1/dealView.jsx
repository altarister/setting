/**
 * Created by 160727-b on 2016. 9. 27..
 */
var $ = require('jquery');
var utility = require('utility');
require('./dealView.css');


var dealView = function(){
    var controller = {

        element: '#memebox-service',

        initialize: function(){
            this.dealView();
        },

        dealView: function(){
        }
    };
    controller.initialize();
};
module.exports = dealView;