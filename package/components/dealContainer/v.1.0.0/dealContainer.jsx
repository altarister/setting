var $ = require('jquery');
var utility = require('utility');
var Deal = require('components/deal/v.1.0.0/deal.jsx');
var DealInlineGallery = require('deal_inline_gallery/_deal_inline_gallery.jsx');
var DealTooltipFloating = require('deal_tooltip_floating/_deal_tooltip_floating.jsx');

require('./dealContainer.scss');

var dealContainer_templates = {
    dealList: require('./_templates/_dealList.hbs'),
    dealWrapper: require('./_templates/_dealWrapper.hbs')
};

var DealContainer = function ($element, lineAmount, deals) {
    var controller = {

        viewData: {
            lineAmount: lineAmount
        },

        initialize: function () {
            this.makeDealList()
        },

        makeDealList: function(){
            var $ul = $(dealContainer_templates.dealList(this.viewData));

            $element.append($ul);
            this.addDealListItem($ul);
            this.remainingTimeController();
            this.addFunction();
        },

        addDealListItem: function($ul){
            var $li ,deal;

            for( var index in deals){
                deal = new Deal(deals[index]);
                $li = $('<li class="memebox-deal-wrapper">').append(deal.getDealString());
                $ul.append( $li );
            }
        },

        addFunction: function(){
            var dealFunction = $element.data('deal-function');

            if (dealFunction) {
                if (dealFunction.easyChoiceOption) new DealTooltipFloating($element, dealFunction.easyChoiceOption, deals, 'memebox');
                if (dealFunction.dealInlineGallery) new DealInlineGallery($element, dealFunction.dealInlineGallery, deals, 'memebox');
            }
        },

        remainingTimeController: function(){
            if(window.deal_RemainingTimeInterval) return;
            window.deal_RemainingTimeInterval = setInterval(function () {
                $.publish('deal.remainingTime');
            }, 1000);
        },

        eventListener: function () {
            $.subscribe('deal.easyChoiceOption.open', $.proxy(this.displayDealEasyChoiceOption, this));
        }
    };

    controller.initialize();
};

module.exports = DealContainer;