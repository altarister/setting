//var $ = require('jquery');
//var utility = require('utility');
//var dealView = require('components/dealView/v.1.0.0/_dealView.jsx');
//var menu = require('components/menu/v.1.0.0/_menu.jsx');
// webpack 이면 풀어야 한다.
// var zipcode = require('components/zipcode/v.1.0.0/_zipcode.jsx');
// var layer_modal = require('modules/layer/modal/v.1.0.0/_modal.jsx');
//require('modules/modal/v.1.0.0/_modal.jsx');
//require('./cart.scss');

var cart = function(){
    var controller = {

        element: '.memebox-web-address-wrap',
        ui: {
            zipcodeTrigger: '.memebox-web-zipcode-trigger',
            zipcodeValue: '.memebox-web-zipcode-value',
            addressValue: '.memebox-web-address-value'
        },

        server: {
            development: 'https://internal.memeboxlabs.com:8012',
            production: 'http://contents-api.memeboxlabs.com',
            stage: 'http://contents-api-stage.memeboxlabs.com'
        },

        initialize: function(){
            utility.uiEnhancements.call(this);
            this.addEventListener();
            this.ui.zipcodeTrigger.trigger('click')
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        },

        zipcodeEvent: function(){
            var layer_params = {
                style: {
                    width: 520,
                    height: 600,
                    backgroundColor: 'white',
                    position: 'center'
                },
                content: {
                    title: '우편번호',
                    hasCloseButton: true
                },
                enableClickBackdrop : true
            };

            var zipcode_params = {
                zipcodeAPI: {
                    sido: this.server.stage+'/api/zipcode/sido',
                    sigungu: this.server.stage+'/api/zipcode/sigungu',
                    jibun: this.server.stage+'/api/zipcode/jibuns',
                    range: this.server.stage+'/api/zipcode/ranges',
                    road: this.server.stage+'/api/zipcode/roads'
                },
                device: 'pc'
            };

            if(!this.layerModal){
                this.layerModal = new layer_modal(layer_params);
            }
            this.layerModal.show();
            this.zipcode = new zipcode(this.collBackZipcode, this.layerModal.getContentWrap(), zipcode_params);
        },

        zipcode: null,
        layerModal: null,

        collBackZipcode: function(data){
            console.log('data ++++++++++ ',data,' ++++++++');
            //db저장 //
            controller.ui.zipcodeValue.text(data.zipcode);
            controller.ui.addressValue.text(data.roads);
            controller.layerModal.hide();
            controller.zipcode = null;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%',data)
        },

        makeMenu: function(){
            new menu();
        }
    };
    controller.initialize();
};

module.exports = cart;