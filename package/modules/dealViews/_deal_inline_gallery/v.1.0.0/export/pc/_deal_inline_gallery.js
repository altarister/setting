var DealInlineGallery = function (element, viewData, deals) {
    var controller = {
        element: element,
        ui: {
            dealList: '.memebox-deal-list',
            dealWrapper: '.memebox-deal-wrapper',
            deal: '.memebox-deal',
            left: '.deal-inline-gallery-navigation .left',
            right: '.deal-inline-gallery-navigation .right',
            current: '.deal-inline-gallery-navigation .current',
            total: '.deal-inline-gallery-navigation .total'
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
            this.setViewData();
            this.makeInlineGallery();
            this.setDealListWidth();
            this.setNavigation(0);
            this.moveDealList(0); //
            this.addEventListener();
        },

        addEventListener: function() {
            this.element.off()
                .on('click', this.ui.__uiString.left, $.proxy(this.directionEvent, this))
                .on('click', this.ui.__uiString.right, $.proxy(this.directionEvent, this));
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

            templates += deal_inline_gallery_templates.title(this.viewData);
            templates += deal_inline_gallery_templates.navigation(this.viewData);
            this.element.prepend(templates);
            utility.uiEnhancements.call(this);
            this.element.addClass(this.viewData.className+'-wrap');
            this.ui.dealList.addClass(this.viewData.className);
        },

        setDealListWidth: function(){
            var containerWidth = this.element.width();
            var dealMargin = this.ui.deal.outerWidth(true) - this.ui.deal.outerWidth();
            console.log('dealMargin',dealMargin);

            var leftMargin = dealMargin / 2;
            var dealWrapperWidth = Math.floor(((containerWidth + dealMargin) / this.viewData.lineAmount));
            var dealsLength = deals.length;

            this.viewData.defaultPosition = -leftMargin;
            this.viewData.dealWrapperWidth = dealWrapperWidth;
            this.ui.dealWrapper.width(dealWrapperWidth);
            this.ui.dealList.width( dealWrapperWidth * dealsLength);
        },

        directionEvent: function(event){
            event.preventDefault();
            var $element = $(event.currentTarget);
            var isDisabled = $element.hasClass('disabled');
            var direction = $(event.currentTarget).data('arrow-direction');

            if(!isDisabled){
                this.setNavigation(direction);
                this.moveDealList(direction);
            }
        },

        setNavigation: function(direction){
            var current = this.viewData.current;
            var total =  Math.ceil(deals.length / this.viewData.lineAmount);
            var next = current - direction;

            if( next <= 1 ){
                this.ui.left.addClass('disabled');
                this.ui.right.removeClass('disabled');
            }else if( next >= total ){
                this.ui.right.addClass('disabled');
                this.ui.left.removeClass('disabled');
            }else{
                this.ui.right.removeClass('disabled');
                this.ui.left.removeClass('disabled');
            }
            this.ui.current.text(next);
            this.viewData.current = next;
        },

        moveDealList: function(direction) {
            var currentPosition = Number(this.ui.dealList.css('left').replace(/px/g, ''));
            var distance = direction * this.viewData.dealWrapperWidth * this.viewData.lineAmount + currentPosition;

            this.ui.dealList.css('left', distance);
        }
    };
    controller.initialize();
};