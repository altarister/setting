/**
 * Created by 160727-b on 2016. 9. 27..
 */
var deal = require('modules/deal/v.1.0.0/_deal.jsx');

var $ = require('jquery');
var utility = require('utility');
require('./_dealView.css');


const dom = utility.uiEnhancements.call({
    element: '.balance-historyList',
    ui: {
        // tab
        tabs: '.rocketpay-tab__alink',
    }
});

dom.element.off()
    .on('click', dom.ui.__uiString.tabs, function(e){
        e.preventDefault();
        var type = $(e.currentTarget).data('request-type');
        console.log('')
    });

var dealView = function(){
    var controller = {

        element: '#memebox-service',

        initialize: function(){
            new deal();
        },

    };
    controller.initialize();
};
module.exports = dealView;