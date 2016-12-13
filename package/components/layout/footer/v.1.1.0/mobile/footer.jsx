var $ = require('jquery');
var utility = require('utility');
var slick = require('slick');

require('modules/_designViewer/_select/v.1.0.0/line/_select.scss');
require('./footer.scss');

var footer = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            awardsUl: '.corporation-awards-ul',
            awards: '.corporation-awards'
        },

        initialize: function(){
            console.log('footer')
            utility.uiEnhancements.call(this);
            this.addEventListener();
            this.setSlick();
        },

        addEventListener: function(){
            // this.element.off()
            //     .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        },

        setSlick: function() {
            this.ui.awardsUl.css('width', 'auto').slick({
                arrows: true,
                dots: false,
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1
            });
        }

    };
    controller.initialize();
};

module.exports = footer;