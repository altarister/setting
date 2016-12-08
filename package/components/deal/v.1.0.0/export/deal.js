var Deal = function (deal, trackFunction) {
    var controller = {

        element: null,
        ui: {
            info: '.memebox-deal-info'
            , timer: '.memebox-deal-timer-value'
            , poke: '.memebox-deal-poke'
            , link: '.memebox-deal-link'
            , dealImage: '.memebox-deal-image'
        },

        currentRemainingTime: deal.remainingTime.seconds,

        initialize: function(){
            this.makeDealElement(deal);
            utility.uiEnhancements.call(this);
            this.eventListener();

            if(this.currentRemainingTime){
                if(window.deal_RemainingTimeInterval){
                    $.subscribe('deal.remainingTime', $.proxy(this.remainingTimeEvent, this));
                }else{
                    this.setTimer(deal.remainingTime.seconds);
                }
            }
        },

        makeDealElement: function(deal){
            var template = '';

            template += deal_templates.image(deal);
            template += deal_templates.name(deal);
            template += deal_templates.price(deal.price);
            template += deal_templates.status(deal);
            template += deal_templates.delivery(deal);
            if(deal.sold.out){
                template += deal_templates.out(deal);
            }else{
                template += deal_templates.link(deal);
            }
            template += deal_templates.poke(deal);

            this.element = $(deal_templates.layout(deal));
            this.element.find(this.ui.info).append(template);
        },

        eventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.link, $.proxy(this.linkEvent, this));

            var dealImage = new Image();
            $(dealImage).on('load', $.proxy(this.imageEvent, this));
            dealImage.src = deal.image.src;
        },

        //클릭전에 tracking 코드 실행
        linkEvent: function(event){
            if(event.isDefaultPrevented()){
                tracking.analytics.track(deal.tracking.analytics);
            }else{
                if(typeof trackFunction === 'function'){
                    trackFunction(deal.tracking.analytics)
                }
            }
            return true
        },

        imageEvent : function(){
            if(deal.image.type != 'wide') return;

            var imageWidth = this.ui.dealImage.width();
            var imageHeight = this.ui.dealImage.height();
            if(imageWidth === imageHeight){
                this.ui.dealImage.css({
                    width: 'auto',
                    height: imageWidth / 2
                });
            }
        },

        remainingTimeEvent: function(){
            if (this.currentRemainingTime < 0) {
                return;
            }else{
                this.displayTimer(this.currentRemainingTime);
            }
        },

        setTimer: function(remainingTime){
            var timer = setInterval(function () {
                controller.displayTimer(remainingTime);

                if (--remainingTime < 0) {
                    clearInterval(timer);
                }
            }, 1000);
            this.displayTimer(remainingTime);
        },

        displayTimer: function(remainingTime){
            var hour = parseInt(remainingTime / 60 / 60 , 10);
            var minutes = parseInt((remainingTime / 60) % 60, 10);
            var seconds = parseInt(remainingTime % 60, 10);

            hour = hour < 10 ? "0" + hour : hour;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            controller.ui.timer.text(hour + ":" + minutes + ":" + seconds);
        },

        getDealString: function(){
            return this.element;
        }
    };

    controller.initialize();

    return controller;
};