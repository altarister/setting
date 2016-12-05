var $ = require('jquery');
var utility = require('utility');

require('./_deal_tooltip_floating.scss');

var DealTooltipFloating = function (element, className, deals, service) {
    var controller = {
        element: element,
        ui: {},

        lineAmount: null,

        initialize: function () {
            utility.uiEnhancements.call(this);
        }
    };
    controller.initialize();
};

module.exports = DealTooltipFloating;