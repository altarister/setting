var $ = require('jquery');
var utility = require('utility');
var DealContainer = require('components/dealContainer/v.1.0.0/dealContainer.jsx');

require('./product.scss');

var Product = function(){
    var controller = {

        element: '#memebox-service',
        ui: {
            dealContainer: '.deal-container'
        },

        lineAmount: 2,
        deals: [],
        deal: {
            id: 'tempID4',
            view: {
                type: 'vertical',//horizontal, vertical
                expression: 4
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
                type: ''
            },
            tracking: {
                analytics: {
                    //page: {},
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
            'https://img2.memebox.com/static/contents/img/upload/image_20160419192124_EXJFkvGhdU.jpg',
            'https://img2.memebox.com/static/contents/img/upload/image_20160520122432_oa15HNiTTF.jpg',
            'https://img1.memebox.com/cwxhija3/contents/img/memeboxProductItem/20161007044103_d9a89db2f80151988b380a3af833c706.jpg',
            'https://img1.memebox.com/3uqvc4to/contents/img/memeboxProductItem/20161115103443_eae03a379a2daeb8e71be12e7ec67dba.jpg',
            'https://img1.memebox.com/c2jq97q2/contents/img/memeboxProductItem/20161111052448_a60d63f5a0ade3646d6aa950cc132e3e.jpg',
            'https://img1.memebox.com/v6uciugt/contents/img/memeboxProductItem/20161114081753_c47132518d9a1eaf6f7c15eb7bbf7ba2.jpg',
            'https://img1.memebox.com/a70vqlis/contents/img/memeboxProductItem/20161114043824_52a43af20a8ad9190b7aef3793608d79.jpg'
        ],

        initialize: function(){
            utility.uiEnhancements.call(this);
            this.setDeals();

            this.ui.dealContainer.each(function (index, element) {
                new DealContainer( $(element) ,controller.lineAmount ,controller.deals);
            });
        },

        setDeals: function(){
            for(var index in this.images){
                var forDeal = $.extend({}, this.deal);
                forDeal.id = 'dealId' + index;
                forDeal.ranking = Number(index) + 1;
                forDeal.image = $.extend({}, forDeal.image, {src : this.images[index] });
                forDeal.remainingTime = $.extend({}, forDeal.remainingTime, {seconds : Math.floor(Math.random() * 10) + 1 });
                this.deals.push( forDeal );
            }
            console.log('this.deals = ',this.deals)
        }


    };
    controller.initialize();
};

module.exports = Product;

