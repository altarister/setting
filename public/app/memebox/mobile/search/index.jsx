var $ = require('jquery');
var utility = require('utility');
var Menu = require('components/menu/v.1.0.0/_menu.jsx');
var SampleDealAPI = require('modules/_sampleDealAPI/_sampleDealAPI.jsx');
var DealContainer = require('components/dealContainer/v.1.0.0/dealContainer.jsx');

require('./index.scss');

var SearchIndex = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            dealContainer: '.deal-container'
        },

        deals : null,

        initialize: function(){
            new Menu();
            utility.uiEnhancements.call(this);

            this.ui.dealContainer.each(function (index, element) {
                var $element = $(element);
                var viewData = $element.data('container-view-type');
                var lineAmount = Number($element.data('container-lineAmount'));
                if(viewData){
                    var API = new SampleDealAPI(viewData);

                    new DealContainer($element, lineAmount, API.get());
                }
            });
        }
    };
    controller.initialize();
};

module.exports = SearchIndex;
