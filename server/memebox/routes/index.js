module.exports = {
    page: {
        // home //////////////////////////////////////////////////
        home: require('./page/home/home')

        // 회원 가입 //////////////////////////////////////////////////
        ,howToJoin: require('./page/member/signUp/howToJoin')
        ,acceptTerms: require('./page/member/signUp/acceptTerms')
        ,enterUserInformation: require('./page/member/signUp/enterUserInformation')
        ,SignedUp: require('./page/member/signUp/SignedUp')
        ,sns: require('./page/member/sns/sns')

        // 검색 //////////////////////////////////////////////////
        ,search_index: require('./page/search/index')
        ,search_result: require('./page/search/result')

        //상품 상세 //////////////////////////////////////////////////
        ,product: require('./page/product/product')

        //장바구니 //////////////////////////////////////////////////
        ,cart   : require('./page/cart/cart')

        //주문서 //////////////////////////////////////////////////
        ,order: require('./page/order/order')

        //ETC //////////////////////////////////////////////////
        ,dealAll: require('./page/dealAll/dealAll')
        ,dealAll_export: require('./page/dealAll/dealAll_export')
    },
    ajax: {
        deal: require('./ajax/dealAPI')
        ,zipCode: require('./ajax/zipCodeAPI')
    }
};

