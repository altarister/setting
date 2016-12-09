var $ = require('jquery');
var utility = require('utility');

require('device/deal_type_horizontal_square_10.scss');
require('device/deal_type_vertical_circle_4.scss');
require('device/deal_type_vertical_square_4.scss');
require('device/deal_type_vertical_square_10.scss');
require('device/deal_type_vertical_wide_2.scss');

require('device/_sticker.scss');

var deal_templates = {
    layout: require('./_templates/_layout.hbs'),
    image: require('./_templates/_image.hbs'),
    name: require('./_templates/_name.hbs'),
    price: require('./_templates/_price.hbs'),
    status: require('./_templates/_status.hbs'),
    delivery: require('./_templates/_delivery.hbs'),
    poke: require('./_templates/_poke.hbs'),
    out: require('./_templates/_out.hbs'),
    link: require('./_templates/_link.hbs')
};

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
            this.ui.dealImage
                .on('load', $.proxy(this.defaultImageLoadEvent, this));

            if(this.currentRemainingTime){
                if(window.deal_RemainingTimeInterval){
                    $.subscribe('deal.remainingTime', $.proxy(this.remainingTimeEvent, this));
                }else{
                    this.setTimer(deal.remainingTime.seconds);
                }
            }

            this.element.off()
                .on('click', this.ui.__uiString.link, $.proxy(this.linkEvent, this));
        },

        defaultImageLoadEvent: function(){
            console.log('')
            var imageHeight = this.ui.dealImage.height();
            this.ui.dealImage
                .off()
                .on('error', $.proxy(this.errorImageLoadEvent, this))
                .attr('src', deal.image.src)
                .css({
                    width: 'auto',
                    height: imageHeight
                });
        },

        errorImageLoadEvent: function(event) {
            this.ui.dealImage
                .off()
                .attr('src', deal.image.error);
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

        remainingTimeEvent: function(){
            if (this.currentRemainingTime >= 0) {
                this.displayTimer(this.currentRemainingTime--);
            }
        },

        setTimer: function(remainingTime){
            var timer = setInterval(function () {
                controller.displayTimer(remainingTime--);

                if (remainingTime < 0) {
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

module.exports = Deal;