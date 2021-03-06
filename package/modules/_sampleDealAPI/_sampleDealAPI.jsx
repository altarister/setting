var SampleDealAPI = function(viewData){
    var controller = {

        // element: '#memebox-service',
        // ui: {
        //     dealContainer: '.deal-container'
        // },
        // lineAmount: 2,
        deals: null,
        deal: {
            id: 'tempID4',
            view: {
                type: 'vertical',//horizontal, vertical
                expression: 10
            },
            name: {
                main: '[없었던일로] 마음껏 먹고 없었던일로! 체지방, 이제 없었던 일로 하세요!',
                sub: '체지방, 이제 없었던 일로 하세요!'
            },
            badge: 'badge',// 같은거. sticker
            sticker: 'freebie',
            remainingTime: {
                seconds: 3610
            },
            review: {
                average: 50,// 별점
                count: 50
            },
            ranking: 1,
            sold: {
                out: false,
                soon: null //품절임박
            },
            delivery: {// 테그
                isFree: true,
                condition: null,//'조건부무료배송',
                method: '미미배송',//null,//
                price: {info: '', value: '25,000', unit: '원'}
            },
            poke: {
                id: 'zzimCheck506935'
            },
            link: 'http://www.coupang.com/deal.pang?coupang=61130860',
            image: {
                type: 'square', //circle, wide, square
                basic: '/components/deal/v.1.0.0/mobile/_images/_image_square_basic.png',
                error: '/components/deal/v.1.0.0/mobile/_images/_image_square_error.png',
                src: 'http://img2.memebox.com/static/contents/img/upload/image_20150706134341_2m0D5I3Z7M.jpg',
                size: {
                    width: 200,
                    height: 200
                }
            },
            price: {
                discount: {info: '최대', value: '50', unit: '%' }, //최대 미미가격
                origin: {info: '', value: '32,000', unit: '원'},
                result: {info: '미미가격', value: '16,000', unit: '원', from: '~'}
            },
            options: {
                MaximumPurchaseQuantity: 10,
                hasMultiProducts: true,
                multiProducts : null,
                // multiProducts : {
                //     type: {
                //         isDefault: true,
                //         title: '상품명',
                //         value: [{name:'에어',price:'11,000'}, {name:'조던',price:'12,000'}]
                //     },
                //     color: {
                //         isDefault: false,
                //         title: '색상',
                //         value: [{name:'red',price:null}, {name:'black',price:null}, {name:'blue',price:null}]
                //     },
                //     size: {
                //         isDefault: false,
                //         title: '사이즈',
                //         value: [{name:'220',price:null}, {name:'230',price:null}]
                //     }
                // },
                basicProduct: '#EX400 문라이즈',

                additionItem: [
                    {
                        id: 'i4',
                        name:'나이키 신발끈',
                        category: {
                            type: {title: '상품명', value: '신발끈', price: '12,000'},
                        },
                        stock: 30
                    }
                ]
            },
            tracking: {
                analytics: {
                    target: 'track',
                    name: 'Product Clicked',
                    data: {
                        id: 'product_id',                                             // Product ID
                        name: 'product_name',                                         // Product Name
                        brand: 'product_brand',                                       // Product Brand
                        position: 'product_position',                                 // Product Position
                        list: 'product_list',                                         // Product List
                        currency: 'KRW',                                            // Currency: Korean Won
                        price: 'product_price',                                       // Product Price
                        label: 'product_name'                                         // Product Name
                    }
                },
                ga: {dealId: 'tempID4'}
            }
        },
        images: [
            'https://img1.memebox.com/cwxhija3/contents/img/memeboxProductItem/20161007044103_d9a89db2f80151988b380a3af833c706.jpg',
            'https://img1.memebox.com/3uqvc4to/contents/img/memeboxProductItem/20161115103443_eae03a379a2daeb8e71be12e7ec67dba.jpg',
            'https://img1.memebox.com/c2jq97q2/contents/img/memeboxProductItem/20161111052448_a60d63f5a0ade3646d6aa950cc132e3e.jpg',
            'https://img1.memebox.com/v6uciugt/contents/img/memeboxProductItem/20161114081753_c47132518d9a1eaf6f7c15eb7bbf7ba2.jpg',
            'https://img1.memebox.com/a70vqlis/contents/img/memeboxProductItem/20161114043824_52a43af20a8ad9190b7aef3793608d79.jpg'
        ],

        wideImg: [
            'https://img2.memebox.com/static/contents/img/upload/image_20160518211225_b3VcRp7GzN.jpg',
            // 'https://img1.memebox.com/72gfsdk0/contents/img/memeboxProductItem/20161020043220_930526a3bd0a25d11ca0f2a1a499dd4f.jpg',
            'https://img1.memebox.com/a70vqlis/contents/img/memeboxProductItem/20161114043824_52a43af20a8ad9190b7aef3793608d79.jpg',
            'https://img1.memebox.com/z0uovgml/contents/img/memeboxProductItem/20161011020338_ee3dcef775880ff08c8e5a0a6cd198f5.jpg',
            //'https://img1.memebox.com/uphu35f8/contents/img/memeboxProductItem/20161108055135_1a2ed3ce8ccd02052ce6d7db53571689.jpg',
            'https://img1.memebox.com/72gfsdk0/contents/img/memeboxProductItem/error.jpg',
            'https://img1.memebox.com/lahnslxd/contents/img/memeboxProductItem/20161114101656_4f39cb7f88f79f1f8cd22cac23e2d4a3.jpg'
        ],

        viewType : [
            {
                view: {
                    type: 'vertical',//horizontal, vertical
                    expression: 4
                },
                image: {
                    type: 'circle' //circle, wide, square
                }
            },
            {
                view: {
                    type: 'vertical',//horizontal, vertical
                    expression: 2
                },
                image: {
                    type: 'wide' //circle, wide, square
                }
            },
            {
                view: {
                    type: 'horizontal',//horizontal, vertical
                    expression: 10
                },
                image: {
                    type: 'square' //circle, wide, square
                }
            },
            {
                view: {
                    type: 'vertical',//horizontal, vertical
                    expression: 10
                },
                image: {
                    type: 'square' //circle, wide, square
                }
            },
            {
                view: {
                    type: 'vertical',//horizontal, vertical
                    expression: 4
                },
                image: {
                    type: 'square' //circle, wide, square
                }
            }
        ],

        initialize: function(){
            this.set(viewData);


            // this.ui.dealContainer.each(function (index, element) {
            //     controller.set(index, controller.viewType[index].view, controller.viewType[index].image.type );
            //     var lineAmount = controller.lineAmount;
            //     if(controller.viewType[index].view.type === 'horizontal'){
            //         lineAmount = 1
            //     }else if(controller.viewType[index].image.type === 'circle'){
            //         lineAmount = 3
            //     }
            //     new DealContainer($(element), lineAmount, controller.deals);
            // });
        },

        set: function (viewData) {
            this.deals = [];
            for (var index in this.images) {
                var forDeal = $.extend({}, this.deal);
                forDeal.id = 'dealId' + index;
                forDeal.view = viewData.view;

                if(index < 4){
                    forDeal.ranking = Number(index) + 1;
                }else{
                    forDeal.ranking = null;
                }
                if(index == 3){
                    forDeal.sold = $.extend({}, forDeal.sold, {out: true, soon: null});
                }
                if(index == 4){
                    forDeal.sold = $.extend({}, forDeal.sold, {out: false, soon: '품절임박입니다.'});
                }
                if(index > 2){
                    forDeal.price = $.extend({}, forDeal.price, {discount: {info: null, value: null, unit: null}});
                }else{
                    forDeal.price = $.extend({}, forDeal.price, {discount: {info: '최대', value: index, unit: '%'}});
                }
                if(index > 1){
                    forDeal.remainingTime = $.extend({}, forDeal.remainingTime, {seconds: null});
                }else{
                    forDeal.remainingTime = $.extend({}, forDeal.remainingTime, {seconds: Math.floor(Math.random() * 5) + 1});
                }

                if(index == 0){
                    forDeal.review = $.extend({}, forDeal.review, {average: 0, count: 0});
                }else if(index == 1 || index == 2){
                    forDeal.review = $.extend({}, forDeal.review, {average: null, count: null});
                }else if(index == 3){
                    forDeal.review = $.extend({}, forDeal.review, {average: 110, count: 50});
                }else{
                    forDeal.review = $.extend({}, forDeal.review, {average: 10, count: 1000});
                }

                if(index == 1){
                    forDeal.delivery = $.extend({}, forDeal.method, {isFree: true, condition: null, method: null,});
                }else if(index == 3){
                    forDeal.delivery = $.extend({}, forDeal.method, {isFree: true, condition: '조건부무료배송', method: '미미배송'});
                }else if(index == 2){
                    forDeal.delivery = $.extend({}, forDeal.method, {isFree: true, condition: '조건부무료배송', method: null});
                }else{
                    forDeal.delivery = $.extend({}, forDeal.method, {isFree: true, condition: null, method: '미미배송'});
                }

                if(viewData.image.type === 'wide'){
                    forDeal.image = $.extend({}, forDeal.image, {
                        type: viewData.image.type,
                        src: this.wideImg[index],
                        basic: '/components/deal/v.1.0.0/mobile/_images/_image_wide_basic.png',
                        error: '/components/deal/v.1.0.0/mobile/_images/_image_wide_error.png'
                    });
                    //forDeal.image = $.extend({}, forDeal.image, { type: imageType, src: this.images[index]});
                }else{
                    forDeal.image = $.extend({}, forDeal.image, {
                        type: viewData.image.type,
                        src: this.images[index],
                        basic: '/components/deal/v.1.0.0/mobile/_images/_image_square_basic.png',
                        error: '/components/deal/v.1.0.0/mobile/_images/_image_square_error.png'
                    });
                }

                this.deals.push(forDeal);
            }
        },

        get: function(){
            return this.deals;
        }
    };

    controller.initialize();

    return controller;
};

module.exports = SampleDealAPI;