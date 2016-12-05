var $ = require('jquery');
var utility = require('utility');

require('./dealSimpleChoice.scss');
require('modules/_designViewer/_select/v.1.0.0/box/_select.scss');

var dealEasyChoiceOption_templates = {
    dealItemSelectedOption: require('./pc/_templates/_dealItemSelectedOption.hbs'),
    option: require('./pc/_templates/_option.hbs'),
    accordionInfo: require('./pc/_templates/_accordionInfo.hbs'),
    accordionContent: require('./pc/_templates/_accordionContent.hbs')
};

var DealEasyChoiceOption = function () {
    var controller = {
        element: '.deal-simple-choice-wrap',
        ui: {
            optionSelector: '.select-design-viewer-option-selector',
            selectDesignViewer: '.select-design-viewer-list',
            selectDesignViewerOption: '.select-design-viewer-option',
            option: '.deal-item-option-viewer',
            resultItem: '.deal-simple-choice-result-item',
            accordionWrap: '.design-template-accordion-wrap',
            accordionController: '.design-template-accordion-controller'
        },

        optionData: {},

        initialize: function () {
            this.eventListener()
        },

        eventListener: function () {
            //$.subscribe('deal.easyChoiceOption.open', $.proxy(this.displayDealEasyChoiceOption, this));
            $.subscribe('deal.easyChoiceOption.open', $.proxy(this.setDealEasyChoiceOption, this));
        },

        setDealEasyChoiceOption: function(event, params) {
            var items = params.deal.option.products;
            var dealOptionCategory = {};
            var productsCategory = {}
            var productsCategoryResult = {
                type: {title: '상품명', value: ['에어', '조던'], price: ['11,000', '13,000']},
                color: {title: '색생', value: ['red','blue']},
                size: {title: '사이즈', value: ['230', '240']}
            }
            var dealProduct = [];
            var $dealEasyChoiceOption = $(dealEasyChoiceOption_templates.option(params.deal));

            for(var index in items){
                var category = items[index].category;

                for(var key in category){
                    if( !productsCategory.hasOwnProperty(key) ){
                        productsCategory[key] = {
                            title: category[key].title,
                            value: [],
                            price: []
                        };
                    }
                    if (productsCategory[key].value.indexOf(category[key].value) < 0 ){
                        productsCategory[key].value.push(category[key].value);
                        if( category[key].hasOwnProperty('price') ){
                            productsCategory[key].price.push(category[key].price);
                        }
                    }
                }
            }

            console.log('productsCategory = ',productsCategory);
            this.makeDealEasyChoiceOption(productsCategory, params);
        },

        makeDealEasyChoiceOption: function(productsCategory, params){
            var items = params.deal.option.products;
            var content = '';

            if(Object.keys(productsCategory).length > 1){
                console.log('아코디언')
                for(var key in productsCategory){
                    content += '<li class="select-design-viewer-option">'
                    content += '   <div  class="design-template-accordion-wrap'+((key === "type")?' accordion-open':'')+'">';
                    content +=          dealEasyChoiceOption_templates.accordionInfo(productsCategory[key].title);
                    content += '        <ul class="design-template-accordion-list">';
                    for(var index in productsCategory[key].value) {
                        content += '            <li class="design-template-accordion-content">';
                        content += dealEasyChoiceOption_templates.accordionContent({
                            value: productsCategory[key].value[index],
                            price: productsCategory[key].price[index]
                        });
                        content += '            </li>';
                    }
                    content += '        </ul>';
                    content += '    </div>';
                    content += '</li>'
                }
            }else{
                console.log('싱클리스트')
                for(var index in items){
                    if(items[index].stock > 0 ){
                        content += '<li class="select-design-viewer-option">'
                        content += dealEasyChoiceOption_templates.accordionContent({
                            value:items[index].category.type.value,
                            price:items[index].category.type.price
                        });
                        content += '</li>'
                    }
                }
            }

            var $dealEasyChoiceOption = $(dealEasyChoiceOption_templates.option(params.deal));
            $dealEasyChoiceOption.find('.select-design-viewer-list').prepend(content);
            params.$element.empty();
            params.$element.append($dealEasyChoiceOption);
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },


        displayDealEasyChoiceOption: function (event, params) {
            console.log('params.deal==================================');
            var items = params.deal.option.items;
            var dealOptionCategory = {};
            var dealProduct = [];
            var $dealEasyChoiceOption = $(dealEasyChoiceOption_templates.option(params.deal));

            var $viewrList = $dealEasyChoiceOption.find('.select-design-viewer-list');

            for(var index in items){
                var category = items[index].category;
                var name = items[index].name;

                if (dealProduct.indexOf(name) < 0 ){
                    dealProduct.push(name);
                }
                for(var key in category){
                    if( !dealOptionCategory.hasOwnProperty(key) ){
                        console.log('새로만들어 넣는다');
                        dealOptionCategory[key] = [];
                    }
                    if (dealOptionCategory[key].indexOf(category[key]) < 0 ){
                        dealOptionCategory[key].push(category[key]);
                    }
                }
            }

            var content = '';
            if(Object.keys(dealOptionCategory).length > 1){
                content += '<li class="select-design-viewer-option">'
                content += '   <div  class="design-template-accordion-wrap accordion-open">';
                content +=          dealEasyChoiceOption_templates.accordionInfo('상품');
                content += '        <ul class="design-template-accordion-list">';
                for(var index in dealProduct) {
                    content += '            <li class="design-template-accordion-content">';
                    content += dealEasyChoiceOption_templates.accordionContent({
                        info: dealProduct[index],
                        value: index,
                        unit: '원'
                    });
                    content += '            </li>';
                }
                content += '        </ul>';
                content += '    </div>';
                content += '</li>';

                for(var key in dealOptionCategory){
                    content += '<li class="select-design-viewer-option">'
                    content += '   <div  class="design-template-accordion-wrap">';
                    content +=          dealEasyChoiceOption_templates.accordionInfo(key);
                    content += '        <ul class="design-template-accordion-list">';
                    for(var index in dealOptionCategory[key]) {
                        content += '            <li class="design-template-accordion-content">';
                        content += dealEasyChoiceOption_templates.accordionContent({
                            info: dealOptionCategory[key][index],
                            value: '',
                            unit: ''
                        });
                        content += '            </li>';
                    }
                    content += '        </ul>';
                    content += '    </div>';
                    content += '</li>'
                }
            }else{
                for(var index in items){
                    if(items[index].stock > 0 ){
                        content += '<li class="select-design-viewer-option">'
                        content += dealEasyChoiceOption_templates.accordionContent({info:items[index].name, value:items[index].price, unit:items[index].unit});
                        content += '</li>'
                    }
                }
            }




            console.log('this.dealOptionCategory = ',dealOptionCategory);
            console.log('params.deal==================================');



            var accordionInfo = dealEasyChoiceOption_templates.accordionInfo('gggg');

            //var accordionContent = dealEasyChoiceOption_templates.accordionContent({info:'aa', value:'ss', unit:'22'});
            $dealEasyChoiceOption.find('.select-design-viewer-list').prepend(content);
            // $dealEasyChoiceOption.find('.design-template-accordion-wrap').prepend(accordionInfo);
            // $dealEasyChoiceOption.find('.design-template-accordion-list').prepend(accordionContent);

            //dealEasyChoiceOption_templates.accordionInfo();

            this.setOptionData(params.deal.option.type);
            params.$element.empty();
            params.$element.append($dealEasyChoiceOption);
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },
        //{id: 'i1', category: 'size', info: '220', stock: 30, value: '11,000', unit: '원'}
        setOptionData: function(option){
            for(var index in option){
                var key = option[index].id;
                this.optionData[key] = option[index]
            }
            console.log('this.optionData = ',this.optionData)
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.optionSelector, $.proxy(this.displaySelectDesignViewerEvent, this))
                .on('click', this.ui.__uiString.selectDesignViewerOption, $.proxy(this.selectDesignViewerOptionEvent, this))
                .on('click', this.ui.__uiString.option, $.proxy(this.optionEvent, this))
                .on('click', this.ui.__uiString.accordionController, $.proxy(this.accordionControllerEvent, this))

        },

        optionEvent: function(event){
            event.preventDefault();
            var $element = $(event.currentTarget);
            console.log('999');
            var selectedOption = dealEasyChoiceOption_templates.dealItemSelectedOption();
            this.ui.resultItem.prepend()
        },

        accordionControllerEvent: function(event){
            console.log('aaa')
            this.ui.accordionWrap.removeClass('accordion-open');
            $(event.currentTarget).closest(this.ui.__uiString.accordionWrap).addClass('accordion-open')
        },

        displaySelectDesignViewerEvent: function(){
            console.log('optionSelector')
            this.ui.selectDesignViewer.toggle();
        },

        selectDesignViewerOptionEvent: function(){

        }
    };
    controller.initialize();
};

module.exports = DealEasyChoiceOption;