var $ = require('jquery');
var utility = require('utility');
var dealView = require('components/dealView/v.1.0.0/_dealView.jsx');
var menu = require('components/menu/v.1.0.0/_menu.jsx');
// webpack 이면 풀어야 한다.
var zipcode = require('components/zipcode/v.1.0.0/_zipcode.jsx');
require('modules/modal/v.1.0.0/_modal.jsx');
require('./main.scss');

var main = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            components: '[data-component]',
            zipcodeTrigger: '.memebox-altari-zipcode-trigger',
            zipcodeValue: '.memebox-altari-zipcode-value',
            addressValue: '.memebox-altari-address-value',
            moduleModalLayer: '.module-modal-layer',
            moduleModalLayer__contents: '.module-modal-layer__contents',
            moduleModalLayer__closing: '.module-modal-layer-closing',
            moduleModalLayer__controller: '.module-modal-layer-controller'
        },

        components : {},

        device: 'pc',

        initialize: function(){
            utility.uiEnhancements.call(this);
            //this.getComponents();
            this.makeMenu();
            this.addEventListener();
            //test 코드
                this.ui.zipcodeTrigger.trigger('click')
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        },

        zipcodeEvent: function(){
            if(this.device === 'pc'){
                var layerStyle = {width: 320, height: 500, background: 'white'};

                $('.module-modal-layer')
                    .off()
                    .on('shown.ui.modal', function ($modal) {
                        $(window).on('resize.ui.modal', function () {
                            $modal.position({
                                my: "center",
                                at: "center",
                                of: window,
                                using: function (pos) {
                                    var topOffset = $(this).css(pos).offset();
                                    if (topOffset.top < 20) { $(this).css("top", 20); }
                                    if (topOffset.left < 20) { $(this).css("left", pos.left - topOffset.left); }
                                }
                            });
                        }).trigger('resize.ui.modal');
                    })
                    .on('hide.ui.modal', function () {
                        $(window).off('resize.ui.modal');
                    })
                    .on('click', controller.ui.__uiString.moduleModalLayer__closing, function (event) {
                        event.preventDefault();
                        controller.ui.moduleModalLayer.modal('hide');
                    }).css(layerStyle).modal('show');
                this.setLayerContentHeight();
                new zipcode(this.collBackZipcode, $('.module-modal-layer__contents'));
            }else{
                new zipcode(this.collBackZipcode, this.ui.moduleModalLayer__contents);
            }
        },

        setLayerContentHeight: function(){
            var layerHeight = this.ui.moduleModalLayer.outerHeight();
            var layerHeaderHeight = this.ui.moduleModalLayer__controller.outerHeight();
            var layerPadding = (this.ui.moduleModalLayer__contents.outerWidth(true) - this.ui.moduleModalLayer__contents.innerWidth())/2;
            console.log(layerHeight,'-',layerHeaderHeight,'-',layerPadding)
            var contentHeight = layerHeight - layerHeaderHeight - layerPadding;
            this.ui.moduleModalLayer__contents.height(contentHeight);
        },

        // getComponents: function(){
        //     this.ui.components.each(function(index, element){
        //         var component = $(element).data('component');
        //         console.log('component ====== ',component)
        //     })
        // },

        collBackZipcode: function(data){
            console.log('data ++++++++++ ',data,' ++++++++');
            //db저장 //
            controller.ui.zipcodeValue.text(data.zipcode);
            controller.ui.addressValue.text(data.roads);
            controller.ui.moduleModalLayer.modal('hide');
            controller.ui.moduleModalLayer__contents.empty();
            console.log('%%%%%%%%%%%%%%%%%%%%%%%',data)
        },

        makeMenu: function(){
            new menu();
        }
    };
    controller.initialize();
};

module.exports = main;