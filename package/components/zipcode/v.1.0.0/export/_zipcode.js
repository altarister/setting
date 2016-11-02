// var $ = require('jquery');
// var utility = require('utility');
// require('./_zipcode.scss');
// var css = require('./_modal.scss');

var templates = {
    // gide: require('./_gide.hbs'),
    gide: function(data){
        var template = '';
            template += '<strong class="zip-code-search-user-choice-gide-title">';
            template += '</strong>';
            template += '<ol class="zip-code-search-user-choice-gide-ol">';
            for(var index in data){
                template += '<li class="zip-code-search-user-choice-gide-li">';
                template += data[index];
                template += '</li>';
            }
            template += '</ol>';
        return template
    }
    ,
    // result: require('./_result.hbs'),
    result: function(data) {
        var template = '';

        //+'{{!--검색 결과 건수 & 설명--}}'
        template += '<p class="zip-code-search-result-info">'
        template += '검색결과 총 <span class="zip-code-search-result-info-count">'+data.totalCount+'</span>건 입니다.'
        template += '<span class="zip-code-search-result-gide">정확한 검색을 위해 지번 또는 건물명을 함께 검색해주세요.</span>'
        template += '</p>'

        //+'{{!--검색 결과 필터--}}'
        template += '<div class="zip-code-search-result-filter-wrap">'
        template += '<span class="zip-code-search-result-filter-title">검색 결과 필터</span>'
        template += '<select class="zip-code-search-result-filter-select-city">'
        template += '<option value="">시/도 선택</option>'
        for(var index in data.aggregations.sido) {//'{{#each aggregations.sido}}'
            template += '<option value="'+data.aggregations.sido[index].key+'">'+data.aggregations.sido[index].key+'('+data.aggregations.sido[index].count+'건)</option>'
        }
        template += '</select>'
        template += '<select class="zip-code-search-result-filter-select-town">'
        template += '<option value="">시/군/구 선택</option>'
        for(var index in data.aggregations.sigungu) {//'{{#each aggregations.sigungu}}'
            template += '<option value="'+data.aggregations.sigungu[index].key+'">'+data.aggregations.sigungu[index].key+'('+data.aggregations.sigungu[index].count+'건)</option>'
        }
        template += '</select>'
        template += '</div>'
        //+'{{!-- start 검색 결과 내용--}}'
        template += '<div class="zip-code-search-result-contents-wrap">'
        template += '<ul class="zip-code-search-result-contents-ul">'
        for(var index in data.address) {//'{{#each address}}'
            template += '<li class="zip-code-search-result-contents-li">'
            //+'{{!-- start 우펀번호 + 도로주소 + 지번주소 --}}'
            template += '<a href="#" class="zip-code-search-result-trigger" data-zipcode=\''+JSON.stringify(data.address[index])+'\'>'
            template += '<strong class="zip-code-search-result-key">'+data.address[index].zipcode+'</strong>'
            template += '<em class="zip-code-search-result-road">'
            template += '<span class="zip-code-search-result-type">도로명</span>'
            template += '<span class="zip-code-search-result-address">'
            template += data.address[index].roads
            template += '</span>'
            template += '</em>'
            template += '<em class="zip-code-search-result-jibun">'
            template += '<span class="zip-code-search-result-type">지번</span>'
            template += '<span class="zip-code-search-result-address">'
            template += data.address[index].jibuns
            template += '</span>'
            template += '</em>'
            template += '</a>'
            //+'{{!-- end 우펀번호 + 도로주소 + 지번주소 --}}'
            template += '</li>'
        }
        template += '</ul>'
        template += '</div>'
        return template
    }
    ,
    // zipcode: require('./_zipcode.hbs')
    zipcode: function(data) {
        var template = '';

        template += '<div class="zip-code-search" data-component="zipcode" data-component-data="'+JSON.stringify(data)+'">'
        //{{!--검색 방밥 선택--}}
        template += '<ul class="zip-code-search-type-selector-ul">'
        template += '<li class="zip-code-search-type-selector-road">'
        template += '<a class="zip-code-search-type-selector-trigger selected" href="#road">도로명으로 찾기</a>'
        template += '</li>'
        template += '<li class="zip-code-search-type-selector-jibun">'
        template += '<a class="zip-code-search-type-selector-trigger" href="#jibun">지번으로 찾기</a>'
        template += '</li>'
        template += '</ul>'

        template += '<div class="zip-code-search-contents">'
        //{{!--검색 사용자 입력 혹은 선택--}}
        template += '<div class="zip-code-search-user-choice-wrap">'
        template += '<div class="zip-code-search-user-select-wrap">'
        template += '<select class="zip-code-search-user-select-city">'
        template += '<option value="">시/도 선택</option>'
        template += '<option value="#강원도">강원도</option>'
        template += '</select>'
        template += '<select class="zip-code-search-user-select-town">'
        template += '<option value="">시/군/구 선택</option>'
        template += '</select>'
        template += '</div>'
        template += '<div class="zip-code-search-user-input-wrap">'
        template += '<input type="text" class="zip-code-search-user-input" name="searchKey" value="" placeholder="(예: 테헤란로 501, 삼성동 157-27, 반포자이아파트)">'
        template += '<button type="submit" class="zip-code-search-user-choice-submit">검색</button>'
        template += '<p class="zip-code-search-user-input-gide">시/도 , 시/군/구 선택 후 주소명을 입력해주세요.</p>'
        template += '</div>'
        template += '</div>'

        //{{!--검색 팁 : 검색 결과와 대치--}}
        template += '<div class="zip-code-search-user-choice-gide">'
        //{{!> components/zipcode/v.1.0.0/_gide}}
        template += '</div>'
        //{{!-- start 모든 검색 결과--}}
        template += '<div class="zip-code-search-result-wrap">'
        //{{!> components/zipcode/v.1.0.0/_result}}
        template += '</div>'
        //{{!-- end 모든 검색 결과--}}
        template += '</div>'
        template += '</div>'

        return template
    }
};

