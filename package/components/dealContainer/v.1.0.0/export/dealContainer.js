var DealContainer = function ($element, lineAmount, deals) {
    var controller = {

        initialize: function () {
            this.makeDealList()
        },

        makeDealList: function(){
            var $ul = $(delContainer_template.dealList(lineAmount));

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
                if (dealFunction.easyChoiceOption) new DealTooltipFloating($element, dealFunction.easyChoiceOption, 'memebox');
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