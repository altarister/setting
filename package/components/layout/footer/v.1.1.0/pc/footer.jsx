var $ = require('jquery');
var utility = require('utility');
var slick = require('slick');

var Select = require('modules/_designViewer/_select/v.1.0.0/box/_select.jsx');

require('./footer.scss');

var footer = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            awardsUl: '.corporation-awards-ul',
            awards: '.corporation-awards',
            familySite: '.corporation-familySite'
        },

        selectData: {
            isDefaultType: true,
            options: [
                {
                    tegName: 'a',
                    attribute: [
                        {class: 'corporation-familySite-corp', href:'#'}
                    ],
                    data: [
                        {value: '', name: 'FAMILY SITE'}
                    ],
                    text: 'FAMILY SITE'
                },
                {
                    tegName: 'a',
                    attribute: [
                        {class: 'corporation-familySite-corp', href:'http://corp.memebox.com', target:'_blank'}
                    ],
                    data: [
                        {value: '기업사이트', name: '기업사이트'}
                    ],
                    text: '미미박스 기업사이트'
                },
                {
                    tegName: 'a',
                    attribute: [
                        {class: 'corporation-familySite-immeme', href:'http://​iammeme.com', target:'_blank'}
                    ],
                    data: [
                        {value: 'IM MEME', name: 'IM MEME'}
                    ],
                    text: 'IM MEME 아임미미'
                },
                {
                    tegName: 'a',
                    attribute: [
                        {class: 'corporation-familySite-ponyEffect', href:'http://ponyeffect.com', target:'_blank'}
                    ],
                    data: [
                        {value: 'PonyEffect', name: 'PonyEffect'}
                    ],
                    text: 'Pony Effect 포니이펙트'
                },
                {
                    tegName: 'a',
                    attribute: [
                        {class: 'corporation-familySite-usa', href:'http://​iammeme.com', target:'_blank'}
                    ],
                    data: [
                        {value: 'USA', name: 'USA'}
                    ],
                    text: 'MEMEBOX USA'
                },
                {
                    tegName: 'a',
                    attribute: [
                        {class: 'corporation-familySite-china', href:'http://​iammeme.com', target:'_blank'}
                    ],
                    data: [
                        {value: 'CHINA', name: 'CHINA'}
                    ],
                    text: 'MEMEBOX CHINA'
                }
            ]
        },

        initialize: function(){
            console.log('pc-footer')
            utility.uiEnhancements.call(this);
            this.addEventListener();
            this.makeFamilySiteSelect();
            this.setSlick();
        },

        addEventListener: function(){
            // this.element.off()
            //     .on('click', this.ui.__uiString.zipcodeTrigger, $.proxy(this.zipcodeEvent, this))
        },

        makeFamilySiteSelect: function(){
            //console.log('this.selectData = ',this.selectData)
            var select = new Select(this.selectData); //data, element
            //console.log('2 = ',this.selectData)
            var selectElement = select.getElement();
            //console.log('3 = ',selectElement.html())
            this.ui.familySite.append(selectElement);
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