var zipcode = function($wraper, collBackFunction){
    var controller = {

        element: '.zip-code-search',
        ui: {
            typeSelector : '.zip-code-search-type-selector-trigger'
            ,searchSelectorWrap : '.zip-code-search-user-select-wrap'
            ,inputGide: '.zip-code-search-user-input-gide'
            ,choiceGideTitle: '.zip-code-search-user-choice-gide-title'
            ,choiceGideOL: '.zip-code-search-user-choice-gide-ol'
            ,submit: '.zip-code-search-user-choice-submit'
            ,searchKey: '.zip-code-search-user-input'
            ,result: '.zip-code-search-result-wrap'
        },

        zipcodeSubmitData: {
            type: 'road',
            searchKey: '',
            address: '',
            zipcode: ''
        },

        requestParamData: {
            keyword: '',
            page: 1,
            limit: 25,
            sido: '',
            sigungu: ''
        },

        requestUrl: {
            zipcodeViewData: '/zipCodeAPI',

            develop: {
                jibun: 'https://internal.memeboxlabs.com:8012/api/zipcode/jibuns',
                range: 'https://internal.memeboxlabs.com:8012/api/zipcode/ranges',
                road: 'https://internal.memeboxlabs.com:8012/api/zipcode/roads'
            },
            production: {
                jibun: 'http://contents-api.memeboxlabs.com/api/zipcode/jibuns',
                range: 'http://contents-api.memeboxlabs.com/api/zipcode/ranges',
                road: 'http://contents-api.memeboxlabs.com/api/zipcode/roads'
            },
            stage: {
                jibun: 'http://contents-api-stage.memeboxlabs.com/api/zipcode/jibuns',
                range: 'http://contents-api-stage.memeboxlabs.com/api/zipcode/ranges',
                road: 'http://contents-api-stage.memeboxlabs.com/api/zipcode/roads'
            }
        },

        viewData: null,

        initialize: function(){
            var html = templates.zipcode();
            $wraper.html(html);
            this.makeZipCodeTemplate()
        },

        makeZipCodeTemplate: function(){
            utility.uiEnhancements.call(this);
            //this.displayLoadingInfo();
            //this.getZipcodeViewData();
            this.setViewData();

            this.displaySelector(this.zipcodeSubmitData.type);
            this.displayUserSelectWrap(this.zipcodeSubmitData.type);
            //this.displayGide(this.zipcodeSubmitData.type);
            this.displayFilter(this.zipcodeSubmitData.type);
            this.addEventListener();
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.typeSelector, $.proxy(this.selectTypeEvent, this))
                .on('click', this.ui.__uiString.submit, $.proxy(this.ajaxEvent, this))
        },

        ajaxEvent: function(event){
            var searchKey = this.ui.searchKey.val();
            var type = this.zipcodeSubmitData.type;
            var url = this.requestUrl.stage[type];

            this.requestParamData.keyword = searchKey;
            $.ajax({
                url: url,
                data: controller.requestParamData,
                //jsonpCallback: 'zipcodeList',
                dataType: 'jsonp'
            }).done(function(data){
                controller.makeResultContentsWrap(data, type);
            });
        },

        makeResultContentsWrap: function(data, type){
            console.log('data = ',data)

            this.ui.result.show();
            var html = templates.result(data.data);
            this.ui.result.html(html);
            this.displayFilter(type);
            this.resultEventListener();
        },

        resultEventListener: function(){
            this.ui.result.off()
                .on('click', '.zip-code-search-result-trigger', $.proxy(this.resultTriggerEvent, this))
        },


        resultTriggerEvent: function(event){
            event.preventDefault();
            var zipcode = $(event.currentTarget).data('zipcode');
            console.log('aaaaaa',zipcode)

            collBackFunction(zipcode);
        },

        setViewData: function(){
            this.viewData = this.element.data('component-data')
        },

        selectTypeEvent: function(event){
            event.preventDefault();
            var $current = $(event.currentTarget);
            var selectorType = $current.attr('href').replace(/\#/g, '');
            if(selectorType === this.zipcodeSubmitData.type){

            }else{
                this.zipcodeSubmitData.type = selectorType;
                this.displaySelector(selectorType);
                this.displayUserSelectWrap(selectorType);
                //this.displayGide(selectorType);
                this.ui.result.empty();
            }
        },

        displayFilter: function(selectorType){
            console.log('selectorType = +++++++',selectorType)
            var $resultFilter = $('.zip-code-search-result-filter-wrap');
            switch(selectorType) {
                case 'road':
                    $resultFilter.show();
                    break;
                case 'jibun':
                    $resultFilter.hide();
                    break;
            }
        },

        displaySelector: function(selectorType){
            this.ui.typeSelector.each(function(index, element){
                var $element = $(element);
                var currentType = $element.attr('href').replace(/\#/g, '')
                if(currentType === selectorType){
                    $element.addClass('selected')
                }else{
                    $element.removeClass('selected')
                }
            });
        },

        displayUserSelectWrap: function(selectorType){
            console.log('displayUserSelectWrap = ',selectorType);
            switch(selectorType) {
                case 'road':
                    this.ui.searchSelectorWrap.show();
                    break;
                case 'jibun':
                    this.ui.searchSelectorWrap.hide();
                    break;
            }
        },

        displayGide: function(selectorType){
            console.log('this.viewData = ',this.viewData)
            var type = this.viewData.information[selectorType]
            this.ui.inputGide.text(type.gide.input);
            this.ui.choiceGideTitle.text(type.title);

            var gideData = this.element.data('component-data');
            var html = templates.gide(gideData);
            this.ui.choiceGideOL.html(html);
        }

    };
    controller.initialize();
};