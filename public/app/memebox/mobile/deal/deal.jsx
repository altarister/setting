var dealView = require('dealView/v.1.0.1/dealView.jsx');
require('./deal.css');

var deal = function(){
    var controller = {

        element: '#memebox-service',

        initialize: function(){
            console.log(DealView + '!!');
            this.displayDealView();
        },

        displayDealView: function(){
            console.log('DealView');
            new DealView();
        }
    };
    controller.initialize();
};

module.exports = deal;

