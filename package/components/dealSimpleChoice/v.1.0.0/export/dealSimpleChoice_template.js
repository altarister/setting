var dealEasyChoiceOption_templates = {

    dealItemSelectedOption: function(data){
        var template = '';
        template += '<div class="deal-item-selected-option-wrap">';
        template += '   <strong class="deal-item-selected-option-title">';
        template += '       1. 블랙 파우더+아이플러프원&amp;원 ';
        template += '   </strong>';
        template += '   <div class="deal-item-selected-option-amount-wrap">';
        template += '       <span class="deal-item-selected-option-amount-down">down</span>';
        template += '       <input class="deal-item-selected-option-amount-value" type="text" name="amount" value="48" data-min="1" data-limit="9999">';
        template += '       <span class="deal-item-selected-option-amount-up">up</span>';
        template += '   </div>';
        template += '   <div class="deal-item-selected-option-value">';
        template += '       <strong class="deal-item-selected-option-price">';
        template += '           844800';
        template += '       </strong>';
        template += '       <span class="deal-item-selected-option-unit">원</span>';
        template += '   </div>';
        template += '   <button class="deal-item-selected-option-delete" type="button">×</button>';
        template += '</div>';
        return template;
    },

    deal : [
        { title: { main : '체지방, 이제 없었던 일로 하세요!' }, price: { origin : 10000} },
        { title: { main : '[포니이펙트] 페이보릿 플루이드 립 틴트' }, price: { origin : 20000} },
        { title: { main : '[포니이펙트] 스테이핏 매트 립 컬러' }, price: { origin : 30000} },
        { title: { main : '[포니이펙트] 에버래스팅 쿠션 파운데이션' }, price: { origin : 40000} },
        { title: { main : '[더샘] 초코파이 핸드크림 3종' }, price: { origin : 50000} }
    ],

    dealItemOptionViewer: function (data) {
        var template = '';
        template += '<div  class="deal-item-option-viewer" data-value="54684" data-price="7200" data-limit="10" data-min="1" data-soldout="2">';
        template += '   <em class="deal-item-option-viewer-title">'+data.title.main+'</em>';
        template += '   <strong class="deal-item-option-viewer-location">';
        template += '       <span class="deal-item-option-viewer-price">'+data.price.origin+'</span>';
        template += '       <span class="deal-item-option-viewer-unit">원</span>';
        template += '   </strong>';
        template += '</div>';
        return template;
    },

    shoes : {
        size : [
            { title: { main : 220 }, price: { origin : 10000} },
            { title: { main : 230 }, price: { origin : 20000} },
            { title: { main : 240 }, price: { origin : 30000} },
            { title: { main : 250 }, price: { origin : 40000} },
            { title: { main : 260 }, price: { origin : 50000} },
            { title: { main : 270 }, price: { origin : 60000} },
            { title: { main : 280 }, price: { origin : 70000} },
            { title: { main : 290 }, price: { origin : 80000} },
            { title: { main : 300 }, price: { origin : 90000} }
        ],
        color : [
            { title: { main : 'block' }, price: { origin :10000 } },
            { title: { main : 'red' }, price: { origin :20000 } },
            { title: { main : 'blue' }, price: { origin :30000 } },
            { title: { main : 'white' }, price: { origin :40000 } }
        ]
    },

    designTemplateAccordion: function (data, indexNum) {
        console.log('indexNum = ',indexNum)

        var template = '';
        if(indexNum === 0){
            template += '   <div  class="design-template-accordion-wrap accordion-open">';
        }else{
            template += '   <div  class="design-template-accordion-wrap">';
        }
        template += '   <p class="design-template-accordion-info">';
        template += '       <strong class="design-template-accordion-title">사이즈</strong>';
        template += '       <span class="design-template-accordion-selected">260</span>';
        template += '       <span class="design-template-accordion-controller">controller</span>';
        template += '   </p>';
        template += '   <ul class="design-template-accordion-list">';
        for(var index in data){
            template += '       <li class="design-template-accordion-content">';
            template +=             this.dealItemOptionViewer(data[index]);
            template += '       </li>';
        }
        template += '   </ul>';
        template += '</div>';
        return template;
    },

    selectDesignViewer: function (data) {

        var data = this.data;
        var isAccordion = true;
        var indexNum = 0;
        if(isAccordion){
            data = this.shoes
        }else{
            data = this.deal
        }
        var template = '';
        template += '<div class="select-design-viewer">';
        template += '    <p class="select-design-viewer-option-selector">';
        template += '       <span class="value">상품을 선택해주세요.</span>';
        template += '       <span class="trigger">검색</span>';
        template += '    </p>';
        template += '    <div class="select-design-viewer-list-box">';
        template += '       <ul class="select-design-viewer-list">';
        for(var key in data){
            template += '       <li class="select-design-viewer-option">';
            if(isAccordion){
                template +=             this.designTemplateAccordion(data[key], indexNum);
            }else{
                template +=             this.dealItemOptionViewer(data[key]);
            }
            template += '       </li>';
            indexNum++;
        }
        template += '       </ul>';
        template += '   </div>';
        template += '</div>';
        return template;
    },

    option: function (data) {
        var template = '';
        template += '<div class="deal-simple-choice-wrap">';

                        /*지정된 상품 소개*/
        template += '   <div class="deal-simple-choice-target-info">';
        template += '       <strong class="deal-simple-choice-target-title">';
        template +=            data.choiceTargetTitle;
        template += '       </strong>';
        template += '   </div>';

                        /*상품옵션선택*/
        template += '   <div class="deal-simple-choice-select-wrap">';
        template += '       <em class="deal-simple-choice-target-title-sub">';
        template +=            '기본상품 : 1.#EX400 문라이즈'
        template += '       </em>';
        template +=         this.selectDesignViewer();
        // template += '       <select class="deal-simple-choice-select">';
        // template += '           <option value="">상품을 선택해주세요.</option>';
        // template += '           <option value="96492" data-price="10900" data-limit="5" data-min="1" data-soldout="2">';
        // template += '               1. [기획] 맞춤커버 62P (중16PX3+대14Px1)';
        // template += '           </option>';
        // template += '       </select>';
        template += '   </div>';


                        /*선택한 상품 내용*/
        template += '   <div class="deal-simple-choice-result-wrap">';

                            /* 구매 수량 제한 표시 */
        template += '       <p class="deal-simple-choice-result-value-info">';
        template += '           (최대 구매 수량 10 개)';
        template += '       </p>';

                            /* 선택 상품 리스트*/
        template += '       <ul class="deal-simple-choice-result-list">';
        template += '           <li class="deal-simple-choice-result-item" data-id="1095927" data-additional="false">';
        template +=                 this.dealItemSelectedOption();
        template += '               <ul class="deal-simple-choice-result-sub-list">';
        template += '                   <li class="deal-simple-choice-result-sub-item" data-id="1095927" data-additional="false">';
        template +=                         this.dealItemSelectedOption();
        template += '                   </li>';
        template += '                   <li class="deal-simple-choice-result-sub-item" data-id="1095927" data-additional="false">';
        template +=                         this.dealItemSelectedOption();
        template += '                   </li>';
        template += '               </ul>';
        template += '           </li>';
        template += '           <li class="deal-simple-choice-result-item" data-id="1095927" data-additional="false">';
        template +=                 this.dealItemSelectedOption();
        template += '               <ul class="deal-simple-choice-result-sub-list">';
        template += '                   <li class="deal-simple-choice-result-sub-item" data-id="1095927" data-additional="false">';
        template +=                         this.dealItemSelectedOption();
        template += '                   </li>';
        template += '                   <li class="deal-simple-choice-result-sub-item" data-id="1095927" data-additional="false">';
        template +=                         this.dealItemSelectedOption();
        template += '                   </li>';
        template += '                   <li class="deal-simple-choice-result-sub-item" data-id="1095927" data-additional="false">';
        template +=                         this.dealItemSelectedOption();
        template += '                   </li>';
        template += '                   <li class="deal-simple-choice-result-sub-item" data-id="1095927" data-additional="false">';
        template +=                         this.dealItemSelectedOption();
        template += '                   </li>';
        template += '                   <li class="deal-simple-choice-result-sub-item" data-id="1095927" data-additional="false">';
        template +=                         this.dealItemSelectedOption();
        template += '                   </li>';
        template += '               </ul>';
        template += '           </li>';
        template += '       </ul>';


                            /* 선택 상품의 총 가격 표시*/
        template += '       <p class="deal-simple-choice-result-price-wrap">';
        template += '           <span class="deal-simple-choice-result-price-title">총 상품금액</span>';
        template += '           <strong class="deal-simple-choice-result-price-total-value">';
        template += '               0';
        template += '           </strong>';
        template += '           <span class="deal-simple-choice-result-price-unit">원</span>';
        template += '       </p>';
        template += '   </div>';

                        /*선택한 상품 전송*/
        template += '   <div class="deal-simple-choice-submit">';
        template += '       <button type="submit" class="deal-simple-choice-submit-cart">장바구니</button>';
        template += '       <button type="submit" class="deal-simple-choice-submit-order">즉시구매</button>';
        template += '   </div>';
        template += '</div>';
        
        return template;
    }
};