var $ = require('jquery');
var utility = require('utility');
var Menu = require('components/menu/v.1.0.0/_menu.jsx');
var Zipcode = require('components/zipcode/v.1.0.0/_zipcode.jsx');

require('./order.scss');

var Order = function(){
    var controller = {

        element: '.memebox-web-address-wrap',
        ui: {
            zipcodeTrigger: '.memebox-web-zipcode-trigger',
            zipcodeValue: '.memebox-web-zipcode-value',
            addressValue: '.memebox-web-address-value',
            orderZipcodeWrap: '.order-zipcode-wrap'
        },

        server: {
            development: 'https://internal.memeboxlabs.com:8012',
            production: 'http://contents-api.memeboxlabs.com',
            stage: 'http://contents-api-stage.memeboxlabs.com'
        },

        zipcode: null,
        layerModal: null,

        initialize: function(){
            new Menu();

            console.log('v.1.0.0----')
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        },

        displayOrderZipcodeWrap: function(isShow){
            if(isShow){
                this.ui.orderZipcodeWrap.css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#fff'
                }).height($('body').outerHeight(true))
                    .width($('body').outerWidth(true));
            }else{
                this.ui.orderZipcodeWrap.css({
                    position: 'static',
                    top: 0,
                    left: 0,
                    backgroundColor: 'inherit'
                }).height(0)
                    .width(0);
            }

        },

        zipcodeEvent: function(){
            var zipcode_params = {
                zipcodeAPI: {
                    sido: this.server.stage+'/api/zipcode/sido',
                    sigungu: this.server.stage+'/api/zipcode/sigungu',
                    jibun: this.server.stage+'/api/zipcode/jibuns',
                    range: this.server.stage+'/api/zipcode/ranges',
                    road: this.server.stage+'/api/zipcode/roads'
                },
                device: 'mobile'
            };
            this.displayOrderZipcodeWrap(true);

            this.zipcode = new Zipcode(this.collBackZipcode, this.ui.orderZipcodeWrap, zipcode_params);
        },

        collBackZipcode: function(data){
            //db저장 //
            console.log('collBackZipcode')
            controller.ui.zipcodeValue.text(data.zipcode);
            controller.ui.addressValue.text(data.roads);
            controller.zipcode = null;
            //test code//
            controller.displayOrderZipcodeWrap(false);
        }
    };
    controller.initialize();
};

module.exports = Order;