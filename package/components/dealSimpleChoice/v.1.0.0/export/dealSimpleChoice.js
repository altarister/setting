var DealEasyChoiceOption = function () {
    var controller = {
        element: '.deal-simple-choice-wrap',
        ui: {
            optionSelector: '.select-design-viewer-option-selector',
            selectDesignViewer: '.select-design-viewer-list',
            selectDesignViewerOption: '.select-design-viewer-option'
        },

        initialize: function () {

            this.eventListener()
        },

        eventListener: function () {
            $.subscribe('deal.easyChoiceOption.open', $.proxy(this.displayDealEasyChoiceOption, this));
        },

        displayDealEasyChoiceOption: function (event, params) {
    //params.$element :
            //params.dealId
            var data = {
                choiceTargetTitle : '[깨끗한나라] 맞춤커버 &amp; 탐폰 3종'
            };
            var $dealEasyChoiceOption = dealEasyChoiceOption_templates.option(data);

            params.$element.empty();
            params.$element.append($dealEasyChoiceOption);
            utility.uiEnhancements.call(this);
            this.addEventListener();
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.optionSelector, $.proxy(this.displaySelectDesignViewerEvent, this))
                .on('click', this.ui.__uiString.selectDesignViewerOption, $.proxy(this.selectDesignViewerOptionEvent, this))

        },

        displaySelectDesignViewerEvent: function(){
            console.log('optionSelector')
            this.ui.selectDesignViewer.toggle();
        },

        selectDesignViewerOptionEvent: function(){

        }
    };
    controller.initialize();
}