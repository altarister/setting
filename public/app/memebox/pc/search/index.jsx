var $ = require('jquery');
var utility = require('utility');
var Menu = require('components/menu/v.1.0.0/_menu.jsx');

require('./index.scss');

var SearchIndex = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            dealContainer: '.deal-container'
        },

        initialize: function(){
            new Menu();
        }
    };
    controller.initialize();
};

module.exports = SearchIndex;
