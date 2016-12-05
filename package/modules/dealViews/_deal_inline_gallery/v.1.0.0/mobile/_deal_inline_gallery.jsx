var $ = require('jquery');
var utility = require('utility');
var slick = require('slick');

require('./_deal_inline_gallery.scss');

var DealInlineGallery = function (element, className, deals) {
    var controller = {
        element: element,
        ui: {
            dealList: '.memebox-deal-list',
            dealWrapper: '.memebox-deal-wrapper'
        },

        lineAmount: null,

        initialize: function() {
            utility.uiEnhancements.call(this);

            var containerWidth = this.element.width();

            this.ui.dealList.append('<li></li>');
            this.element.width(containerWidth + 50);
            this.setSlick();
        },

        setSlick: function() {
            this.ui.dealList.slick({
                dots: false,
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 2
            });
        }
    };
    controller.initialize();
};
module.exports = DealInlineGallery;