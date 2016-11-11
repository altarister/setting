var zipcode = function(collBackFunction, $wraper, zipcode_params){
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
            hasResult: true,
            keyword: '',
            isSearchPossible: true
        },

        viewData: {
            "selectType": "rode",
            "sido": [
                {"key":"강원도","count":537239},
                {"key":"경기도","count":1478492},
                {"key":"경상남도","count":1246432},
                {"key":"경상북도","count":1372858},
                {"key":"광주광역시","count":173804},
                {"key":"대구광역시","count":265627},
                {"key":"대전광역시","count":138804},
                {"key":"부산광역시","count":395254},
                {"key":"서울특별시","count":604469},
                {"key":"세종특별자치시","count":53718},
                {"key":"울산광역시","count":145410},
                {"key":"인천광역시","count":233704},
                {"key":"전라남도","count":1096096},
                {"key":"전라북도","count":768924},
                {"key":"제주특별자치도","count":236677},
                {"key":"충청남도","count":796271},
                {"key":"충청북도","count":564859}
            ],
            "information": {
                "jibun":{
                    "title": "지번 주소",
                    "gide": {
                        "input":"찾고자 하는 주소명을 입력하신 후 검색 버튼을 누르세요.",
                        "placeholder": "(예: 백현동 541)",
                        "choice": [
                            "지역명 (동/읍/면/리) + 번지 ( 예 : 백현동 541 )",
                            "지역명 (동/읍/면/리) + 건물명 ( 예 : 백현동 현백화점 )",
                            "사서함 + 번호 (예 : 서대문우체국사서함 1)"
                        ]
                    }
                },
                "road":{
                    "title": "도로명 주소",
                    "gide": {
                        "input":"시/도 , 시/군/구 선택 후 주소명을 입력해주세요.",
                        "placeholder": "(예: 판교역로14번길 20)",
                        "choice": [
                            "도로명 입력 (예 : 반포대로)",
                            "도로명 + 건물번호 입력 (예 : 반포대로 58)",
                            "건물명 입력 (예: 국립중앙박물관)"
                        ]
                    }
                }
            }
        },

        message : {
            SYSTEM_ERROR: '우편번호 전송이 실패했습니다. 잠시 후 다시 시도해 주세요.',
            CHECK_SEARCH_REQUIRE_CITY : '시/도를 선택해주세요.',
            CHECK_SEARCH_REQUIRE_TOWN : '시/군/구를 선택해주세요.',
            INPUT_ADDRESS: '주소명을 입력해주세요.'
        },

        initialize: function(){
            console.log('zipcode_params',zipcode_params)
            var zipcodeHtml = zipcode_templates.zipcode(this.viewData);
            $wraper.html(zipcodeHtml);
            utility.uiEnhancements.call(this);
            var $city = this.element.find('select[name=zip-code-search-user-select-city]');

            this.makeSelectOption($city, this.viewData.sido, '시/도 선택');//
            this.displaySelector(this.beforeSearchStatus.type);
            this.displayUserSelectWrap(this.beforeSearchStatus.type);
            this.displaySearchGide(this.beforeSearchStatus.type, true);
            this.displayInputGide(this.beforeSearchStatus.type);
            this.displayFilter(this.beforeSearchStatus.type);
            this.setDisplayZipcodeBox();
            this.addEventListener();
        },

        setDisplayZipcodeBox: function(){
            var contentsWrap = this.ui.zipcodeSearchContents.outerHeight(true) - this.ui.zipcodeSearchContents.innerHeight();
            this.ui.zipcodeSearchContents.height($wraper.outerHeight() - this.ui.typeSelector.outerHeight() - contentsWrap);
        },

        addEventListener: function(){
            this.ui.searchKeyword.focus();
            this.element.off()
                .on('click', this.ui.__uiString.typeSelectorTrigger, $.proxy(this.selectTypeEvent, this))
                .on('change', this.ui.__uiString.userSelectCity, $.proxy(this.selectUserSelectCityEvent, this))
                .on('click', this.ui.__uiString.searchRequest, $.proxy(this.searchRequestEvent, this))
                .on('keydown', this.ui.__uiString.searchKeyword, function (event){
                    var code = event.keyCode || event.which;
                    if(code == 13) {
                        controller.searchRequestEvent(event)
                    }
                });
        },

        searchRequestEvent: function(event){
            event.preventDefault();
            var cityValue = this.element.find('select[name=zip-code-search-user-select-city]').val();
            var townValue = this.element.find('select[name=zip-code-search-user-select-town]').val();
            var keyword = this.ui.searchKeyword.val();

            this.requestParameterForAPI.page = 1;
            this.requestParameterForAPI.sido = '';
            this.requestParameterForAPI.sigungu = '';
            if(this.beforeSearchStatus.type === 'road'){
                this.requestParameterForAPI.sido = cityValue;
                this.requestParameterForAPI.sigungu = townValue;
            }
            this.requestParameterForAPI.page = 1;
            this.requestParameterForAPI.keyword = keyword;
            this.beforeSearchStatus.isNewZipCodeSearch = true;
            this.decideSearchRequestType();
        },

        decideSearchRequestType: function(){
            if(!this.checkValid()){return;}

            var isPostOfficeBox = /사서함/.test(this.requestParameterForAPI.keyword);
            if(!this.beforeSearchStatus.isNewZipCodeSearch){
                if(this.beforeSearchStatus.isSearchPossible){
                    if(isPostOfficeBox){
                        this.requestParameterForAPI.type = 'range';
                    }
                    this.requestParameterForAPI.page++;
                    this.ajaxSearchRequest(this.requestParameterForAPI, true);
                }
            }else{
                if(!this.beforeSearchStatus.hasResult || isPostOfficeBox){
                    this.requestParameterForAPI.type = 'range';
                }else{
                    this.requestParameterForAPI.type = this.beforeSearchStatus.type;
                }
                this.beforeSearchStatus.isNewZipCodeSearch = false;
                this.requestParameterForAPI.page = 1;
                this.ajaxSearchRequest(this.requestParameterForAPI, false);
            }
        },

        selectUserSelectCityEvent: function(event){
            var selectedCityValue = $(event.currentTarget).val();
            var $town = this.element.find('select[name=zip-code-search-user-select-town]');

            if(validate.isSelected(selectedCityValue)){
                $.ajax({
                    url: zipcode_params.requestUrl.sigungu,
                    data: {
                        type: 'type',
                        sido: selectedCityValue
                    },
                    dataType: 'jsonp'
                }).done(function(result){
                    if(result.status === 'success'){
                        controller.makeSelectOption($town, result.data, '시/군/구 선택');
                        controller.element.find('select[name=zip-code-search-user-select-town]').prop('disabled', false);
                    }else{
                        alert(controller.message.SYSTEM_ERROR);
                    }
                });
            }else{
                console.log('시/군/구 선택 불가')
                controller.element.find('select[name=zip-code-search-user-select-town]').prop('disabled', true);
            }
        },

        makeSelectOption: function($select, optionArray, defaultText){
            var selectOptionHtml = '';

            if(defaultText){
                optionArray.splice(0, 0, {
                    key: defaultText,
                    count: 0
                });
            }
            for(var index in optionArray){
                selectOptionHtml += zipcode_templates.selectOption(optionArray[index])
            }
            $select.empty().append( $(selectOptionHtml) );
            if(defaultText){
                $select.find('option:first').val('');
            }
        },

        checkValid: function(){
            var isValid = true;

            if(this.beforeSearchStatus.type === 'road'){
                //도로명일때
                var userSelectCityValue = this.element.find('select[name=zip-code-search-user-select-city]').val();
                var userSelectTownValue = this.element.find('select[name=zip-code-search-user-select-town]').val();
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
            if(validate.isEmpty(this.requestParameterForAPI.keyword)){
                //빈 입력인지 확인
                alert(this.message.INPUT_ADDRESS);
                isValid = false;
            }
            return isValid;
        },

        ajaxSearchRequest: function(requestData, isMoreRequest){
            console.log('ajax 진행 requestData.type = ',requestData.type)
            var url = zipcode_params.requestUrl[requestData.type]
            $.ajax({
                url: url,
                data: requestData,
                dataType: 'jsonp'
            }).done(function(result){
                if(result.status === 'success'){
                    controller.beforeSearchStatus.keyword = requestData.keyword;

                    if(requestData.type !== 'range'){
                        controller.beforeSearchStatus.type = requestData.type;
                    }

                    if(isMoreRequest){
                        controller.makeResultAddress(result.data);
                    }else{
                        controller.makeResultContentsWrap(result.data, requestData);
                    }
                    controller.setSearchPossible(result.data)
                }else{
                    alert(controller.message.SYSTEM_ERROR);
                }
            });
        },

        setSearchPossible: function(data){
            this.beforeSearchStatus.isSearchPossible = true;
            if(data.address.length < this.requestParameterForAPI.limit){
                console.log(data.address.length,'건 발견되어 더 이상 로드할 필요 없다')
                this.beforeSearchStatus.isSearchPossible = false;
            }else{
                console.log(data.address.length,'건 발견 더 찾아 봐야 한다 ')
            }
        },

        makeResultContentsWrap: function(data, requestData){
            this.ui.result.html('');
            var resultHtml = zipcode_templates.result(data);
            this.ui.result.append(resultHtml).show();

            if(data.address.length <= 0) {

                // 주소가 없는 경우
                if (this.beforeSearchStatus.hasResult) {//주소가 없어서 범위검색으로 다시 보내야 한다.
                    console.log('검색결과 없음---- 범위검색으로 다시 ');
                    this.requestParameterForAPI.type = 'range'
                    this.beforeSearchStatus.hasResult = false;
                    this.beforeSearchStatus.isNewZipCodeSearch = true;
                    this.decideSearchRequestType();
                } else {//범위검색 도 없는 경우.
                    this.beforeSearchStatus.hasResult = true;
                    this.beforeSearchStatus.isSearchPossible = false;
                    console.log('범위 검색도 없는 경우 그냥 끝 ');
                }
                // 주소가 없어서 범위까지 없는 경우
                //this.element.find('.zip-code-search-result-contents-wrap').empty();
                this.setResultNotingTrigger(zipcode_params.device)
                this.element.find('.zip-code-search-result-noting-wrap').show();
                //}else if(){

            }else{

                //this.beforeSearchStatus.hasResult = true;
                this.element.find('.zip-code-search-result-noting-wrap').hide();
                this.makeResultAddress(data);
                this.resultEventListener();
            }
            this.displaySearchGide(this.beforeSearchStatus.type, false);
            this.displayInputGide(this.beforeSearchStatus.type);
            this.displayFilter(this.beforeSearchStatus.type, requestData);
            this.setDisplayResultBox(zipcode_params.device);
        },

        setDisplayResultBox: function(device){
            var $resultContentsWrap = this.element.find('.zip-code-search-result-contents-wrap');
            var SearchContents = this.ui.zipcodeSearchContents.innerHeight();
            var height = 0;

            if(device === 'pc'){
                var userChoiceWrap = this.ui.userChoiceWrap.outerHeight(true);
                var resultInfoWrap = this.element.find('.zip-code-search-result-info-wrap').outerHeight(true);

                height = SearchContents - userChoiceWrap - resultInfoWrap;
            }else{
                var inputWrap = this.element.find('.zip-code-search-user-input-wrap').outerHeight(true);
                var inputGide = this.element.find('.zip-code-search-user-input-gide').outerHeight(true);
                var resultInfo = this.element.find('.zip-code-search-result-info').outerHeight(true);
                var contentsWrap = Number(this.element.find('.zip-code-search-result-contents-wrap').css('margin-top').replace(/px/g, ''));

                height = SearchContents - inputWrap - inputGide - resultInfo - contentsWrap;
                switch(this.beforeSearchStatus.type) {
                    case 'road':
                        height -= this.element.find('.zip-code-search-user-select-wrap').outerHeight(true);
                        break;
                    case 'jibun':
                        height -= this.element.find('.zip-code-search-result-filter-wrap').outerHeight(true);
                        break;
                }
            }
            $resultContentsWrap.height(height);
        },

        setResultScroll: function($wrap, $contents){
            $wrap.css('overflowY', 'auto').scroll(function() {
                var maxHeight = $contents.height();
                var currentScroll = $wrap.scrollTop() + $wrap.height();

                if (maxHeight <= currentScroll + 100) {
                    $wrap.off();
                    controller.beforeSearchStatus.isNewZipCodeSearch = false;
                    controller.decideSearchRequestType();
                    return
                }
            })
        },

        makeResultAddress: function(data){
            var addressHtml = zipcode_templates.address(data);
            var $resultContentswrap = this.element.find('.zip-code-search-result-contents-wrap');
            var $resultContentsUl = this.element.find('.zip-code-search-result-contents-ul').append(addressHtml);

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
            this.requestParameterForAPI.sido = this.element.find('.zip-code-search-result-filter-select-city').val();
            this.requestParameterForAPI.sigungu = this.element.find('.zip-code-search-result-filter-select-town').val();
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
            var placeholder = this.viewData.information[typeChangeHistory].gide.placeholder;

            this.ui.searchKeyword.focus().attr('placeholder', placeholder);
            this.beforeSearchStatus.type = $current.attr('href').replace(/\#/g, '');
            if(typeChangeHistory !== this.beforeSearchStatus.type){
                this.beforeSearchStatus.isNewZipCodeSearch = true;
                this.displaySearchType();
            }
        },

        displaySearchType: function(){
            this.displaySelector(this.beforeSearchStatus.type);
            this.displayUserSelectWrap(this.beforeSearchStatus.type);
            this.displaySearchGide(this.beforeSearchStatus.type, true);
            this.displayInputGide(this.beforeSearchStatus.type);
            this.ui.result.empty();
        },

        displayFilter: function(selectorType, requestData){
            var $resultFilter = this.element.find('.zip-code-search-result-filter-wrap');

            switch(selectorType) {
                case 'road':
                    $resultFilter.hide();
                    break;
                case 'jibun':
                    if(requestData){
                        var $sido = this.element.find('.zip-code-search-result-filter-select-city');
                        var $sigungu = this.element.find('.zip-code-search-result-filter-select-town');
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
                var currentType = $element.attr('href').replace(/\#/g, '');

                if(currentType === selectorType){
                    $element.addClass('selected')
                }else{
                    $element.removeClass('selected')
                }
            });
        },

        displayUserSelectWrap: function(selectorType){
            switch(selectorType) {
                case 'road':
                    this.ui.searchSelectorWrap.show();
                    break;
                case 'jibun':
                    this.ui.searchSelectorWrap.hide();
                    break;
            }
        },

        displaySearchGide: function(selectorType, isShow){
            if(isShow){
                var gideData = this.viewData.information[selectorType];
                var html = zipcode_templates.gide(gideData);
                this.ui.choiceGide.show().html(html);
            }else{
                this.ui.choiceGide.hide();
            }
        },

        setResultNotingTrigger: function(device){
            this.element.find('.zip-code-search-result-noting-trigger').attr('href', zipcode_params.contactUsUrl[device]);
        },

        displayInputGide: function(selectorType){
            this.ui.inputGide.html(this.viewData.information[selectorType].gide.input);
        }

    };
    controller.initialize();
};