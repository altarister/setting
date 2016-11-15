var zipcode_templates = {
    // gide: require('./gide.hbs')
    gide: function(data) {
        var template = '';
        template += '<string class="zip-code-search-user-choice-gide-title">';
        template += '   <em>* '+data.title+'</em> 검색방법';
        template += '</string>';
        template += '<ol class="zip-code-search-user-choice-gide-ol">';
        for(var index in data.gide.choice) {
            template += '<li class="zip-code-search-user-choice-gide-li">';
            template +=     data.gide.choice[index];
            template += '</li>';
        }
        template += '</ol>';
        return template
    }
    ,
    // address: require('./address.hbs')
    address: function(data) {
        var template = '';
        for(var index in data.address) {
            template += '<li class="zip-code-search-result-contents-li">';
            template += '   <a href="#" class="zip-code-search-result-trigger" data-zipcode=\''+JSON.stringify(data.address[index])+'\'>';
            template += '       <strong class="zip-code-search-result-key">'+data.address[index].zipcode+'</strong>';
            template += '       <em class="zip-code-search-result-road">';
            template += '           <span class="zip-code-search-result-type">도로명</span>';
            template += '           <span class="zip-code-search-result-address">';
            template +=                 data.address[index].roads;
            template += '           </span>';
            template += '       </em>';
            template += '       <em class="zip-code-search-result-jibun">';
            template += '           <span class="zip-code-search-result-type">지번</span>';
            template += '           <span class="zip-code-search-result-address">';
            template +=                 data.address[index].jibuns;
            template += '           </span>';
            template += '       </em>';
            template += '   </a>';
            template += '</li>';
        }
        return template
    }
    ,
    // result: require('./_result.hbs'),
    result: function(data) {
        var template = '';

        //+'{{!--검색 결과 건수 & 설명--}}'
        template += '<div class="zip-code-search-result-info-wrap">';
        template += '   <p class="zip-code-search-result-info">';
        template += '       검색결과 총 <span class="zip-code-search-result-info-count">'+data.totalCount+'</span>건 입니다.'
        template += '       <span class="zip-code-search-result-gide">정확한 검색을 위해 지번 또는 건물명을 함께 검색해주세요.</span>';
        template += '   </p>';

        //+'{{!--검색 결과 필터--}}'
        template += '   <ul class="zip-code-search-result-filter-wrap">';
        template += '       <li class="zip-code-search-result-filter">';
        template += '           <span class="zip-code-search-result-filter-select-city-wrap">';
        template += '               <select class="zip-code-search-result-filter-select-city">';
        template += '                   <option value="">시/도 선택</option>';
        for(var index in data.aggregations.sido) {//'{{#each aggregations.sido}}'
            template += '               <option value="'+data.aggregations.sido[index].key+'">'+data.aggregations.sido[index].key+'('+data.aggregations.sido[index].count+'건)</option>';
        }
        template += '               </select>';
        template += '           </span>';
        template += '       </li>';
        template += '       <li class="zip-code-search-result-filter">';
        template += '           <span class="zip-code-search-result-filter-select-town-wrap">';
        template += '               <select class="zip-code-search-result-filter-select-town" disabled>';
        template += '                   <option value="">시/군/구 선택</option>';
        for(var index in data.aggregations.sigungu) {//'{{#each aggregations.sigungu}}'
            template += '               <option value="'+data.aggregations.sigungu[index].key+'">'+data.aggregations.sigungu[index].key+'('+data.aggregations.sigungu[index].count+'건)</option>';
        }
        template += '               </select>';
        template += '           </span>';
        template += '       </li>';
        template += '   </ul>';
        template += '</div>';
        //+'{{!-- start 검색 결과 내용--}}'
        template += '<div class="zip-code-search-result-contents-wrap">';
        template += '   <ul class="zip-code-search-result-contents-ul">';
        template += '   </ul>';
        template += '   <div class="zip-code-search-result-noting-wrap">';
        template += '       <strong class="zip-code-search-result-noting-title">주소가 없으신가요?</strong>';
        template += '       <ul class="zip-code-search-result-noting_ul">';
        template += '           <li>주소가 올바르게 입력되었는지 다시 한번 확인해주세요.</li>';
        template += '           <li>찾으시려는 주소가 없는 경우 고객센터로 문의해주세요.</li>';
        template += '       </ul>';
        template += '       <a href="#" class="zip-code-search-result-noting-trigger">1:1 문의하기</a>';
        template += '   </div>';
        template += '</div>';
        return template
    }
    ,
    // selectOption: require('./selectOption.hbs')
    selectOption: function(data) {
        var template = '';
        template += '<strong class="zip-code-search-result-noting-title">주소가 없으신가요?</strong>';
        template += '<ul class="zip-code-search-result-noting_ul">';
        for(var index in data.aggregations.sigungu) {
            template += '   <li>주소가 올바르게 입력되었는지 다시 한번 확인해주세요.</li>';
            template += '   <li>찾으시려는 주소가 없는 경우 1:1문의하기로 문의해주세요.</li>';
        }
        template += '</ul>';
        template += '<a href="#" class="zip-code-search-result-noting-trigger">1:1 문의하기</a>';
        return template
    }
    ,
    // selectOption: require('./selectOption.hbs')
    selectOption: function(data) {
        var template = '';
        template += '<option value="'+data.key+'">'+data.key+'</option>';
        return template
    }
    ,
    // zipcode: require('./_zipcode.hbs')
    zipcode: function(data) {
        var template = '';

        template += '<div class="zip-code-search" data-component="zipcode" data-component-data=\''+JSON.stringify(data)+'\'>';
        //{{!--검색 방밥 선택--}}
        template += '   <ul class="zip-code-search-type-selector-ul">';
        template += '       <li class="zip-code-search-type-selector-road">';
        template += '           <a class="zip-code-search-type-selector-trigger selected" href="#road"><span>도로명 주소</span></a>';
        template += '       </li>';
        template += '       <li class="zip-code-search-type-selector-jibun">';
        template += '           <a class="zip-code-search-type-selector-trigger" href="#jibun"><span>지번 주소</span></a>';
        template += '       </li>';
        template += '   </ul>';

        template += '   <div class="zip-code-search-contents">';
        //{{!--검색 사용자 입력 혹은 선택--}}
        template += '       <div class="zip-code-search-user-choice-wrap">';
        template += '          <p class="zip-code-search-user-input-gide">시/도 , 시/군/구 선택 후 주소명을 입력해주세요.</p>';
        template += '          <ul class="zip-code-search-user-select-wrap">';
        template += '              <li class="zip-code-search-user-select-li">';
        template += '                   <span class="zip-code-search-user-select-city-wrap">';
        template += '                       <select class="zip-code-search-user-select-city" name="zip-code-search-user-select-city">';
        template += '                           <option value="">시/도 선택</option>';
        template += '                           <option value="#강원도">강원도</option>';
        template += '                       </select>';
        template += '                   </span>';
        template += '              </li>';
        template += '              <li class="zip-code-search-user-select-li">';
        template += '                   <span class="zip-code-search-user-select-town-wrap">';
        template += '                       <select class="zip-code-search-user-select-town" name="zip-code-search-user-select-town">';
        template += '                           <option value="">시/군/구 선택</option>';
        template += '                       </select>';
        template += '                   </span>';
        template += '              </li>';
        template += '          </ul>';
        template += '          <div class="zip-code-search-user-input-wrap">';
        template += '              <input type="text" class="zip-code-search-user-input" name="searchKey" value="" placeholder="(예: 판교역로14번길 20)">';
        template += '              <button type="submit" class="zip-code-search-user-choice-submit">검색</button>';
        template += '          </div>';
        template += '      </div>';
        //{{!--검색 팁 : 검색 결과와 대치--}}
        template += '      <div class="zip-code-search-user-choice-gide">';
        //{{!> components/zipcode/v.1.0.0/_gide}}
        template += '      </div>';
        //{{!-- start 모든 검색 결과--}}
        template += '      <div class="zip-code-search-result-wrap">';
        //{{!> components/zipcode/v.1.0.0/_result}}
        template += '      </div>';
        //{{!-- end 모든 검색 결과--}}
        template += '   </div>';
        template += '</div>';

        return template;
    }
};
