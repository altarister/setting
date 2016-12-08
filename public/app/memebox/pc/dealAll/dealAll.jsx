var $ = require('jquery');
var utility = require('utility');
//var Menu = require('components/menu/v.1.0.0/_menu.jsx');
var DealContainer = require('components/dealContainer/v.1.0.0/dealContainer.jsx');

require('./dealAll.scss');

var DealView_type_all = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            dealContainer: '.deal-container'
        },
        lineAmount: 4,
        deals: [],
        deal: {
            id: 'tempID4',
            view: {
                type: 'vertical',//horizontal, vertical
                expression: 10
            },
            name: {
                main: '[없었던일로] 마음껏 먹고 없었던일로!',
                sub: '체지방, 이제 없었던 일로 하세요!'
            },
            badge: 'badge',
            sticker: 'freebie',
            remainingTime: {
                seconds: 3610
            },
            review: {
                average: 50,
                count: 50
            },
            ranking: 1,
            sold: {
                out: false,
                soon: '품절임박입니다.'
            },
            delivery: {
                isFree: true,
                condition: '조건부무료배송',
                method: '미미배송'
            },
            poke: {
                id: 'zzimCheck506935'
            },
            link: 'http://www.coupang.com/deal.pang?coupang=61130860',
            image: {
                type: 'square', //circle, wide, square
                src: 'http://img2.memebox.com/static/contents/img/upload/image_20150706134341_2m0D5I3Z7M.jpg',
                size: {
                    width: 200,
                    height: 200
                }
            },
            price: {
                discount: {info: '', value: '50', unit: '%'},
                origin: {info: '', value: '32,000', unit: '원'},
                result: {info: '', value: '16,000', unit: '원'}
            },
            option: {
                MaximumPurchaseQuantity: 10,
                basicProduct: '#EX400 문라이즈',
                products: [
                    {
                        id: 'i1',
                        name:'나이키 ',
                        category: {
                            type: {title: '상품명', value: '에어', price: '11,000'},
                            color: {title: '색상', value: 'red'},
                            size: {title: '사이즈', value: '220'}
                        },
                        stock: 30
                    },
                    {
                        id: 'i2',
                        name:'나이키 ',
                        category: {
                            type: {title: '상품명', value: '에어', price: '11,000'},
                            color: {title: '색상', value: 'black'},
                            size: {title: '사이즈', value: '230'}
                        },
                        stock: 30
                    },{
                        id: 'i3',
                        name:'나이키 ',
                        category: {
                            type: {title: '상품명', value: '에어', price: '11,000'},
                            color: {title: '색상', value: 'blue'},
                            size: {title: '사이즈', value: '220'}
                        },
                        stock: 30
                    },
                    {
                        id: 'i4',
                        name:'나이키 ',
                        category: {
                            type: {title: '상품명', value: '에어', price: '11,000'},
                            color: {title: '색상', value: 'blue'},
                            size: {title: '사이즈', value: '230'}
                        },
                        stock: 30
                    },{
                        id: 'i5',
                        name:'나이키 ',
                        category: {
                            type: {title: '상품명', value: '조던', price: '12,000'},
                            color: {title: '색상', value: 'red'},
                            size: {title: '사이즈', value: '220'}
                        },
                        stock: 30
                    },
                    {
                        id: 'i6',
                        name:'나이키 ',
                        category: {
                            type: {title: '상품명', value: '조던', price: '12,000'},
                            color: {title: '색상', value: 'red'},
                            size: {title: '사이즈', value: '230'}
                        },
                        stock: 30
                    },{
                        id: 'i7',
                        name:'나이키 ',
                        category: {
                            type: {title: '상품명', value: '조던', price: '12,000'},
                            color: {title: '색상', value: 'blue'},
                            size: {title: '사이즈', value: '220'}
                        },
                        stock: 30
                    },
                    {
                        id: 'i8',
                        name:'나이키 ',
                        category: {
                            type: {title: '상품명', value: '조던', price: '12,000'},
                            color: {title: '색상', value: 'blue'},
                            size: {title: '사이즈', value: '230'}
                        },
                        stock: 30
                    }
                ],
                additionItem: [
                    {
                        id: 'i4',
                        name:'나이키 신발끈5',
                        category: {
                            rope:'신발끈',
                        },
                        stock: 30,
                        price: '14,000',
                        unit: '원'
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
            "https://img2.memebox.com/static/contents/img/upload/image_20160518211225_b3VcRp7GzN.jpg",
            "https://img1.memebox.com/72gfsdk0/contents/img/memeboxProductItem/20161020043220_930526a3bd0a25d11ca0f2a1a499dd4f.jpg",
            //"https://img1.memebox.com/z0uovgml/contents/img/memeboxProductItem/20161011020338_ee3dcef775880ff08c8e5a0a6cd198f5.jpg",
            "https://img1.memebox.com/72gfsdk0/contents/img/memeboxProductItem/error.jpg",
            "https://img1.memebox.com/uphu35f8/contents/img/memeboxProductItem/20161108055135_1a2ed3ce8ccd02052ce6d7db53571689.jpg",
            "https://img1.memebox.com/lahnslxd/contents/img/memeboxProductItem/20161114101656_4f39cb7f88f79f1f8cd22cac23e2d4a3.jpg"
        ],

        viewType : [
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
            //new Menu();
            utility.uiEnhancements.call(this);
            this.setDeals();

            this.ui.dealContainer.each(function (index, element) {
                controller.setDeals(index, controller.viewType[index].view, controller.viewType[index].image.type );

                new DealContainer($(element), controller.lineAmount, controller.deals);
            });
        },

        setDeals: function (index, view, imageType) {
            this.deals = [];
            for (var index in this.images) {
                var forDeal = $.extend({}, this.deal);
                forDeal.id = 'dealId' + index;
                forDeal.view = view;
                forDeal.ranking = null;//Number(index) + 1;
                if(imageType === 'wide'){
                    forDeal.image = $.extend({}, forDeal.image, { type: imageType, src: this.wideImg[index]});
                }else{
                    forDeal.image = $.extend({}, forDeal.image, { type: imageType, src: this.images[index]});
                }
                forDeal.price = $.extend({}, forDeal.price, {discount: {info: '', value: index, unit: '%'}});
                forDeal.remainingTime = $.extend({}, forDeal.remainingTime, {seconds: Math.floor(Math.random() * 50) + 1});

                this.deals.push(forDeal);
            }
        }


    };
    controller.initialize();
};

module.exports = DealView_type_all;
