//키워드가 같고 페이지가 바뀌면 more
//more를 실행해서 검색 결과가 없으면 더이상 request 정지
//키워드가 다르면 reset
//스크롤 다운 더보기
//검색결과 없음 화면
//시도 시군구 선택
//ajax 요청 전 정합성 확인.
//필터 검색
//enter key 입력
//범위검색
//검색결과 사서함 리스트.
// todo
//ajax 요청중 스피너 .


var $ = require('jquery');
var utility = require('utility');
var validate = require('validate');
//require('./pc/_zipcode.scss');
require('./mobile/_zipcode.scss');

var zipcode_templates = {
    gide: require('./_gide.hbs'),
    result: require('./_result.hbs'),
    address: require('./_address.hbs'),
    zipcode: require('./_zipcode.hbs'),
    selectOption: require('./_selectOption.hbs')
};

var zipcode = function (collBackFunction, $wraper, zipcode_params) {
    var controller = {
        //UI selecter
        element: '.zip-code-search',
        ui: {
            typeSelector: '.zip-code-search-type-selector-ul'
            , typeSelectorTrigger: '.zip-code-search-type-selector-trigger'
            , zipcodeSearchContents: '.zip-code-search-contents'
            , searchSelectorWrap: '.zip-code-search-user-select-wrap'
            , userSelectCity: '.zip-code-search-user-select-city'
            , userSelectTown: '.zip-code-search-user-select-town'
            , userChoiceWrap: '.zip-code-search-user-choice-wrap'
            , inputGide: '.zip-code-search-user-input-gide'
            , choiceGide: '.zip-code-search-user-choice-gide'
            , searchRequest: '.zip-code-search-user-choice-submit'
            , searchKeyword: '.zip-code-search-user-input'
            , result: '.zip-code-search-result-wrap'
            , resultNoting: '.zip-code-search-result-noting-wrap'
        },
        //API 호출 시 서버에 전송할 data
        requestParameterForAPI: {
            type: '',
            keyword: '',
            page: 1,//
            limit: 25,
            sido: '',
            sigungu: ''
        },
        //검색내용 저장
        beforeSearchStatus: {
            type: 'road',
            isNewZipCodeSearch: false,
            hasResult: true,
            keyword: '',
            isSearchPossible: true
        },
        //API 주소 - 일반적으로 서버로 부터 json을 받아 overwrite 한다
        zipcodeAPI: {
            sido: '/ajax/zipcode/sido',
            sigungu: '/ajax/api/zipcode/sigungu',
            jibun: '/ajax/api/zipcode/jibuns',
            range: '/ajax/api/zipcode/ranges',
            road: '/ajax/api/zipcode/roads'
        },
        //우편번호 페이지를 만들기위한 기본 내용
        viewData: {
            selectType: "rode",
            sido: [
                {key: "강원도", count: 537239},
                {key: "경기도", count: 1478492},
                {key: "경상남도", count: 1246432},
                {key: "경상북도", count: 1372858},
                {key: "광주광역시", count: 173804},
                {key: "대구광역시", count: 265627},
                {key: "대전광역시", count: 138804},
                {key: "부산광역시", count: 395254},
                {key: "서울특별시", count: 604469},
                {key: "세종특별자치시", count: 53718},
                {key: "울산광역시", count: 145410},
                {key: "인천광역시", count: 233704},
                {key: "전라남도", count: 1096096},
                {key: "전라북도", count: 768924},
                {key: "제주특별자치도", count: 236677},
                {key: "충청남도", count: 796271},
                {key: "충청북도", count: 564859}
            ],
            //우편번호 검색을 위한 사용자 안내 혹은 기타
            information: {
                jibun: {
                    title: "지번 주소",
                    gide: {
                        input: "찾고자 하는 주소명을 입력하신 후 검색 버튼을 누르세요.",
                        placeholder: "(예: 백현동 541)",
                        choice: [
                            "지역명 (동/읍/면/리) + 번지 ( 예 : 백현동 541 )",
                            "지역명 (동/읍/면/리) + 건물명 ( 예 : 백현동 현대백화점 )"
                        ]
                    }
                },
                road: {
                    title: "도로명 주소",
                    gide: {
                        input: "시/도 , 시/군/구 선택 후 주소명을 입력해주세요.",
                        placeholder: "(예: 판교역로14번길 20)",
                        choice: [
                            "도로명 입력 (예 : 반포대로)",
                            "도로명 + 건물번호 입력 (예 : 반포대로 58)",
                            "건물명 입력 (예: 국립중앙박물관)",
                            "시/군/구가 존재하지 않는 경우 지번 주소 찾기를 이용해주세요."
                        ]
                    }
                },
                resultNoting: {
                    gide: "검색결과는 행정자치부에서 제공하는 데이터 기준으로 제공됩니다",
                    pc: {
                        contactUs: {
                            href:"//www.memebox.com/my/inquiry",
                            text:"1:1 문의하기"
                        }
                    },
                    mobile: {
                        contactUs: {
                            href:"tel:15440439",
                            text:"고객센터 전화연결"
                        }
                    },
                    app: {
                        contactUs: {
                            href:"tel:15440439",
                            text:"고객센터 전화연결"
                        }
                    }
                }
            }
        },
        //오류 메시지 모음
        message: {
            SYSTEM_ERROR: '우편번호 전송이 실패했습니다. 잠시 후 다시 시도해 주세요.',
            CHECK_SEARCH_REQUIRE_CITY: '시/도를 선택해주세요.',
            CHECK_SEARCH_REQUIRE_TOWN: '시/군/구를 선택해주세요.',
            INPUT_ADDRESS: '주소명을 입력해주세요.'
        },
        //초기화
        initialize: function () {
            if (zipcode_params.zipcodeAPI) {
                this.zipcodeAPI = zipcode_params.zipcodeAPI;
            }

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
        //최초 우편번호 검색 html 붙여넣기
        setDisplayZipcodeBox: function () {
            var contentsWrap = this.ui.zipcodeSearchContents.outerHeight(true) - this.ui.zipcodeSearchContents.innerHeight();
            this.ui.zipcodeSearchContents.height($wraper.outerHeight() - this.ui.typeSelector.outerHeight() - contentsWrap);
        },
        //event 등록
        addEventListener: function () {
            this.ui.searchKeyword.focus();
            this.element.off()
                .on('click', this.ui.__uiString.typeSelectorTrigger, $.proxy(this.selectTypeEvent, this))
                .on('change', this.ui.__uiString.userSelectCity, $.proxy(this.selectUserSelectCityEvent, this))
                .on('click', this.ui.__uiString.searchRequest, $.proxy(this.searchRequestEvent, this))
                .on('keydown', this.ui.__uiString.searchKeyword, function (event) {
                    var code = event.keyCode || event.which;
                    if (code == 13) {
                        controller.searchRequestEvent(event)
                    }
                });
        },
        //검색 버튼 클릭 혹은 enter
        searchRequestEvent: function (event) {
            event.preventDefault();
            var cityValue = this.element.find('select[name=zip-code-search-user-select-city]').val();
            var townValue = this.element.find('select[name=zip-code-search-user-select-town]').val();
            var keyword = this.ui.searchKeyword.val();

            this.requestParameterForAPI.page = 1;
            this.requestParameterForAPI.sido = '';
            this.requestParameterForAPI.sigungu = '';
            if (this.beforeSearchStatus.type === 'road') {
                this.requestParameterForAPI.sido = cityValue;
                this.requestParameterForAPI.sigungu = townValue;
            }
            this.requestParameterForAPI.keyword = keyword;
            this.beforeSearchStatus.isNewZipCodeSearch = true;
            this.decideSearchRequestType();
        },
        //어떤 검색을 할지 결정 하는 함수
        decideSearchRequestType: function () {
            if (!this.checkValid()) {
                return;
            }

            var isPostOfficeBox = false;///사서함/.test(this.requestParameterForAPI.keyword);
            if (!this.beforeSearchStatus.isNewZipCodeSearch) {
                if (this.beforeSearchStatus.isSearchPossible) {
                    if (isPostOfficeBox) {
                        this.requestParameterForAPI.type = 'range';
                    }
                    this.requestParameterForAPI.page++;
                    this.ajaxSearchRequest(this.requestParameterForAPI, true);
                }
            } else {
                if (!this.beforeSearchStatus.hasResult || isPostOfficeBox) {
                    this.requestParameterForAPI.type = 'range';
                } else {
                    this.requestParameterForAPI.type = this.beforeSearchStatus.type;
                }
                this.beforeSearchStatus.isNewZipCodeSearch = false;
                this.requestParameterForAPI.page = 1;
                this.ajaxSearchRequest(this.requestParameterForAPI, false);
            }
        },
        //사용자가 시도를 바꾼경우 호출
        selectUserSelectCityEvent: function (event) {
            var selectedCityValue = $(event.currentTarget).val();
            var $town = this.element.find('select[name=zip-code-search-user-select-town]');

            if (validate.isSelected(selectedCityValue)) {
                $.ajax({
                    url: this.zipcodeAPI.sigungu,
                    data: {
                        type: 'type',
                        sido: selectedCityValue
                    },
                    dataType: 'jsonp'
                }).done(function (result) {
                    if (result.status === 'success') {
                        controller.makeSelectOption($town, result.data, '시/군/구 선택');
                        controller.element.find('select[name=zip-code-search-user-select-town]').prop('disabled', false);
                    } else {
                        alert(controller.message.SYSTEM_ERROR);
                    }
                });
            } else {
                console.log('시/군/구 선택 불가')
                controller.element.find('select[name=zip-code-search-user-select-town]').prop('disabled', true);
            }
        },
        //지번 혹은 도로명 tab 변경시 사용자 안내 html 다시 그리기
        makeSelectOption: function ($select, optionArray, defaultText) {
            var selectOptionHtml = '';

            if (defaultText) {
                optionArray.splice(0, 0, {
                    key: defaultText,
                    count: 0
                });
            }
            for (var index in optionArray) {
                selectOptionHtml += zipcode_templates.selectOption(optionArray[index])
            }
            $select.empty().append($(selectOptionHtml));
            if (defaultText) {
                $select.find('option:first').val('');
            }
        },
        //사용자 입력 검증
        checkValid: function () {
            var isValid = true;

            if (this.beforeSearchStatus.type === 'road') {
                //도로명일때
                var userSelectCityValue = this.element.find('select[name=zip-code-search-user-select-city]').val();
                var userSelectTownValue = this.element.find('select[name=zip-code-search-user-select-town]').val();
                //select에 선택 값이 들어가 있음.
                if (!validate.isSelected(userSelectCityValue)) {
                    //시도 선택 확인
                    alert(this.message.CHECK_SEARCH_REQUIRE_CITY);
                    isValid = false;
                    return
                }
                if (!validate.isSelected(userSelectTownValue)) {
                    //시군 선택 확인
                    alert(this.message.CHECK_SEARCH_REQUIRE_TOWN);
                    isValid = false;
                    return
                }
            }
            if (validate.isEmpty(this.requestParameterForAPI.keyword)) {
                //빈 입력인지 확인
                alert(this.message.INPUT_ADDRESS);
                isValid = false;
            }
            return isValid;
        },
        //API통신 시도
        ajaxSearchRequest: function (requestData, isMoreRequest) {
            console.log('ajax 진행 requestData.type = ', requestData.type)
            var url = this.zipcodeAPI[requestData.type]
            $.ajax({
                url: url,
                data: requestData,
                dataType: 'jsonp'
            }).done(function (result) {
                if (result.status === 'success') {
                    controller.beforeSearchStatus.keyword = requestData.keyword;

                    if (requestData.type !== 'range') {
                        controller.beforeSearchStatus.type = requestData.type;
                    }

                    if (isMoreRequest) {
                        controller.makeResultAddress(result.data);
                    } else {
                        controller.makeResultContentsWrap(result.data, requestData);
                    }
                    controller.setSearchPossible(result.data)
                } else {
                    alert(controller.message.SYSTEM_ERROR);
                }
            });
        },
        //검색된 결과 값에 따라 더보기 결정
        setSearchPossible: function (data) {
            this.beforeSearchStatus.isSearchPossible = true;
            if (data.address.length < this.requestParameterForAPI.limit) {
                console.log(data.address.length, '건 발견되어 더 이상 로드할 필요 없다')
                this.beforeSearchStatus.isSearchPossible = false;
            } else {
                console.log(data.address.length, '건 발견 더 찾아 봐야 한다 ')
            }
        },
        //검색된 결과 html 만들기
        makeResultContentsWrap: function (data, requestData) {
            this.ui.result.html('');
            var resultHtml = zipcode_templates.result(data);
            this.ui.result.append(resultHtml).show();

            if (data.address.length <= 0) {

                // 주소가 없는 경우
                if (!this.beforeSearchStatus.hasResult) {//주소가 없어서 범위검색으로 다시 보내야 한다.
                    this.beforeSearchStatus.hasResult = true;
                    this.beforeSearchStatus.isSearchPossible = false;
                    console.log('범위 검색도 없는 경우 그냥 끝 ');
                } else {//범위검색 도 없는 경우.
                    console.log('범위 검색 스펙 아웃 되어 범위검색으로 다시 찾지 않는다.');
                    // this.requestParameterForAPI.type = 'range';
                    // this.beforeSearchStatus.hasResult = false;
                    // this.beforeSearchStatus.isNewZipCodeSearch = true;
                    // this.decideSearchRequestType();
                }
                this.element
                    .find('.zip-code-search-result-gide')
                    .text(this.viewData.information.resultNoting.gide);
                // 주소가 없어서 범위까지 없는 경우
                //this.element.find('.zip-code-search-result-contents-wrap').empty();
                this.setResultNotingTrigger(zipcode_params.device)
                this.element.find('.zip-code-search-result-noting-wrap').show();
                //}else if(){

            } else {

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
        //검색 결과 리스트의 스크롤 사이즈 설정
        setDisplayResultBox: function (device) {
            var $resultContentsWrap = this.element.find('.zip-code-search-result-contents-wrap');
            var SearchContents = this.ui.zipcodeSearchContents.innerHeight();
            var height = 0;
            if (device === 'pc') {
                var userChoiceWrap = this.ui.userChoiceWrap.outerHeight(true);
                var resultInfoWrap = this.element.find('.zip-code-search-result-info-wrap').outerHeight(true);

                height = SearchContents - userChoiceWrap - resultInfoWrap;
            } else {
                var inputWrap = this.element.find('.zip-code-search-user-input-wrap').outerHeight(true);
                var inputGide = this.element.find('.zip-code-search-user-input-gide').outerHeight(true);
                var resultInfo = this.element.find('.zip-code-search-result-info').outerHeight(true);
                var contentsWrap = Number(this.element.find('.zip-code-search-result-contents-wrap').css('margin-top').replace(/px/g, ''));

                height = SearchContents - inputWrap - inputGide - resultInfo - contentsWrap;
                switch (this.beforeSearchStatus.type) {
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
        //검색 결과 리스트의 스크롤 위치에 따라 더보기 작동
        setResultScroll: function ($wrap, $contents) {
            $wrap.css('overflowY', 'auto').scroll(function () {
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
        //더보기 결과 html 더하기
        makeResultAddress: function (data) {
            var addressHtml = zipcode_templates.address(data);
            var $resultContentswrap = this.element.find('.zip-code-search-result-contents-wrap');
            var $resultContentsUl = this.element.find('.zip-code-search-result-contents-ul').append(addressHtml);

            this.setResultScroll($resultContentswrap, $resultContentsUl)
        },
        //검색 결과로 만들어진 새로운 html에 이벤트 등록
        resultEventListener: function () {
            this.ui.result.off()
                .on('click', '.more-result', $.proxy(this.decideSearchRequestType, this))
                .on('click', '.zip-code-search-result-trigger', $.proxy(this.resultTriggerEvent, this))
                .on('change', '.zip-code-search-result-filter-select-city', $.proxy(this.selectFilterEvent, this))
                .on('change', '.zip-code-search-result-filter-select-town', $.proxy(this.selectFilterEvent, this))
        },
        //검색 결과중 지번 일때 필터선택 시 호출
        selectFilterEvent: function () {
            this.requestParameterForAPI.sido = this.element.find('.zip-code-search-result-filter-select-city').val();
            this.requestParameterForAPI.sigungu = this.element.find('.zip-code-search-result-filter-select-town').val();
            this.beforeSearchStatus.isNewZipCodeSearch = true;
            this.decideSearchRequestType()
        },
        //주소 클릭시 콜백 함수 실행
        resultTriggerEvent: function (event) {
            event.preventDefault();
            var zipcode = $(event.currentTarget).data('zipcode');
            collBackFunction(zipcode);
        },
        //tab 변경
        selectTypeEvent: function (event) {
            event.preventDefault();
            var $current = $(event.currentTarget);
            var typeChangeHistory = this.beforeSearchStatus.type;

            this.beforeSearchStatus.type = $current.data('search-type');
            if (typeChangeHistory !== this.beforeSearchStatus.type) {
                this.beforeSearchStatus.isNewZipCodeSearch = true;
                this.displaySearchType(this.beforeSearchStatus.type);
            }
        },
        //tab 변경에 따른 내용 수정
        displaySearchType: function (type) {
            this.ui.searchKeyword
                .focus()
                .attr('placeholder', this.viewData.information[type].gide.placeholder);
            this.displaySelector(type);
            this.displayUserSelectWrap(type);
            this.displaySearchGide(type, true);
            this.displayInputGide(type);
            this.ui.result.empty();
        },
        //필터 화면 노출
        displayFilter: function (selectorType, requestData) {
            var $resultFilter = this.element.find('.zip-code-search-result-filter-wrap');

            switch (selectorType) {
                case 'road':
                    $resultFilter.hide();
                    break;
                case 'jibun':
                    if (requestData) {
                        var $sido = this.element.find('.zip-code-search-result-filter-select-city');
                        var $sigungu = this.element.find('.zip-code-search-result-filter-select-town');
                        $sido.val(requestData.sido).prop('selected', true);
                        if (requestData.sido !== '') {
                            $sigungu.val(requestData.sigungu).prop('selected', true).prop('disabled', false);
                        }
                    }
                    $resultFilter.show();
                    break;
            }
        },
        //tab view
        displaySelector: function (selectorType) {
            console.log('displaySelector = ', selectorType)
            this.ui.typeSelectorTrigger.each(function (index, element) {
                var $element = $(element);
                var currentType = $element.data('search-type');

                if (currentType === selectorType) {
                    $element.addClass('selected')
                } else {
                    $element.removeClass('selected')
                }
            });
        },
        //사용자 입력 부분 노출
        displayUserSelectWrap: function (selectorType) {
            switch (selectorType) {
                case 'road':
                    this.ui.searchSelectorWrap.show();
                    break;
                case 'jibun':
                    this.ui.searchSelectorWrap.hide();
                    break;
            }
        },
        //검색 밥법 설명서 html 노출
        displaySearchGide: function (selectorType, isShow) {
            if (isShow) {
                var gideData = this.viewData.information[selectorType];
                var html = zipcode_templates.gide(gideData);
                this.ui.choiceGide.show().html(html);
            } else {
                this.ui.choiceGide.hide();
            }
        },
        //검색 결과 없을때 1:1문의
        setResultNotingTrigger: function (device) {
            this.element.find('.zip-code-search-result-noting-trigger')
                .attr('href', this.viewData.information.resultNoting[device].contactUs.href)
                .text(this.viewData.information.resultNoting[device].contactUs.text);
        },
        //input 주위 설명 문구
        displayInputGide: function (selectorType) {
            this.ui.inputGide.html(this.viewData.information[selectorType].gide.input);
        }

    };
    controller.initialize();
};

module.exports = zipcode;