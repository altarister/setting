var deal_tooltip_floating_templates = {
    dealTooltipFloatingTrigger: function (data) {
        var template = '';
        template += '<a class="deal-tooltip-floating-trigger" href="' + data.id + '" data-trigger-index="' + data.index + '">';
        template += '   <span class="deal-tooltip-floating-trigger-content">';
        template += '       상품옵션<br>바로선택';
        template += '   </span>';
        template += '</a>';
        return template;
    },
    dealTooltipFloatingContent: function (data) {
        var template = '';
        template += '<li class="deal-tooltip-floating-container" data-deal-id="' + data + '">';
        template += '   <span class="deal-tooltip-floating-content-arrow"></span>';
        template += '   <div class="deal-tooltip-floating-container-contents-wrap">';
        template += '    ';
        template += '   </div>';
        template += '   <div class="deal-tooltip-floating-container-controller">';
        template += '       <span class="deal-tooltip-floating-container-controller-closing">닫기</span>';
        template += '   </div>';
        template += '</li>';
        return template;
    }
};