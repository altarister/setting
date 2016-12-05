var $ = require('jquery');
var utility = require('utility');
var slick = require('slick');

require('./_deal_inline_gallery.scss');

var dealInlineGallery_templates = {
    title: require('./_templates/_title.hbs')
};

var DealInlineGallery = function (element, viewData, deals) {
    var controller = {
        element: element,
        ui: {
            dealList: '.memebox-deal-list',
            dealWrapper: '.memebox-deal-wrapper'
        },

        viewData : {
            className: 'deal-inline-gallery',
            title: '상품',
            total: 1,
            current: 1,
            lineAmount: 1,
            dealLength: null,
            dealWrapperWidth: null,
            defaultPosition: -10
        },

        initialize: function() {
            utility.uiEnhancements.call(this);
            this.setViewData();
            this.makeInlineGallery();
            this.setSlick();
        },

        setViewData: function() {
            if(viewData){
                this.viewData.className = viewData.className;
                this.viewData.title = viewData.title;
                this.viewData.lineAmount = viewData.lineAmount;
                this.viewData.total = Math.ceil(deals.length / viewData.lineAmount);
            }
        },

        makeInlineGallery: function() {
            var templates = '';
            var containerWidth = this.element.width();

            this.ui.dealList.append('<li></li>');
            this.element.width(containerWidth + 50);

            templates += dealInlineGallery_templates.title(this.viewData);
            this.element.prepend(templates);
        },

        setSlick: function() {
            this.ui.dealList.slick({
                arrows: false,
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