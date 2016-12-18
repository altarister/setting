var $ = require('jquery');
var utility = require('utility');
var Select = require('modules/_designViewer/_select/v.1.0.0/box/_select.jsx');

require('./dealSimpleChoice.scss');
//require('modules/_designViewer/_select/v.1.0.0/box/_select.scss');

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
            selectWrap: '.deal-simple-choice-select-wrap',
            optionSelector: '.select-design-viewer-option-selector',
            selectDesignViewer: '.select-design-viewer-list',
            selectDesignViewerOption: '.select-design-viewer-option',
            option: '.deal-item-option-viewer',
            resultItem: '.deal-simple-choice-result-item'
        },

        //optionData: {},

        initialize: function () {
            this.eventListener()
        },

        getMultiProducts: function(id){
            console.log('getMultiProducts = ',id);
            return [
                {
                    id: 'i1',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '에어', price: '11,000'}
                        ,color: {title: '색상', value: 'red'}
                        ,size: {title: '사이즈', value: '220'}
                    },
                    stock: 30
                },
                {
                    id: 'i2',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '에어', price: '11,000'}
                        ,color: {title: '색상', value: 'black'}
                        ,size: {title: '사이즈', value: '230'}
                    },
                    stock: 30
                },{
                    id: 'i3',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '에어', price: '11,000'}
                        ,color: {title: '색상', value: 'blue'}
                        ,size: {title: '사이즈', value: '220'}
                    },
                    stock: 30
                },
                {
                    id: 'i4',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '에어', price: '11,000'}
                        ,color: {title: '색상', value: 'blue'}
                        ,size: {title: '사이즈', value: '230'}
                    },
                    stock: 30
                },{
                    id: 'i5',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '조던', price: '12,000'}
                        ,color: {title: '색상', value: 'red'}
                        ,size: {title: '사이즈', value: '220'}
                    },
                    stock: 30
                },
                {
                    id: 'i6',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '조던', price: '12,000'}
                        ,color: {title: '색상', value: 'red'}
                        ,size: {title: '사이즈', value: '230'}
                    },
                    stock: 30
                },{
                    id: 'i7',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '조던', price: '12,000'}
                        ,color: {title: '색상', value: 'blue'}
                        ,size: {title: '사이즈', value: '220'}
                    },
                    stock: 30
                },
                {
                    id: 'i8',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '조던', price: '12,000'}
                        ,color: {title: '색상', value: 'blue'}
                        ,size: {title: '사이즈', value: '230'}
                    },
                    stock: 30
                }
            ]
        },

        getProducts: function(id){
            console.log('getProducts = ',id);
            return [
                {
                    id: 'i1',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '에어', price: '11,000'}
                        // ,color: {title: '색상', value: 'red'}
                        // ,size: {title: '사이즈', value: '220'}
                    },
                    stock: 30
                },
                {
                    id: 'i2',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '에어', price: '11,000'}
                        // ,color: {title: '색상', value: 'black'}
                        // ,size: {title: '사이즈', value: '230'}
                    },
                    stock: 30
                },{
                    id: 'i3',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '에어', price: '11,000'}
                        // ,color: {title: '색상', value: 'blue'}
                        // ,size: {title: '사이즈', value: '220'}
                    },
                    stock: 30
                },
                {
                    id: 'i4',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '에어', price: '11,000'}
                        // ,color: {title: '색상', value: 'blue'}
                        // ,size: {title: '사이즈', value: '230'}
                    },
                    stock: 30
                },{
                    id: 'i5',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '조던', price: '12,000'}
                        // ,color: {title: '색상', value: 'red'}
                        // ,size: {title: '사이즈', value: '220'}
                    },
                    stock: 30
                },
                {
                    id: 'i6',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '조던', price: '12,000'}
                        // ,color: {title: '색상', value: 'red'}
                        // ,size: {title: '사이즈', value: '230'}
                    },
                    stock: 30
                },{
                    id: 'i7',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '조던', price: '12,000'}
                        // ,color: {title: '색상', value: 'blue'}
                        // ,size: {title: '사이즈', value: '220'}
                    },
                    stock: 30
                },
                {
                    id: 'i8',
                    name:'나이키 ',
                    category: {
                        type: {title: '상품명', value: '조던', price: '12,000'}
                        // ,color: {title: '색상', value: 'blue'}
                        // ,size: {title: '사이즈', value: '230'}
                    },
                    stock: 30
                }
            ]
        },

        eventListener: function () {
            $.subscribe('deal.easyChoiceOption.open', $.proxy(this.setDealEasyChoiceOption, this));
        },

        setDealEasyChoiceOption: function(event, params) {
            var products = params.deal.options.products;
            var productsCategory = {};

            if(params.deal.options.hasMultiProducts){
                products = this.getMultiProducts(params.deal.id);
            }else{
                products = this.getProducts(params.deal.id);
            }
            params.deal.options.products = products;


            for(var index in products){
                var category = products[index].category;
                for(var key in category){
                    if( !productsCategory.hasOwnProperty(key) ){
                        var isDefault = (key === 'type')? true : false;
                        productsCategory[key] = {
                            isDefault : isDefault,
                            title: category[key].title,
                            value: [],
                            names: [],
                            key: key
                            //price: []
                        };
                    }

                    if (productsCategory[key].names.indexOf(category[key].value) < 0 ){
                        var price = null;
                        if( category[key].hasOwnProperty('price') ){
                            price = category[key].price; //productsCategory[key].price.push(category[key].price);
                         }

                        var obj = {name: category[key].value, price: price};
                        productsCategory[key].value.push(obj);
                        productsCategory[key].names.push(category[key].value);
                    }
                }
            }

            params.deal.options.multiProducts = productsCategory;
            console.log('params.deal.options.options = ',params.deal.options.options);
            this.makeDealEasyChoiceOption(params);
        },

        makeDealEasyChoiceOption: function(params){
            var select = new Select(params.deal.options);
            var selectElement = select.getElement();
            var $dealEasyChoiceOption = $(dealEasyChoiceOption_templates.option(params.deal));

            $dealEasyChoiceOption.find('.deal-simple-choice-select-wrap').append(selectElement);
            params.$element.empty();
            params.$element.append($dealEasyChoiceOption);
            utility.uiEnhancements.call(this);
            //this.addEventListener();
        },

        // setOptionData: function(option){
        //     for(var index in option){
        //         var key = option[index].id;
        //         this.optionData[key] = option[index]
        //     }
        //     console.log('this.optionData = ',this.optionData)
        // },

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