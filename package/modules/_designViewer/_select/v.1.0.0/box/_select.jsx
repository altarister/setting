var $ = require('jquery');
var utility = require('utility');

require('./_select.scss');

var select_templates = {
    _select: require('../_templates/_select.hbs'),
    _select_accordion: require('../_templates/_select_accordion.hbs')
};

var Select = function (data, $wrap) {
    var controller = {

        element: $wrap,
        ui: {
            selector: '.select-design-viewer-option-selector',
            selected: '.select-design-viewer-option-selector .value',
            optionList: '.select-design-viewer-list',
            option: '.select-design-viewer-option',
            accordionWrap: '.design-template-accordion-wrap',
            accordionController: '.design-template-accordion-controller'
        },

        initialize: function(){
            this.makeSelect();
        },


        makeSelect: function(){
            if(!$wrap){
                this.element = $(select_templates._select(data))
            }
            utility.uiEnhancements.call(this);
            this.eventListener();

            if(!data.hasOwnProperty('isDefaultType')){
                this.addEventListener();
            }else{
                this.ui.selected.data('value', data.options[0].data[0].value).text(data.options[0].text)
            }
        },

        eventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.selector, $.proxy(this.selectorEvent, this))
                .on('click', this.ui.__uiString.option, $.proxy(this.optionEvent, this));
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.selector, $.proxy(this.selectorEvent, this))
                .on('click', this.ui.__uiString.option, $.proxy(this.accordionOptionEvent, this))
                .on('click', this.ui.__uiString.accordionController, $.proxy(this.accordionControllerEvent, this));
        },

        selectorEvent: function(){
            this.ui.optionList.toggle();
        },

        optionEvent: function(event){
            var $currentElement = $(event.currentTarget);
            var index = $currentElement.data('index');
            var currentOption = data.options[index];
            this.ui.selected.data('value', currentOption.data[0].value).text(currentOption.text);
            this.ui.optionList.toggle();
        },

        accordionOptionEvent: function(event){
            if(data.hasMultiProducts){
                var $currentElement = $(event.currentTarget);
                var value = $currentElement.data('option-value');
                var text = value+ ' / ';
                var key = $currentElement.data('option-key');
                var $select = this.ui.selected.find('[data-key='+key+']');
                if($select.length === 0){
                    this.ui.selected.append($('<span data-key="'+key+'" data-value="'+value+'">').text(text))
                }else{
                    $select.data('value',value).text(text)
                }
                this.displayAccordion(this.getChoiceOption(data.products.slice()));
            }else{
                //todo:
                this.ui.optionList.toggle();
            }
        },

        displayAccordion : function(products){
            var productsCategory = {};
            var openAccordion = false;
            for(var index in products){
                var category = products[index].category;
                for(var key in category){
                    if( !productsCategory.hasOwnProperty(key) ){
                        var isDefault = true;
                        if(this.ui.selected.find('[data-key="'+key+'"]').length > 0 || openAccordion){
                            isDefault = false;
                        }else{
                            isDefault = true;
                            openAccordion = true;
                        }

                        productsCategory[key] = {
                            isDefault : isDefault,
                            title: category[key].title,
                            value: [],
                            names: [],
                            key: key
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
            var multiProducts = {multiProducts:productsCategory};

            this.ui.optionList.empty().append(select_templates._select_accordion(multiProducts));
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },

        getChoiceOption: function(products){
            var $selected = this.ui.selected.find('[data-key]');

            $selected.each(function(index, element){
                var key = $(element).data('key');
                var value = $(element).data('value');

                for(var i = 0 ; i < products.length ; i++){
                    if (products[i].category[key].value != value) {
                        products.splice(i, 1);
                        i--;
                    }
                }
            });
            return products
        },

        accordionControllerEvent: function(event){
            this.ui.accordionWrap.removeClass('accordion-open');
            $(event.currentTarget).closest(this.ui.__uiString.accordionWrap).addClass('accordion-open')
        },

        getElement: function(){
            return this.element;
        }

    };

    controller.initialize();

    return controller;
};

module.exports = Select;