var $ = require('jquery');
var utility = require('utility');

require('./_deal_tooltip_floating.scss');

var tooltip_floating_templates = {
    box: require('./_templates/_box.hbs'),
    trigger: require('./_templates/_trigger.hbs')
};

var DealTooltipFloating = function (element, className, deals, service) {
    var controller = {
        element: element,
        ui: {
            dealList: '.memebox-deal-list',
            dealWrapper: '.memebox-deal-wrapper',
            deal: '.memebox-deal'
        },

        lineAmount: null,

        initialize: function () {
            utility.uiEnhancements.call(this);
            this.setLineAmount();
            this.makeDealEasyChoiceTrigger(this.ui.dealWrapper);
        },

        setLineAmount: function () {
            var dealContainerWidth = this.element.outerWidth();
            var dealWrapperWidth = this.ui.dealWrapper.outerWidth();
            this.lineAmount = parseInt(dealContainerWidth / dealWrapperWidth);
        },

        makeDealEasyChoiceTrigger: function ($dealWrapper) {
            var easyChoiceTriggerClassName = '';
            $dealWrapper.each(function (index, element) {
                var dealId = $(element).find('.'+service+'-deal').attr('id');
                var data = {
                    id: dealId,
                    index: index
                };
                var $dealTooltipFloatingTrigger = $(tooltip_floating_templates.trigger(data));
                easyChoiceTriggerClassName = $dealTooltipFloatingTrigger.attr('class');
                $(element).addClass(className).find('.'+service+'-deal').prepend($dealTooltipFloatingTrigger);
            });
            $(element).find('.' + easyChoiceTriggerClassName).on('click', $.proxy(this.dealTooltipFloatingTriggerEvent, this))
        },

        dealTooltipFloatingTriggerEvent: function (event) {
            event.preventDefault();
            event.stopPropagation();
            var $currentTarget = $(event.currentTarget);
            this.displayDealEasyChoiceOption($currentTarget);
        },

        displayDealEasyChoiceOption: function ($currentTarget) {
            var triggerIndex = parseInt($currentTarget.data('trigger-index'));
            var dealId = $currentTarget.attr('href');
            var deal = this.getSelectedDeal(dealId);
            var optionIndex = this.getOptionIndex(triggerIndex);
            var $dealTooltipFloatingContent = $(tooltip_floating_templates.box(dealId));
            var dealTooltipFloatingContentClassNmae = $dealTooltipFloatingContent.attr('class');
            var dealWrapperWidth = this.ui.dealWrapper.outerWidth();
            var arrowPositionLeft = ((triggerIndex % this.lineAmount) * dealWrapperWidth) + dealWrapperWidth / 2;

            this.ui.dealList.find('.' + dealTooltipFloatingContentClassNmae).remove();
            $dealTooltipFloatingContent
                .find('.deal-tooltip-floating-content-arrow')
                .css('left', arrowPositionLeft + 'px');
            this.ui.dealWrapper.eq(optionIndex).after($dealTooltipFloatingContent);

            $dealTooltipFloatingContent.on('click', '.deal-tooltip-floating-container-controller-closing', function () {
                controller.ui.dealList.find('.' + dealTooltipFloatingContentClassNmae).remove();
            });
            $.publish('deal.easyChoiceOption.open', {
                $element: $('.deal-tooltip-floating-container-contents-wrap'),
                deal: deal
            });
        },

        getSelectedDeal: function(dealId) {
            var deal = null;
            for(var index in deals){
                if(deals[index].id === dealId){
                    deal = deals[index];
                }
            }
            return deal;
        },

        getOptionIndex: function (triggerIndex) {
            triggerIndex += 1;
            var optionIndex = triggerIndex - 1;
            var remainder = triggerIndex % this.lineAmount;

            if (remainder > 0) {
                optionIndex += (this.lineAmount - remainder)
            }
            return optionIndex;
        }
    };
    controller.initialize();
};

module.exports = DealTooltipFloating;