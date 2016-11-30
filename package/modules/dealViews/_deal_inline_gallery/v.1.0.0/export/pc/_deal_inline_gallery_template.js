var deal_inline_gallery_templates = {

    title: function(data) {
        return '<strong class="deal-inline-gallery-title">'+data.title+'</strong>';
    },

    navigation: function (data) {
        var template = '';
        template += '<p class="deal-inline-gallery-navigation">';
        template += '   <span class="paging">';
        template += '       <span class="current">'+data.current+'</span>/<span class="total">'+data.total+'</span>';
        template += '   </span>';
        template += '   <span class="left disabled" data-arrow-direction="1">&lt;</span>';
        template += '   <span class="right" data-arrow-direction="-1">&gt;</span>';
        template += '</p>';
        return template;
    }
};