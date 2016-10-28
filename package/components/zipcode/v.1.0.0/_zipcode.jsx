//키워드가 같고 페이지가 바뀌면 more
//more를 실행해서 검색 결과가 없으면 더이상 request 정지
//키워드가 다르면 reset
// todo
//시도 시군구 선택
//ajax 요청 전 정합성 확인.
//ajax 요청중 스피너 .
//스크롤 다운 더보기
//필터 검색
//검색결과 사서함 리스트.
//검색결과 없음 화면

var $ = require('jquery');
var utility = require('utility');
var IScroll = require('iScroll');
require('./_zipcode.scss');

var templates = {
    gide: require('./_gide.hbs'),
    result: require('./_result.hbs'),
    address: require('./_address.hbs'),
    zipcode: require('./_zipcode.hbs')
};



var zipcode = function(collBackFunction, $wraper, contentHeight){
    var controller = {

        element: '.zip-code-search',
        ui: {
            typeSelector: '.zip-code-search-type-selector-ul'
            ,typeSelectorTrigger : '.zip-code-search-type-selector-trigger'
            ,zipcodeSearchContents: '.zip-code-search-contents'
            ,searchSelectorWrap : '.zip-code-search-user-select-wrap'
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
            limit: 2,
            sido: '',
            sigungu: ''
        },

        beforeSearchStatus: {
            type: 'road',
            keyword: '',
            isSearchPossible: true
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

        message : {
            SYSTEM_ERROR: '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.',
            CHECK_SEARCH_REQUIRE : '시도 선택해',
            INPUT_ADDRESS: '주소를 입력해 주세요 '
        },

        initialize: function(){
            console.log('IScroll = ',IScroll);
            console.log('this.requestUrl.zipcodeViewData = ',this.requestUrl.zipcodeViewData)
            $.ajax({
                type : 'GET',
                url: this.requestUrl.zipcodeViewData
            })
            .done(function(result){
                var zipcodeHtml = templates.zipcode(result.data);
                $wraper.html(zipcodeHtml);
                controller.resetZipCodeTemplate();
            })
            .fail(function () {
                alert(this.message.SYSTEM_ERROR);
            });
        },

        resetZipCodeTemplate: function(){
            utility.uiEnhancements.call(this);
            this.setViewData();

            this.displaySelector(this.beforeSearchStatus.type);
            this.displayUserSelectWrap(this.beforeSearchStatus.type);
            this.displayGide(this.beforeSearchStatus.type, true);
            this.displayFilter(this.beforeSearchStatus.type);
            this.setViewBox()
            this.addEventListener();
        },

        setViewBox: function(){
            this.ui.zipcodeSearchContents.height($wraper.outerHeight() - this.ui.typeSelector.outerHeight() - 2);
        },

        setViewData: function(){
            this.viewData = this.element.data('component-data')
        },

        addEventListener: function(){
            this.element.off()
                .on('click', this.ui.__uiString.typeSelectorTrigger, $.proxy(this.selectTypeEvent, this))
                .on('click', this.ui.__uiString.searchRequest, $.proxy(this.searchRequestEvent, this))
                //enter key 를 넣어도 같은 검색 되어야 한다
        },

        searchRequestEvent: function(event){
            event.preventDefault();
            this.requestParameterForAPI.keyword = this.ui.searchKeyword.val();
            this.decideSearchRequestType();
        },

        decideSearchRequestType: function(){
            var isSameType = this.beforeSearchStatus.type === this.requestParameterForAPI.type;
            var isSameKeyword = this.requestParameterForAPI.keyword === this.beforeSearchStatus.keyword;

            if(!this.checkValid()){return;}

            if(isSameKeyword && isSameType){
                //키워드가 같고 텝도 같으면 기존 검색 검색버튼이면
                if(this.beforeSearchStatus.isSearchPossible){
                    console.log('더보기 기능 작동 ')
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
                //키워드가 다르면 텝이 달라  새로운 검색
                //키워드가 다르고 텝이 같아 새로운 검색
                //키워드가 같고 텝이 달라 새로운 검색
                this.ui.result.html('');
                this.requestParameterForAPI.type = this.beforeSearchStatus.type;
                this.requestParameterForAPI.page = 1;
                this.ajaxSearchRequest(this.requestParameterForAPI, false);
            }
        },

        checkValid: function(){
            var isValid = true;
            if(false){
                //지번 선택 확인
                //도로명일때 시도 시군이 선택되어 있는지 확인
                alert(this.message.CHECK_SEARCH_REQUIRE);
                isValid = false;
            }
            if(false){
                //input 창에 값이 올바른지 확인
                //주소를 입력해 주세요
                alert(this.message.CHECK_SEARCH_REQUIRE);
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
                    //console.log('result.data = ',result.data)
                    controller.beforeSearchStatus.keyword = requestData.keyword;
                    controller.beforeSearchStatus.type = requestData.type;
                    if(isMoreRequest){
                        //console.log('address')
                        controller.makeResultAddress(result.data);
                    }else{
                        //console.log('초기화')
                        controller.makeResultContentsWrap(result.data);
                    }
                }else{
                    alert(controller.message.SYSTEM_ERROR);
                }
            });
        },




        resetRequestParameterForAPI: function(){

        },

        updateRequestParameterForAPI: function(){

        },

        makeResultContentsWrap: function(data){
            if(data.address.length <= 0){
                console.log('검색결과 없음');
                $('.zip-code-search-result-contents-wrap').empty();
                $('.zip-code-search-result-noting-wrap').show();
            }else{
                var resultHtml = templates.result(data);
                this.ui.result.append(resultHtml).show();
                $('.zip-code-search-result-noting-wrap').hide();
                this.makeResultAddress(data);
                this.displayGide(this.beforeSearchStatus.type, false);
                this.displayFilter(this.beforeSearchStatus.type);
                this.resultEventListener();
            }
            this.setScroll();
        },

        setScroll: function(){
            var SearchContents = this.ui.zipcodeSearchContents.innerHeight();
            var userChoice = $('.zip-code-search-user-choice-wrap').outerHeight(true);
            var resultInfo = $('.zip-code-search-result-info').outerHeight(true);
            console.log(SearchContents,'====',userChoice,'====', resultInfo)
            var height = SearchContents - userChoice - resultInfo - 10
            $('.zip-code-search-result-contents-wrap').height(height);
        },

        makeResultAddress: function(data){
            var addressHtml = templates.address(data);
            $('.zip-code-search-result-contents-ul').append(addressHtml);
        },

        resultEventListener: function(){
            this.ui.result.off()
                .on('click', '.more-result', $.proxy(this.decideSearchRequestType, this))
                .on('click', '.zip-code-search-result-trigger', $.proxy(this.resultTriggerEvent, this))
        },

        resultTriggerEvent: function(event){
            event.preventDefault();
            var zipcode = $(event.currentTarget).data('zipcode');
            collBackFunction(zipcode);
        },


        selectTypeEvent: function(event){
            event.preventDefault();
            var $current = $(event.currentTarget);
            this.beforeSearchStatus.type = $current.attr('href').replace(/\#/g, '');
            this.displaySearchType();


            if(this.requestParameterForAPI.type === this.beforeSearchStatus.type){

            }else{
                this.displaySelector(this.beforeSearchStatus.type);
                this.displayUserSelectWrap(this.beforeSearchStatus.type);
                this.displayGide(this.beforeSearchStatus.type, true);
                this.ui.result.empty();
            }
        },

        displaySearchType: function(){
            this.displaySelector(this.beforeSearchStatus.type);
            this.displayUserSelectWrap(this.beforeSearchStatus.type);
            this.displayGide(this.beforeSearchStatus.type, true);
            this.ui.result.empty();
        },

        displayFilter: function(selectorType){
            console.log('selectorType = +++++++',selectorType)
            var $resultFilter = $('.zip-code-search-result-filter-wrap');
            switch(selectorType) {
                case 'road':
                    $resultFilter.hide();
                    break;
                case 'jibun':
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
