var layer_templates = {
    // modal: require('./_modal.hbs'),
    modal: function(data) {
        var template = '';
        template += '<div class="module-layer-modal">';
        template += '   <strong class="module-layer-modal-title">'+data.title+'</strong>';
        template += '   <div class="module-layer-modal__contents">';
        template += '   </div>';
        template += '   <div class="module-layer-modal-controller">';
        template += '       <span class="module-layer-modal-closing">닫기</span>';
        template += '   </div>';
        template += '</div>';
        return template
    }
}