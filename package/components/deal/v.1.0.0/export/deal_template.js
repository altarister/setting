var deal_templates = {

    layout: function (data) {
        var template = '';
        template += '<div id="'+data.id+'" class="memebox-deal deal_type_'+data.view.type+'_'+data.image.type+'_'+data.view.expression+'">';
        template += '   <div class="memebox-deal-info">';
        template +=         this.image(data);
        template +=         this.name(data);
        template +=         this.price(data.price);
        template +=         this.status(data);
        template +=         this.delivery(data);
        template += '   </div>';
        if(data.sold.out){
            template += this.out(data);
        }else{
            template += this.link(data);
        }
        template +=     this.poke(data);
        template += '</div>';
        return template;
    },

    image: function (data) {
        var template = '';
        template += '<div class="memebox-deal-image-wrap">';
        if(data.remainingTime.seconds) {
            template += '   <span class="memebox-deal-timer">';
            template += '       <span class="memebox-deal-timer-value" data-remainingTime="' + data.remainingTime.seconds + '"></span>';
            template += '   </span>';
        }
        template += '   <span class="memebox-deal-sticker sticker-'+data.sticker+'"></span>';
        template += '   <span class="memebox-deal-badge badge-'+data.badge+'"></span>';
        if(data.ranking){
            template += '   <span class="memebox-deal-ranking">'+data.ranking+'</span>';
        }
        template += '   <img class="memebox-deal-image" src="'+data.image.src+'" alt="'+data.name.main+'"/>';
        template += '</div>';
        return template;
    },

    name: function (data) {
        var template = '';
        template += '<div class="memebox-deal-name">';
        template += '   <strong class="memebox-deal-name-main">'+data.name.main+'</strong>';
        template += '   <em class="memebox-deal-name-sub">'+data.name.sub+'</em>';
        template += '</div>';
        return template;
    },

    price: function (data) {
        var template = '';
        template += '<p class="memebox-deal-price-wrap">';
        console.log('data.discount.value',data.discount.value);
        if(data.discount.value <= 0){
            template += '   <strong class="memebox-deal-price-discount">';
            template += '       <strong class="memebox-deal-price-value">'+data.discount.value+'</strong><!--';
            template += '       --><em class="memebox-deal-price-unit">'+data.discount.unit+'</em>';
            template += '       <span class="memebox-deal-price-info">'+data.discount.info+'</span>';
            template += '   </strong>';
        }else{
            template += '   <strong class="memebox-deal-price-discount">';
            template += '       <strong class="memebox-deal-price-value">미미가격</strong><!--';
            template += '   </strong>';
        }
        template += '   <strong class="memebox-deal-price-origin">';
        template += '       <strong class="memebox-deal-price-value">'+data.origin.value+'</strong><!--';
        template += '       --><em class="memebox-deal-price-unit">'+data.origin.unit+'</em>';
        template += '       <span class="memebox-deal-price-info">'+data.origin.info+'</span>';
        template += '   </strong>';
        template += '   <strong class="memebox-deal-price-result">';
        template += '       <strong class="memebox-deal-price-value">'+data.result.value+'</strong><!--';
        template += '       --><em class="memebox-deal-price-unit">'+data.result.unit+'</em>';
        template += '       <span class="memebox-deal-price-info">'+data.result.info+'</span>';
        template += '   </strong>';
        template += '</p>';
        return template;
    },

    status: function (data) {
        var template = '';
        template += '<div class="memebox-deal-current-status">';
        template += '   <span class="memebox-deal-review-star">';
        template += '       <span class="memebox-deal-review-star-value" style="width:'+data.review.average+'%;"></span>';
        template += '   </span>';
        template += '   <strong class="memebox-deal-review-average">';
        template += '       <span class="memebox-deal-review-average-value">'+data.review.average+'</span>점';
        template += '   </strong>';
        template += '   <em class="memebox-deal-review-count">';
        template += '       리뷰 <span class="memebox-deal-review-count-value">'+data.review.count+'</span>';
        template += '   </em>';
        if(data.sold.soon){
            template += '<span class="memebox-deal-sold-out">'+data.sold.soon+'</span>';
        }
        template += '</div>';
        return template;
    },

    delivery: function (data) {
        var template = '';
        template += '<div class="memebox-deal-delivery">';
        template += '   <span class="memebox-deal-delivery-shipping">'+data.delivery.condition+'</span>';
        template += '   <span class="memebox-deal-delivery-type">'+data.delivery.method+'</span>';
        template += '</div>';
        return template;
    },

    poke: function (data) {
        var template = '';
        template += '<div class="memebox-deal-poke-wrap">';
        template += '   <span id="zzimCheck506935" class="memebox-deal-poke-checked">이 상품을 찜했습니다.</span>';
        template += '   <button class="memebox-deal-poke">찜하기</button>';
        template += '</div>';
        return template;
    },

    out: function (data) {
        var template = '';
        template += '<span class="memebox-deal-sell-stop">';
        template += '   ';
        template += '</span>';
        return template;
    },

    link: function (data) {
        var template = '';
        template += '<a class="memebox-deal-link" href="'+data.link+'" ';
        if(data.tracking){
            if(data.tracking.hasOwnProperty('ga')){
                template += '   data-ga=\''+JSON.stringify(data.tracking.ga)+'\' ';
            }
            if(data.tracking.hasOwnProperty('analytics')) {
                template += '   data-analytics=\'' + JSON.stringify(data.tracking.analytics) + '\'';
            }
        }
        template += '   >';
        template += '   바로가기';
        template += '</a>';
        return template;
    }
};