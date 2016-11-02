//키워드가 같고 페이지가 바뀌면 more
//more를 실행해서 검색 결과가 없으면 더이상 request 정지
//키워드가 다르면 reset
//스크롤 다운 더보기
//검색결과 없음 화면
//시도 시군구 선택
//ajax 요청 전 정합성 확인.
//필터 검색

// todo
//ajax 요청중 스피너 .
//검색결과 사서함 리스트.



var $ = require('jquery');
var utility = require('utility');
var validate = require('validate');
//require('./pc/_zipcode.scss');
require('./mobile/_zipcode.scss');

var templates = {
    gide: require('./_gide.hbs'),
    result: require('./_result.hbs'),
    address: require('./_address.hbs'),
    zipcode: require('./_zipcode.hbs'),
    selectOption: require('./_selectOption.hbs')
};

var zipcode = function(collBackFunction, $wraper){
    var controller = {

        element: '.zip-code-search',
        ui: {
            typeSelector: '.zip-code-search-type-selector-ul'
            ,typeSelectorTrigger : '.zip-code-search-type-selector-trigger'
            ,zipcodeSearchContents: '.zip-code-search-contents'
            ,searchSelectorWrap : '.zip-code-search-user-select-wrap'
            ,userSelectCity: '.zip-code-search-user-select-city'
            ,userSelectTown: '.zip-code-search-user-select-town'
            ,userChoiceWrap: '.zip-code-search-user-choice-wrap'
            ,inputGide: '.zip-code-search-user-input-gide'
            ,choiceGide: '.zip-code-search-user-choice-gide'
            ,searchRequest: '.zip-code-search-user-choice-submit'
            ,searchKeyword: '.zip-code-search-user-input'
            ,result: '.zip-code-search-result-wrap'
            ,resultNoting: '.zip-code-search-result-noting-wrap'
        },

        requestParameterForAPI: {
            type: '',
            keyword: '',
            page: 1,//
            limit: 25,
            sido: '',
            sigungu: ''
        },

        beforeSearchStatus: {
            type: 'road',
            isNewZipCodeSearch: false,
            keyword: '',
            isSearchPossible: true
        },

        requestUrl: {
            zipcodeViewData: '/zipCodeAPI',

            develop: {
                sido: 'https://internal.memeboxlabs.com:8012/api/zipcode/sido',
                sigungu: 'https://internal.memeboxlabs.com:8012/api/zipcode/sigungu',
                jibun: 'https://internal.memeboxlabs.com:8012/api/zipcode/jibuns',
                range: 'https://internal.memeboxlabs.com:8012/api/zipcode/ranges',
                road: 'https://internal.memeboxlabs.com:8012/api/zipcode/roads'
            },
            production: {
                sido: 'http://contents-api.memeboxlabs.com/api/zipcode/sido',
                sigungu: 'http://contents-api.memeboxlabs.com/api/zipcode/sigungu',
                jibun: 'http://contents-api.memeboxlabs.com/api/zipcode/jibuns',
                range: 'http://contents-api.memeboxlabs.com/api/zipcode/ranges',
                road: 'http://contents-api.memeboxlabs.com/api/zipcode/roads'
            },
            stage: {
                sido: 'http://contents-api-stage.memeboxlabs.com/api/zipcode/sido',
                sigungu: 'http://contents-api-stage.memeboxlabs.com/api/zipcode/sigungu',
                jibun: 'http://contents-api-stage.memeboxlabs.com/api/zipcode/jibuns',
                range: 'http://contents-api-stage.memeboxlabs.com/api/zipcode/ranges',
                road: 'http://contents-api-stage.memeboxlabs.com/api/zipcode/roads'
            }
        },

        viewData: null,

        message : {
            SYSTEM_ERROR: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            CHECK_SEARCH_REQUIRE_CITY : '시도 선택해',
            CHECK_SEARCH_REQUIRE_TOWN : '시군구 선택해',
            INPUT_ADDRESS: '주소를 입력해 주세요 '
        },

        initialize: function(){
            // console.log('this.requestUrl.zipcodeViewData = ',this.requestUrl.zipcodeViewData);
            $.ajax({
                type : 'GET',
                url: this.requestUrl.zipcodeViewData
            })
            .done(function(result){
                var zipcodeHtml = templates.zipcode(result.data);
                $wraper.html(zipcodeHtml);
                controller.resetZipCodeTemplate(result.data);
            })
            .fail(function () {
                alert(this.message.SYSTEM_ERROR);
            });
        },

        resetZipCodeTemplate: function(data){
            utility.uiEnhancements.call(this);
            this.setViewData();

            var $city = $('select[name=zip-code-search-user-select-city]')
            this.makeSelectOption($city, data.sido, '시/도 선택');
            this.displaySelector(this.beforeSearchStatus.type);
            this.displayUserSelectWrap(this.beforeSearchStatus.type);
            this.displayGide(this.beforeSearchStatus.type, true);
            this.displayFilter(this.beforeSearchStatus.type);
            this.setDisplayZipcodeBox();
            this.addEventListener();
        },

        setDisplayZipcodeBox: function(){
            var contentsWrap = this.ui.zipcodeSearchContents.outerHeight() - this.ui.zipcodeSearchContents.innerHeight();
            this.ui.zipcodeSearchContents.height($wraper.outerHeight() - this.ui.typeSelector.outerHeight() - contentsWrap);
            //todo border size 2
        },

        setViewData: function(){
            this.viewData = this.element.data('component-data')
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.typeSelectorTrigger, $.proxy(this.selectTypeEvent, this))
                .on('change', this.ui.__uiString.userSelectCity, $.proxy(this.selectUserSelectCityEvent, this))
                .on('change', this.ui.__uiString.userSelectTown, $.proxy(this.selectUserSelectTownEvent, this))
                .on('click', this.ui.__uiString.searchRequest, $.proxy(this.searchRequestEvent, this));
                //enter key 를 넣어도 같은 검색 되어야 한다
        },

        searchRequestEvent: function(event){
            // console.log('+++++++searchRequestEvent');
            event.preventDefault();
            this.resetRequestParameterForAPI();
            if(this.beforeSearchStatus.type === 'road'){
                var cityValue = $('select[name=zip-code-search-user-select-city]').val();
                var townValue = $('select[name=zip-code-search-user-select-town]').val();
                //console.log('cityValue',cityValue,'townValue',townValue)
                this.requestParameterForAPI.sido = cityValue;
                this.requestParameterForAPI.sigungu = townValue;
            }
            this.requestParameterForAPI.keyword = this.ui.searchKeyword.val();
            this.beforeSearchStatus.isNewZipCodeSearch = true;
            console.log('this.requestParameterForAPI =======================',this.requestParameterForAPI)
            this.decideSearchRequestType();
        },

        resetRequestParameterForAPI: function(){
            // console.log('------------resetRequestParameterForAPI')
            this.requestParameterForAPI.page = 1;
            this.requestParameterForAPI.sido = '';
            this.requestParameterForAPI.sigungu = '';
        },

        decideSearchRequestType: function(){
            var isSameType = this.beforeSearchStatus.type === this.requestParameterForAPI.type;
            var isSameKeyword = this.beforeSearchStatus.keyword === this.requestParameterForAPI.keyword;
            var isNewZipCodeSearch = this.beforeSearchStatus.isNewZipCodeSearch;

            //지번값이 있으면 필터
            console.log('--------------checkValid------------------')
            if(!this.checkValid()){return;}
            console.log('gggg')
            if(isSameKeyword && isSameType && !isNewZipCodeSearch){
                //키워드가 같고 텝도 같고 type변한 없으면 기존 검색
                if(this.beforeSearchStatus.isSearchPossible){
                    // console.log('더보기 기능 작동 ')
                    //키워드가 같고 텝도 같으면 기존 검색 이고 앞으로도 검색 가능 하면 검색해
                    //검색이 가능 하다면 more
                    this.requestParameterForAPI.type = this.beforeSearchStatus.type;
                    this.requestParameterForAPI.page++;
                    this.ajaxSearchRequest(this.requestParameterForAPI, true);
                }else{
                    console.log('결과 다 보았음. ')
                    //키워드가 같고 텝도 같으면 기존 검색이고 내용이 더이상 없으면 호출 하지 말아야 한다
                    //페이지가 1이상이고. 결과가 없으면.
                    //  ajax 보내지 말아
                }
            }else{
                //키워드가 같고 텝도 같고 type변한 있으면 새로운 검색
                //키워드가 다르면 텝이 달라  새로운 검색
                //키워드가 다르면 텝이 달라  새로운 검색
                //키워드가 다르고 텝이 같아 새로운 검색
                //키워드가 같고 텝이 달라 새로운 검색

                this.ui.result.html('');
                this.beforeSearchStatus.isNewZipCodeSearch = false;
                this.requestParameterForAPI.type = this.beforeSearchStatus.type;
                this.requestParameterForAPI.page = 1;
                this.ajaxSearchRequest(this.requestParameterForAPI, false);
            }
        },

        selectUserSelectCityEvent: function(event){
            var selectedCityValue = $(event.currentTarget).val();
            console.log('selectedCityValue = ',selectedCityValue);
            if(validate.isSelected(selectedCityValue)){

                var $town = $('select[name=zip-code-search-user-select-town]')

                //시도 선택 확인
                $.ajax({
                    url: this.requestUrl.stage.sigungu,
                    data: {
                        type: 'type',
                        sido: selectedCityValue
                    },
                    dataType: 'jsonp'
                }).done(function(result){
                    console.log(result)
                    if(result.status === 'success'){
                        controller.makeSelectOption($town, result.data, '시/군/구 선택');
                        $('select[name=zip-code-search-user-select-town]').prop('disabled', false);
                    }else{
                        alert(controller.message.SYSTEM_ERROR);
                    }
                });
            }else{
                console.log('시/군/구 선택 불가')
                $('select[name=zip-code-search-user-select-town]').prop('disabled', true);
            }
        },

        makeSelectOption: function($select, optionArray, defaultText){
            if(defaultText){
                optionArray.splice(0, 0, {
                    key: defaultText,
                    count: 0
                });
            }

            //var option = '<option value="">시/군/구 선택</option>';
            var selectOptionHtml = '';
            var $electOption = null;
            for(var index in optionArray){
                selectOptionHtml += templates.selectOption(optionArray[index])
            }
            $electOption = $(selectOptionHtml);

            console.log('$electOption = ',)

            $select.empty().append($electOption);
            if(defaultText){
                $select.find('option:first').val('');
            }
        },

        selectUserSelectTownEvent: function(){

        },

        checkValid: function(){
            var isValid = true;
             console.log('this.beforeSearchStatus.type = ',this.beforeSearchStatus.type)
            if(this.beforeSearchStatus.type === 'road'){
                //도로명일때
                var userSelectCityValue = $('select[name=zip-code-search-user-select-city]').val();
                var userSelectTownValue = $('select[name=zip-code-search-user-select-town]').val();
                //select에 선택 값이 들어가 있음.
                if(!validate.isSelected(userSelectCityValue)){
                    //시도 선택 확인
                    alert(this.message.CHECK_SEARCH_REQUIRE_CITY);
                    isValid = false;
                    return
                }
                if(!validate.isSelected(userSelectTownValue)){
                    //시군 선택 확인

                    alert(this.message.CHECK_SEARCH_REQUIRE_TOWN);
                    isValid = false;
                    return
                }
            }
            console.log('this.requestParameterForAPI.keyword ++++++++++++++',this.requestParameterForAPI.keyword)
            if(validate.isEmpty(this.requestParameterForAPI.keyword)){
                //빈 입력인지 확인
                alert(this.message.INPUT_ADDRESS);
                isValid = false;
            }
            return isValid;
        },

        ajaxSearchRequest: function(requestData, isMoreRequest){
            //console.log('requestData = ',requestData)
            //console.log('isMoreRequest = ',isMoreRequest)
            //console.log('url = ',this.requestUrl.stage[this.beforeSearchStatus.type])
            $.ajax({
                url: this.requestUrl.stage[this.beforeSearchStatus.type],
                data: requestData,
                dataType: 'jsonp'
            }).done(function(result){
                if(result.status === 'success'){
                    // console.log('result.data = ',result.data)
                    controller.beforeSearchStatus.keyword = requestData.keyword;
                    controller.beforeSearchStatus.type = requestData.type;
                    if(isMoreRequest){
                        //console.log('address')
                        controller.makeResultAddress(result.data);
                    }else{
                        // console.log('result.data',result.data)
                        controller.makeResultContentsWrap(result.data, requestData);
                    }
                }else{
                    alert(controller.message.SYSTEM_ERROR);
                }
            });
        },

        makeResultContentsWrap: function(data, requestData){
            //범위검색
            var resultHtml = templates.result(data);
            this.ui.result.append(resultHtml).show();
            if(data.address.length <= 0){
                console.log('검색결과 없음----');
                //$('.zip-code-search-result-contents-wrap').empty();
                $('.zip-code-search-result-noting-wrap').show();

            }else{

                $('.zip-code-search-result-noting-wrap').hide();
                this.makeResultAddress(data);
                this.resultEventListener();
            }
            this.displayGide(this.beforeSearchStatus.type, false);
            this.displayFilter(this.beforeSearchStatus.type, requestData);
            this.setDisplayResultBox();
        },

        setDisplayResultBox: function(){
            //노출되는 모든것을 체크하고 높이값을 가지고 와서.
            //todo : 처음 한번만.
            var $resultContentsWrap = $('.zip-code-search-result-contents-wrap')
            var SearchContents = this.ui.zipcodeSearchContents.innerHeight();
            var inputWrap = $('.zip-code-search-user-input-wrap').outerHeight(true);
            var inputGide = $('.zip-code-search-user-input-gide').outerHeight(true);
            var resultInfo = $('.zip-code-search-result-info').outerHeight(true);
            // console.log('resultInfo = ',resultInfo)
            // console.log('contentsWrap = ',$('.zip-code-search-result-contents-wrap'))
            var contentsWrap = $('.zip-code-search-result-contents-wrap').css('margin-top').replace(/px/g, '');
            // console.log('contentsWrap = ',contentsWrap)
            var height = SearchContents - inputWrap - inputGide - resultInfo - contentsWrap;

            switch(this.beforeSearchStatus.type) {
                case 'road':
                    height -= $('.zip-code-search-user-select-wrap').outerHeight(true);
                    break;
                case 'jibun':
                    height -= $('.zip-code-search-result-filter-wrap').outerHeight(true);
                    break;
            }
            $resultContentsWrap.height(height);
            // console.log('height',height)
        },

        setResultScroll: function($wrap, $contents){
            $wrap.css('overflowY', 'auto').scroll(function() {
                var maxHeight = $contents.height();
                var currentScroll = $wrap.scrollTop() + $wrap.height();

                if (maxHeight <= currentScroll + 100) {
                    $wrap.off();
                    controller.decideSearchRequestType();
                    return
                }
            })
        },

        makeResultAddress: function(data){
            var addressHtml = templates.address(data);
            var $resultContentswrap = $('.zip-code-search-result-contents-wrap');
            var $resultContentsUl = $('.zip-code-search-result-contents-ul').append(addressHtml);
            this.setResultScroll($resultContentswrap, $resultContentsUl)
        },

        resultEventListener: function(){
            this.ui.result.off()
                .on('click', '.more-result', $.proxy(this.decideSearchRequestType, this))
                .on('click', '.zip-code-search-result-trigger', $.proxy(this.resultTriggerEvent, this))
                .on('change', '.zip-code-search-result-filter-select-city', $.proxy(this.selectFilterEvent, this))
                .on('change', '.zip-code-search-result-filter-select-town', $.proxy(this.selectFilterEvent, this))
        },

        selectFilterEvent: function(){
            this.requestParameterForAPI.sido = $('.zip-code-search-result-filter-select-city').val();
            this.requestParameterForAPI.sigungu = $('.zip-code-search-result-filter-select-town').val();
            this.beforeSearchStatus.isNewZipCodeSearch = true;
            this.decideSearchRequestType()
        },

        resultTriggerEvent: function(event){
            event.preventDefault();
            var zipcode = $(event.currentTarget).data('zipcode');
            collBackFunction(zipcode);
        },

        selectTypeEvent: function(event){
            event.preventDefault();
            var $current = $(event.currentTarget);
            var typeChangeHistory = this.beforeSearchStatus.type;
            this.beforeSearchStatus.type = $current.attr('href').replace(/\#/g, '');

            if(typeChangeHistory === this.beforeSearchStatus.type){
                console.log('이전꺼랑 같아')
            }else{
                this.beforeSearchStatus.isNewZipCodeSearch = true;
                this.displaySearchType();
            }
        },

        displaySearchType: function(){
            this.displaySelector(this.beforeSearchStatus.type);
            this.displayUserSelectWrap(this.beforeSearchStatus.type);
            this.displayGide(this.beforeSearchStatus.type, true);
            this.ui.result.empty();
        },

        displayFilter: function(selectorType, requestData){
            console.log('selectorType = +++++++',requestData)
            var $resultFilter = $('.zip-code-search-result-filter-wrap');

            switch(selectorType) {
                case 'road':
                    $resultFilter.hide();
                    break;
                case 'jibun':
                    if(requestData){
                        //
                        var $sido = $('.zip-code-search-result-filter-select-city');
                        var $sigungu = $('.zip-code-search-result-filter-select-town');
                        $sido.val(requestData.sido).prop('selected', true);
                        if(requestData.sido !== ''){
                            $sigungu.val(requestData.sigungu).prop('selected', true).prop('disabled', false);
                        }
                    }
                    $resultFilter.show();
                    break;
            }
        },

        displaySelector: function(selectorType){
            this.ui.typeSelectorTrigger.each(function(index, element){
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

        displayGide: function(selectorType, isShow){
            console.log('isShow = ',isShow)
            if(isShow){
                var gideData = this.viewData.information[selectorType];
                var html = templates.gide(gideData);
                this.ui.choiceGide.show().html(html);
            }else{
                this.ui.choiceGide.hide();
            }

        }

    };
    controller.initialize();
};

module.exports = zipcode;