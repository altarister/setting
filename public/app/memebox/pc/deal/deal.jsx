var dealView = require('components/dealView/v.1.0.1/_dealView.jsx');
require('./deal.scss');

var deal = function(){
    var controller = {

        element: '#memebox-service',

        initialize: function(){
            console.log(dealView + '!!');
            this.displayDealView();
        },

        displayDealView: function(){
            console.log('DealView');
            new dealView();
        }
    };
    controller.initialize();
};

module.exports = deal;

