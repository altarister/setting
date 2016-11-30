var delContainer_template = {
    dealList: function (lineAmount) {
        var template = '';
        template += '<ul class="memebox-deal-list memebox-deal-list-line-amount-'+lineAmount+'">';
        template += '</ul>';
        return template;
    },

    dealListWrapper: function (dealElement) {
        var template = '';
        template += '<li class="memebox-deal-wrapper">';
        template +=     dealElement;
        template += '</li>';
        return template;
    }
};