define(function() { return webpackJsonp([8],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var utility = __webpack_require__(2);
	var Menu = __webpack_require__(3);
	var SampleDealAPI = __webpack_require__(26);
	var DealContainer = __webpack_require__(27);

	__webpack_require__(73);

	var SearchResult = function SearchResult() {
	    var controller = {

	        element: '#memebox-service',
	        ui: {
	            dealContainer: '.deal-container'
	        },

	        deals: null,

	        initialize: function initialize() {
	            new Menu();
	            utility.uiEnhancements.call(this);

	            this.ui.dealContainer.each(function (index, element) {
	                var $element = $(element);
	                var viewData = $element.data('container-view-type');
	                var lineAmount = Number($element.data('container-lineAmount'));
	                if (viewData) {
	                    var API = new SampleDealAPI(viewData);

	                    console.log('lineAmount', lineAmount);
	                    new DealContainer($element, lineAmount, API.get());
	                }
	            });
	        }
	    };
	    controller.initialize();
	};

	module.exports = SearchResult;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports) {

	'use strict';

	var SampleDealAPI = function SampleDealAPI(viewData) {
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
	                type: 'vertical', //horizontal, vertical
	                expression: 10
	            },
	            name: {
	                main: '[없었던일로] 마음껏 먹고 없었던일로! 체지방, 이제 없었던 일로 하세요!',
	                sub: '체지방, 이제 없었던 일로 하세요!'
	            },
	            badge: 'badge', // 같은거. sticker
	            sticker: 'freebie',
	            remainingTime: {
	                seconds: 3610
	            },
	            review: {
	                average: 50, // 별점
	                count: 50
	            },
	            ranking: 1,
	            sold: {
	                out: false,
	                soon: null //품절임박
	            },
	            delivery: { // 테그
	                isFree: true,
	                condition: null, //'조건부무료배송',
	                method: '미미배송', //null,//
	                price: { info: '', value: '25,000', unit: '원' }
	            },
	            poke: {
	                id: 'zzimCheck506935'
	            },
	            link: 'http://www.coupang.com/deal.pang?coupang=61130860',
	            image: {
	                type: 'square', //circle, wide, square
	                basic: '/components/deal/v.1.0.0/mobile/_images/_image_square_basic.png',
	                error: '/components/deal/v.1.0.0/mobile/_images/_image_square_error.gif',
	                src: 'http://img2.memebox.com/static/contents/img/upload/image_20150706134341_2m0D5I3Z7M.jpg',
	                size: {
	                    width: 200,
	                    height: 200
	                }
	            },
	            price: {
	                discount: { info: '최대', value: '50', unit: '%' }, //최대 미미가격
	                origin: { info: '', value: '32,000', unit: '원' },
	                result: { info: '미미가격', value: '16,000', unit: '원', from: '~' }
	            },
	            option: {
	                MaximumPurchaseQuantity: 10,
	                basicProduct: '#EX400 문라이즈',
	                products: [{
	                    id: 'i1',
	                    name: '나이키 ',
	                    category: {
	                        type: { title: '상품명', value: '에어', price: '11,000' },
	                        color: { title: '색상', value: 'red' },
	                        size: { title: '사이즈', value: '220' }
	                    },
	                    stock: 30
	                }, {
	                    id: 'i2',
	                    name: '나이키 ',
	                    category: {
	                        type: { title: '상품명', value: '에어', price: '11,000' },
	                        color: { title: '색상', value: 'black' },
	                        size: { title: '사이즈', value: '230' }
	                    },
	                    stock: 30
	                }, {
	                    id: 'i3',
	                    name: '나이키 ',
	                    category: {
	                        type: { title: '상품명', value: '에어', price: '11,000' },
	                        color: { title: '색상', value: 'blue' },
	                        size: { title: '사이즈', value: '220' }
	                    },
	                    stock: 30
	                }, {
	                    id: 'i4',
	                    name: '나이키 ',
	                    category: {
	                        type: { title: '상품명', value: '에어', price: '11,000' },
	                        color: { title: '색상', value: 'blue' },
	                        size: { title: '사이즈', value: '230' }
	                    },
	                    stock: 30
	                }, {
	                    id: 'i5',
	                    name: '나이키 ',
	                    category: {
	                        type: { title: '상품명', value: '조던', price: '12,000' },
	                        color: { title: '색상', value: 'red' },
	                        size: { title: '사이즈', value: '220' }
	                    },
	                    stock: 30
	                }, {
	                    id: 'i6',
	                    name: '나이키 ',
	                    category: {
	                        type: { title: '상품명', value: '조던', price: '12,000' },
	                        color: { title: '색상', value: 'red' },
	                        size: { title: '사이즈', value: '230' }
	                    },
	                    stock: 30
	                }, {
	                    id: 'i7',
	                    name: '나이키 ',
	                    category: {
	                        type: { title: '상품명', value: '조던', price: '12,000' },
	                        color: { title: '색상', value: 'blue' },
	                        size: { title: '사이즈', value: '220' }
	                    },
	                    stock: 30
	                }, {
	                    id: 'i8',
	                    name: '나이키 ',
	                    category: {
	                        type: { title: '상품명', value: '조던', price: '12,000' },
	                        color: { title: '색상', value: 'blue' },
	                        size: { title: '사이즈', value: '230' }
	                    },
	                    stock: 30
	                }],
	                additionItem: [{
	                    id: 'i4',
	                    name: '나이키 신발끈',
	                    category: {
	                        type: { title: '상품명', value: '신발끈', price: '12,000' }
	                    },
	                    stock: 30
	                }]
	            },
	            tracking: {
	                analytics: {
	                    target: 'track',
	                    name: 'Product Clicked',
	                    data: {
	                        id: 'product_id', // Product ID
	                        name: 'product_name', // Product Name
	                        brand: 'product_brand', // Product Brand
	                        position: 'product_position', // Product Position
	                        list: 'product_list', // Product List
	                        currency: 'KRW', // Currency: Korean Won
	                        price: 'product_price', // Product Price
	                        label: 'product_name' // Product Name
	                    }
	                },
	                ga: { dealId: 'tempID4' }
	            }
	        },
	        images: ['https://img1.memebox.com/cwxhija3/contents/img/memeboxProductItem/20161007044103_d9a89db2f80151988b380a3af833c706.jpg', 'https://img1.memebox.com/3uqvc4to/contents/img/memeboxProductItem/20161115103443_eae03a379a2daeb8e71be12e7ec67dba.jpg', 'https://img1.memebox.com/c2jq97q2/contents/img/memeboxProductItem/20161111052448_a60d63f5a0ade3646d6aa950cc132e3e.jpg', 'https://img1.memebox.com/v6uciugt/contents/img/memeboxProductItem/20161114081753_c47132518d9a1eaf6f7c15eb7bbf7ba2.jpg', 'https://img1.memebox.com/a70vqlis/contents/img/memeboxProductItem/20161114043824_52a43af20a8ad9190b7aef3793608d79.jpg'],

	        wideImg: ["https://img2.memebox.com/static/contents/img/upload/image_20160518211225_b3VcRp7GzN.jpg",
	        // "https://img1.memebox.com/72gfsdk0/contents/img/memeboxProductItem/20161020043220_930526a3bd0a25d11ca0f2a1a499dd4f.jpg",
	        'https://img1.memebox.com/a70vqlis/contents/img/memeboxProductItem/20161114043824_52a43af20a8ad9190b7aef3793608d79.jpg', "https://img1.memebox.com/z0uovgml/contents/img/memeboxProductItem/20161011020338_ee3dcef775880ff08c8e5a0a6cd198f5.jpg",
	        //"https://img1.memebox.com/uphu35f8/contents/img/memeboxProductItem/20161108055135_1a2ed3ce8ccd02052ce6d7db53571689.jpg",
	        "https://img1.memebox.com/72gfsdk0/contents/img/memeboxProductItem/error.jpg", "https://img1.memebox.com/lahnslxd/contents/img/memeboxProductItem/20161114101656_4f39cb7f88f79f1f8cd22cac23e2d4a3.jpg"],

	        viewType: [{
	            view: {
	                type: 'vertical', //horizontal, vertical
	                expression: 4
	            },
	            image: {
	                type: 'circle' //circle, wide, square
	            }
	        }, {
	            view: {
	                type: 'vertical', //horizontal, vertical
	                expression: 2
	            },
	            image: {
	                type: 'wide' //circle, wide, square
	            }
	        }, {
	            view: {
	                type: 'horizontal', //horizontal, vertical
	                expression: 10
	            },
	            image: {
	                type: 'square' //circle, wide, square
	            }
	        }, {
	            view: {
	                type: 'vertical', //horizontal, vertical
	                expression: 10
	            },
	            image: {
	                type: 'square' //circle, wide, square
	            }
	        }, {
	            view: {
	                type: 'vertical', //horizontal, vertical
	                expression: 4
	            },
	            image: {
	                type: 'square' //circle, wide, square
	            }
	        }],

	        initialize: function initialize() {
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

	        set: function set(viewData) {
	            console.log('-----------------', viewData);
	            this.deals = [];
	            for (var index in this.images) {
	                var forDeal = $.extend({}, this.deal);
	                forDeal.id = 'dealId' + index;
	                forDeal.view = viewData.view;

	                if (index < 4) {
	                    forDeal.ranking = Number(index) + 1;
	                } else {
	                    forDeal.ranking = null;
	                }
	                if (index == 3) {
	                    forDeal.sold = $.extend({}, forDeal.sold, { out: true, soon: null });
	                }
	                if (index == 4) {
	                    forDeal.sold = $.extend({}, forDeal.sold, { out: false, soon: '품절임박입니다.' });
	                }
	                if (index > 2) {
	                    forDeal.price = $.extend({}, forDeal.price, { discount: { info: null, value: null, unit: null } });
	                } else {
	                    forDeal.price = $.extend({}, forDeal.price, { discount: { info: '최대', value: index, unit: '%' } });
	                }
	                if (index > 1) {
	                    forDeal.remainingTime = $.extend({}, forDeal.remainingTime, { seconds: null });
	                } else {
	                    forDeal.remainingTime = $.extend({}, forDeal.remainingTime, { seconds: Math.floor(Math.random() * 5) + 1 });
	                }

	                if (index == 1) {
	                    forDeal.delivery = $.extend({}, forDeal.method, { isFree: true, condition: null, method: null });
	                } else if (index == 3) {
	                    forDeal.delivery = $.extend({}, forDeal.method, { isFree: true, condition: '조건부무료배송', method: '미미배송' });
	                } else if (index == 2) {
	                    forDeal.delivery = $.extend({}, forDeal.method, { isFree: true, condition: '조건부무료배송', method: null });
	                } else {
	                    forDeal.delivery = $.extend({}, forDeal.method, { isFree: true, condition: null, method: '미미배송' });
	                }

	                if (viewData.image.type === 'wide') {
	                    forDeal.image = $.extend({}, forDeal.image, {
	                        type: viewData.image.type,
	                        src: this.wideImg[index],
	                        basic: '/components/deal/v.1.0.0/mobile/_images/_image_wide_basic.png',
	                        error: '/components/deal/v.1.0.0/mobile/_images/_image_wide_error.gif'
	                    });
	                    //forDeal.image = $.extend({}, forDeal.image, { type: imageType, src: this.images[index]});
	                } else {
	                    forDeal.image = $.extend({}, forDeal.image, {
	                        type: viewData.image.type,
	                        src: this.images[index],
	                        basic: '/components/deal/v.1.0.0/mobile/_images/_image_square_basic.png',
	                        error: '/components/deal/v.1.0.0/mobile/_images/_image_square_error.gif'
	                    });
	                }

	                this.deals.push(forDeal);
	            }
	        },

	        get: function get() {
	            return this.deals;
	        }
	    };

	    controller.initialize();

	    return controller;
	};

	module.exports = SampleDealAPI;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var utility = __webpack_require__(2);
	var Deal = __webpack_require__(28);
	var DealInlineGallery = __webpack_require__(44);
	var DealTooltipFloating = __webpack_require__(48);

	__webpack_require__(50);

	var dealContainer_templates = {
	    dealList: __webpack_require__(51),
	    dealWrapper: __webpack_require__(52)
	};

	var DealContainer = function DealContainer($element, lineAmount, deals) {
	    var controller = {

	        viewData: {
	            lineAmount: lineAmount
	        },

	        initialize: function initialize() {
	            console.log($element, lineAmount, deals);

	            this.remainingTimeController();
	            this.makeDealList();
	        },

	        makeDealList: function makeDealList() {
	            var $ul = $(dealContainer_templates.dealList(this.viewData));

	            $element.append($ul);
	            this.addDealListItem($ul);
	            this.addFunction();
	        },

	        addDealListItem: function addDealListItem($ul) {
	            var $li, deal;

	            for (var index in deals) {
	                deal = new Deal(deals[index]);
	                $li = $('<li class="memebox-deal-wrapper">').append(deal.getDealString());
	                $ul.append($li);
	            }
	        },

	        addFunction: function addFunction() {
	            var dealFunction = $element.data('deal-function');

	            if (dealFunction) {
	                if (dealFunction.easyChoiceOption) new DealTooltipFloating($element, dealFunction.easyChoiceOption, deals, 'memebox');
	                if (dealFunction.dealInlineGallery) new DealInlineGallery($element, dealFunction.dealInlineGallery, deals, 'memebox');
	            }
	        },

	        remainingTimeController: function remainingTimeController() {
	            if (window.deal_RemainingTimeInterval) return;
	            window.deal_RemainingTimeInterval = setInterval(function () {
	                $.publish('deal.remainingTime');
	            }, 1000);
	        },

	        eventListener: function eventListener() {
	            $.subscribe('deal.easyChoiceOption.open', $.proxy(this.displayDealEasyChoiceOption, this));
	        }
	    };

	    controller.initialize();
	};

	module.exports = DealContainer;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var utility = __webpack_require__(2);

	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);

	__webpack_require__(34);

	var deal_templates = {
	    layout: __webpack_require__(35),
	    image: __webpack_require__(36),
	    name: __webpack_require__(37),
	    price: __webpack_require__(38),
	    status: __webpack_require__(39),
	    delivery: __webpack_require__(40),
	    poke: __webpack_require__(41),
	    out: __webpack_require__(42),
	    link: __webpack_require__(43)
	};

	var Deal = function Deal(deal, trackFunction) {
	    var controller = {

	        element: null,
	        ui: {
	            info: '.memebox-deal-info',
	            timer: '.memebox-deal-timer-value',
	            poke: '.memebox-deal-poke',
	            link: '.memebox-deal-link',
	            dealImageWrap: '.memebox-deal-image-wrap',
	            dealImage: '.memebox-deal-image'
	        },

	        currentRemainingTime: deal.remainingTime.seconds,

	        initialize: function initialize() {
	            this.makeDealElement(deal);
	            utility.uiEnhancements.call(this);
	            this.eventListener();
	        },

	        makeDealElement: function makeDealElement(deal) {
	            var template = '';

	            template += deal_templates.image(deal);
	            template += deal_templates.name(deal);
	            template += deal_templates.price(deal.price);
	            template += deal_templates.status(deal);
	            template += deal_templates.delivery(deal);
	            if (deal.sold.out) {
	                template += deal_templates.out(deal);
	            } else {
	                template += deal_templates.link(deal);
	            }
	            template += deal_templates.poke(deal);

	            this.element = $(deal_templates.layout(deal));
	            this.element.find(this.ui.info).append(template);
	        },

	        eventListener: function eventListener() {
	            this.ui.dealImage.on('load', $.proxy(this.defaultImageLoadEvent, this));

	            if (this.currentRemainingTime) {
	                if (window.deal_RemainingTimeInterval) {
	                    $.subscribe('deal.remainingTime', $.proxy(this.remainingTimeEvent, this));
	                } else {
	                    this.setTimer(deal.remainingTime.seconds);
	                }
	            }

	            $(window).resize(function () {
	                controller.setImageSize();
	            });

	            this.element.off().on('click', this.ui.__uiString.link, $.proxy(this.linkEvent, this));
	        },

	        defaultImageLoadEvent: function defaultImageLoadEvent() {
	            this.ui.dealImage.off().on('error', $.proxy(this.errorImageLoadEvent, this)).attr('src', deal.image.src);
	            this.setImageSize();
	        },

	        setImageSize: function setImageSize() {
	            var imageWrapWidth = this.ui.dealImageWrap.width();
	            var imageWidth = imageWrapWidth;
	            var imageHeight = imageWrapWidth;

	            if (deal.image.type === 'wide') {
	                imageWidth = 'auto';
	                imageHeight = imageWrapWidth / 2;
	            }
	            this.ui.dealImage.css({
	                width: imageWidth,
	                height: imageHeight
	            });
	        },

	        errorImageLoadEvent: function errorImageLoadEvent(event) {
	            this.ui.dealImage.off().attr('src', deal.image.error);
	        },

	        //클릭전에 tracking 코드 실행
	        linkEvent: function linkEvent(event) {
	            if (event.isDefaultPrevented()) {
	                tracking.analytics.track(deal.tracking.analytics);
	            } else {
	                if (typeof trackFunction === 'function') {
	                    trackFunction(deal.tracking.analytics);
	                }
	            }
	            return true;
	        },

	        remainingTimeEvent: function remainingTimeEvent() {
	            if (this.currentRemainingTime >= 0) {
	                this.displayTimer(this.currentRemainingTime--);
	            }
	        },

	        setTimer: function setTimer(remainingTime) {
	            var timer = setInterval(function () {
	                controller.displayTimer(remainingTime--);

	                if (remainingTime < 0) {
	                    clearInterval(timer);
	                }
	            }, 1000);
	            this.displayTimer(remainingTime);
	        },

	        displayTimer: function displayTimer(remainingTime) {
	            var hour = parseInt(remainingTime / 60 / 60, 10);
	            var minutes = parseInt(remainingTime / 60 % 60, 10);
	            var seconds = parseInt(remainingTime % 60, 10);

	            hour = hour < 10 ? "0" + hour : hour;
	            minutes = minutes < 10 ? "0" + minutes : minutes;
	            seconds = seconds < 10 ? "0" + seconds : seconds;

	            controller.ui.timer.text(hour + ":" + minutes + ":" + seconds);
	        },

	        getDealString: function getDealString() {
	            return this.element;
	        }
	    };

	    controller.initialize();

	    return controller;
	};

	module.exports = Deal;

/***/ },
/* 29 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"deal_type_horizontal_square_10":"deal_type_horizontal_square_10","memebox-deal-image-wrap":"memebox-deal-image-wrap","memebox-deal-timer":"memebox-deal-timer","memebox-deal-timer-value":"memebox-deal-timer-value","memebox-deal-ranking":"memebox-deal-ranking","memebox-deal-sticker":"memebox-deal-sticker","memebox-deal-image":"memebox-deal-image","memebox-deal-name":"memebox-deal-name","memebox-deal-name-main":"memebox-deal-name-main","memebox-deal-name-sub":"memebox-deal-name-sub","memebox-deal-current-status":"memebox-deal-current-status","memebox-deal-review-star":"memebox-deal-review-star","memebox-deal-review-star-value":"memebox-deal-review-star-value","memebox-deal-review-average":"memebox-deal-review-average","memebox-deal-review-count":"memebox-deal-review-count","memebox-deal-sold-out":"memebox-deal-sold-out","memebox-deal-price-wrap":"memebox-deal-price-wrap","memebox-deal-price-discount":"memebox-deal-price-discount","memebox-deal-price-origin":"memebox-deal-price-origin","memebox-deal-price-info":"memebox-deal-price-info","memebox-deal-price-value":"memebox-deal-price-value","memebox-deal-price-unit":"memebox-deal-price-unit","memebox-deal-price-from":"memebox-deal-price-from","memebox-deal-price-result":"memebox-deal-price-result","memebox-deal-delivery":"memebox-deal-delivery","memebox-deal-delivery-shipping":"memebox-deal-delivery-shipping","memebox-deal-delivery-type":"memebox-deal-delivery-type","memebox-deal-link":"memebox-deal-link","memebox-deal-sell-stop":"memebox-deal-sell-stop","memebox-deal-poke-wrap":"memebox-deal-poke-wrap","memebox-deal-poke-checked":"memebox-deal-poke-checked"};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"deal_type_vertical_circle_4":"deal_type_vertical_circle_4","memebox-deal-image-wrap":"memebox-deal-image-wrap","memebox-deal-timer":"memebox-deal-timer","memebox-deal-timer-value":"memebox-deal-timer-value","memebox-deal-ranking":"memebox-deal-ranking","memebox-deal-image":"memebox-deal-image","memebox-deal-sticker":"memebox-deal-sticker","memebox-deal-name":"memebox-deal-name","memebox-deal-name-main":"memebox-deal-name-main","memebox-deal-name-sub":"memebox-deal-name-sub","memebox-deal-current-status":"memebox-deal-current-status","memebox-deal-review-star":"memebox-deal-review-star","memebox-deal-review-star-value":"memebox-deal-review-star-value","memebox-deal-review-average":"memebox-deal-review-average","memebox-deal-review-count":"memebox-deal-review-count","memebox-deal-sold-out":"memebox-deal-sold-out","memebox-deal-price-wrap":"memebox-deal-price-wrap","memebox-deal-price-discount":"memebox-deal-price-discount","memebox-deal-price-origin":"memebox-deal-price-origin","memebox-deal-price-info":"memebox-deal-price-info","memebox-deal-price-value":"memebox-deal-price-value","memebox-deal-price-unit":"memebox-deal-price-unit","memebox-deal-price-from":"memebox-deal-price-from","memebox-deal-price-result":"memebox-deal-price-result","memebox-deal-delivery":"memebox-deal-delivery","memebox-deal-delivery-shipping":"memebox-deal-delivery-shipping","memebox-deal-info":"memebox-deal-info","memebox-deal-link":"memebox-deal-link","memebox-deal-poke-wrap":"memebox-deal-poke-wrap","memebox-deal-poke":"memebox-deal-poke","memebox-deal-poke-checked":"memebox-deal-poke-checked"};

/***/ },
/* 31 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"deal_type_vertical_square_4":"deal_type_vertical_square_4","memebox-deal-image-wrap":"memebox-deal-image-wrap","memebox-deal-timer":"memebox-deal-timer","memebox-deal-timer-value":"memebox-deal-timer-value","memebox-deal-ranking":"memebox-deal-ranking","memebox-deal-image":"memebox-deal-image","memebox-deal-sticker":"memebox-deal-sticker","memebox-deal-name":"memebox-deal-name","memebox-deal-name-main":"memebox-deal-name-main","memebox-deal-name-sub":"memebox-deal-name-sub","memebox-deal-current-status":"memebox-deal-current-status","memebox-deal-review-star":"memebox-deal-review-star","memebox-deal-review-star-value":"memebox-deal-review-star-value","memebox-deal-review-average":"memebox-deal-review-average","memebox-deal-review-count":"memebox-deal-review-count","memebox-deal-sold-out":"memebox-deal-sold-out","memebox-deal-price-wrap":"memebox-deal-price-wrap","memebox-deal-price-discount":"memebox-deal-price-discount","memebox-deal-price-unit":"memebox-deal-price-unit","memebox-deal-price-origin":"memebox-deal-price-origin","memebox-deal-price-result":"memebox-deal-price-result","memebox-deal-price-info":"memebox-deal-price-info","memebox-deal-delivery":"memebox-deal-delivery","memebox-deal-delivery-shipping":"memebox-deal-delivery-shipping","memebox-deal-info":"memebox-deal-info","memebox-deal-link":"memebox-deal-link","memebox-deal-poke-wrap":"memebox-deal-poke-wrap","memebox-deal-sell-stop":"memebox-deal-sell-stop","memebox-deal-poke":"memebox-deal-poke","memebox-deal-poke-checked":"memebox-deal-poke-checked"};

/***/ },
/* 32 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"deal_type_vertical_square_10":"deal_type_vertical_square_10","memebox-deal-image-wrap":"memebox-deal-image-wrap","memebox-deal-timer":"memebox-deal-timer","memebox-deal-timer-value":"memebox-deal-timer-value","memebox-deal-ranking":"memebox-deal-ranking","memebox-deal-sticker":"memebox-deal-sticker","memebox-deal-image":"memebox-deal-image","memebox-deal-name-main":"memebox-deal-name-main","memebox-deal-name-sub":"memebox-deal-name-sub","memebox-deal-current-status":"memebox-deal-current-status","memebox-deal-review-star":"memebox-deal-review-star","memebox-deal-review-star-value":"memebox-deal-review-star-value","memebox-deal-review-average":"memebox-deal-review-average","memebox-deal-review-count":"memebox-deal-review-count","memebox-deal-sold-out":"memebox-deal-sold-out","memebox-deal-price-wrap":"memebox-deal-price-wrap","memebox-deal-price-discount":"memebox-deal-price-discount","memebox-deal-price-origin":"memebox-deal-price-origin","memebox-deal-price-info":"memebox-deal-price-info","memebox-deal-price-value":"memebox-deal-price-value","memebox-deal-price-unit":"memebox-deal-price-unit","memebox-deal-price-from":"memebox-deal-price-from","memebox-deal-price-result":"memebox-deal-price-result","memebox-deal-delivery":"memebox-deal-delivery","memebox-deal-delivery-shipping":"memebox-deal-delivery-shipping","memebox-deal-delivery-type":"memebox-deal-delivery-type","memebox-deal-info":"memebox-deal-info","memebox-deal-link":"memebox-deal-link","memebox-deal-sell-stop":"memebox-deal-sell-stop","memebox-deal-poke-wrap":"memebox-deal-poke-wrap","memebox-deal-poke":"memebox-deal-poke","memebox-deal-poke-checked":"memebox-deal-poke-checked"};

/***/ },
/* 33 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"deal_type_vertical_wide_2":"deal_type_vertical_wide_2","memebox-deal-image-wrap":"memebox-deal-image-wrap","memebox-deal-timer":"memebox-deal-timer","memebox-deal-timer-value":"memebox-deal-timer-value","memebox-deal-ranking":"memebox-deal-ranking","memebox-deal-image":"memebox-deal-image","memebox-deal-sticker":"memebox-deal-sticker","memebox-deal-name-main":"memebox-deal-name-main","memebox-deal-name-sub":"memebox-deal-name-sub","memebox-deal-current-status":"memebox-deal-current-status","memebox-deal-review-star":"memebox-deal-review-star","memebox-deal-review-star-value":"memebox-deal-review-star-value","memebox-deal-review-average":"memebox-deal-review-average","memebox-deal-review-count":"memebox-deal-review-count","memebox-deal-sold-out":"memebox-deal-sold-out","memebox-deal-price-wrap":"memebox-deal-price-wrap","memebox-deal-delivery":"memebox-deal-delivery","memebox-deal-delivery-shipping":"memebox-deal-delivery-shipping","memebox-deal-info":"memebox-deal-info","memebox-deal-link":"memebox-deal-link","memebox-deal-poke-wrap":"memebox-deal-poke-wrap","memebox-deal-poke":"memebox-deal-poke","memebox-deal-poke-checked":"memebox-deal-poke-checked"};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"memebox-deal-sticker":"memebox-deal-sticker","sticker-none":"sticker-none","sticker-hot":"sticker-hot","sticker-md":"sticker-md","sticker-memebox":"sticker-memebox","sticker-best":"sticker-best","sticker-new":"sticker-new","sticker-threeTime":"sticker-threeTime","sticker-lowest":"sticker-lowest","sticker-freebie":"sticker-freebie","sticker-refund90":"sticker-refund90","sticker-lowest90":"sticker-lowest90","sticker-sale369":"sticker-sale369","sticker-promotion":"sticker-promotion","sticker-soldOutSoon":"sticker-soldOutSoon","sticker-deal_0":"sticker-deal_0","sticker-deal_100":"sticker-deal_100","sticker-reservation":"sticker-reservation"};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

	  return "<div id=\""
	    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
	    + "\" class=\"memebox-deal deal_type_"
	    + alias1(alias2(((stack1 = (depth0 != null ? depth0.view : depth0)) != null ? stack1.type : stack1), depth0))
	    + "_"
	    + alias1(alias2(((stack1 = (depth0 != null ? depth0.image : depth0)) != null ? stack1.type : stack1), depth0))
	    + "_"
	    + alias1(alias2(((stack1 = (depth0 != null ? depth0.view : depth0)) != null ? stack1.expression : stack1), depth0))
	    + "\">\n    <div class=\"memebox-deal-info\">\n    </div>\n</div>";
	},"useData":true});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "        <span class=\"memebox-deal-timer\">\n            <span class=\"memebox-deal-timer-value\" data-remainingTime=\""
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.remainingTime : depth0)) != null ? stack1.seconds : stack1), depth0))
	    + "\"></span>\n        </span>\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    var helper;

	  return "        <span class=\"memebox-deal-ranking\">"
	    + container.escapeExpression(((helper = (helper = helpers.ranking || (depth0 != null ? depth0.ranking : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"ranking","hash":{},"data":data}) : helper)))
	    + "</span>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

	  return "<div class=\"memebox-deal-image-wrap\">\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.remainingTime : depth0)) != null ? stack1.seconds : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    <span class=\"memebox-deal-sticker sticker-"
	    + alias4(((helper = (helper = helpers.sticker || (depth0 != null ? depth0.sticker : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sticker","hash":{},"data":data}) : helper)))
	    + "\"></span>\n    <span class=\"memebox-deal-badge badge-"
	    + alias4(((helper = (helper = helpers.badge || (depth0 != null ? depth0.badge : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"badge","hash":{},"data":data}) : helper)))
	    + "\"></span>\n"
	    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.ranking : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    <img class=\"memebox-deal-image\" src=\""
	    + alias4(alias5(((stack1 = (depth0 != null ? depth0.image : depth0)) != null ? stack1.basic : stack1), depth0))
	    + "\" alt=\""
	    + alias4(alias5(((stack1 = (depth0 != null ? depth0.name : depth0)) != null ? stack1.main : stack1), depth0))
	    + "\"/>\n</div>";
	},"useData":true});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

	  return "<div class=\"memebox-deal-name\">\n   <strong class=\"memebox-deal-name-main\">"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.name : depth0)) != null ? stack1.main : stack1), depth0))
	    + "</strong>\n   <em class=\"memebox-deal-name-sub\">"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.name : depth0)) != null ? stack1.sub : stack1), depth0))
	    + "</em>\n</div>";
	},"useData":true});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

	  return "        <strong class=\"memebox-deal-price-discount\">\n            <span class=\"memebox-deal-price-info\">"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.discount : depth0)) != null ? stack1.info : stack1), depth0))
	    + "</span>\n            <strong class=\"memebox-deal-price-value\">"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.discount : depth0)) != null ? stack1.value : stack1), depth0))
	    + "</strong><!--\n            --><em class=\"memebox-deal-price-unit\">"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.discount : depth0)) != null ? stack1.unit : stack1), depth0))
	    + "</em>\n        </strong>\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    return "";
	},"5":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "            <span class=\"memebox-deal-price-info\">"
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.info : stack1), depth0))
	    + "</span>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=container.lambda, alias3=container.escapeExpression;

	  return "<p class=\"memebox-deal-price-wrap\">\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.discount : depth0)) != null ? stack1.value : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    <strong class=\"memebox-deal-price-origin\">\n        <span class=\"memebox-deal-price-info\">"
	    + alias3(alias2(((stack1 = (depth0 != null ? depth0.origin : depth0)) != null ? stack1.info : stack1), depth0))
	    + "</span>\n        <strong class=\"memebox-deal-price-value\">"
	    + alias3(alias2(((stack1 = (depth0 != null ? depth0.origin : depth0)) != null ? stack1.value : stack1), depth0))
	    + "</strong><!--\n        --><em class=\"memebox-deal-price-unit\">"
	    + alias3(alias2(((stack1 = (depth0 != null ? depth0.origin : depth0)) != null ? stack1.unit : stack1), depth0))
	    + "</em>\n    </strong>\n    <strong class=\"memebox-deal-price-result\">\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.discount : depth0)) != null ? stack1.value : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
	    + "        <strong class=\"memebox-deal-price-value\">"
	    + alias3(alias2(((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.value : stack1), depth0))
	    + "</strong><!--\n        --><em class=\"memebox-deal-price-unit\">"
	    + alias3(alias2(((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.unit : stack1), depth0))
	    + "</em><!--\n        --><span class=\"memebox-deal-price-from\">"
	    + alias3(alias2(((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.from : stack1), depth0))
	    + "</span>\n    </strong>\n</p>";
	},"useData":true});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "    <span class=\"memebox-deal-sold-out\">"
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.sold : depth0)) != null ? stack1.soon : stack1), depth0))
	    + "</span>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

	  return "<div class=\"memebox-deal-current-status\">\n    <span class=\"memebox-deal-review-star\">\n        <span class=\"memebox-deal-review-star-value\" style=\"width:"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.average : stack1), depth0))
	    + "%;\"></span>\n    </span>\n    <strong class=\"memebox-deal-review-average\">\n        <span class=\"memebox-deal-review-average-value\">"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.average : stack1), depth0))
	    + "</span>점\n    </strong>\n    <em class=\"memebox-deal-review-count\">\n        리뷰 <span class=\"memebox-deal-review-count-value\">"
	    + alias2(alias1(((stack1 = (depth0 != null ? depth0.review : depth0)) != null ? stack1.count : stack1), depth0))
	    + "</span>\n    </em>\n"
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.sold : depth0)) != null ? stack1.soon : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</div>";
	},"useData":true});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "        <span class=\"memebox-deal-delivery-shipping\">"
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.delivery : depth0)) != null ? stack1.condition : stack1), depth0))
	    + "</span>\n";
	},"3":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "        <span class=\"memebox-deal-delivery-type\">"
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.delivery : depth0)) != null ? stack1.method : stack1), depth0))
	    + "</span>\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};

	  return "<div class=\"memebox-deal-delivery\">\n"
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.delivery : depth0)) != null ? stack1.condition : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.delivery : depth0)) != null ? stack1.method : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "</div>";
	},"useData":true});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "<div class=\"memebox-deal-poke-wrap\">\n   <span id=\""
	    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.poke : depth0)) != null ? stack1.id : stack1), depth0))
	    + "\" class=\"memebox-deal-poke-checked\">이 상품을 찜했습니다.</span>\n   <button class=\"memebox-deal-poke\">찜하기</button>\n</div>";
	},"useData":true});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<span class=\"memebox-deal-sell-stop\">\n           \n</span>";
	},"useData":true});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
	    var stack1, alias1=depth0 != null ? depth0 : {};

	  return ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.tracking : depth0)) != null ? stack1.ga : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.tracking : depth0)) != null ? stack1.analytics : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + "    ";
	},"2":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "            data-ga='"
	    + container.escapeExpression(__default(__webpack_require__(25)).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.tracking : depth0)) != null ? stack1.ga : stack1),{"name":"json","hash":{},"data":data}))
	    + "'\n";
	},"4":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "            data-analytics='"
	    + container.escapeExpression(__default(__webpack_require__(25)).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.tracking : depth0)) != null ? stack1.analytics : stack1),{"name":"json","hash":{},"data":data}))
	    + "'\n";
	},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var stack1;

	  return "<a class=\"memebox-deal-link\"\n   href=\""
	    + container.escapeExpression(container.lambda((depth0 != null ? depth0.link : depth0), depth0))
	    + "\"\n"
	    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.tracking : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
	    + ">\n   바로가기\n</a>";
	},"useData":true});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var utility = __webpack_require__(2);
	var slick = __webpack_require__(45);

	__webpack_require__(46);

	var dealInlineGallery_templates = {
	    title: __webpack_require__(47)
	};

	var DealInlineGallery = function DealInlineGallery(element, viewData, deals) {
	    var controller = {
	        element: element,
	        ui: {
	            dealList: '.memebox-deal-list',
	            dealWrapper: '.memebox-deal-wrapper'
	        },

	        viewData: {
	            className: 'deal-inline-gallery',
	            title: '상품',
	            total: 1,
	            current: 1,
	            lineAmount: 1,
	            dealLength: null,
	            dealWrapperWidth: null,
	            defaultPosition: -10
	        },

	        initialize: function initialize() {
	            utility.uiEnhancements.call(this);
	            this.setViewData();
	            this.makeInlineGallery();
	            this.setSlick();
	        },

	        setViewData: function setViewData() {
	            if (viewData) {
	                this.viewData.className = viewData.className;
	                this.viewData.title = viewData.title;
	                this.viewData.lineAmount = viewData.lineAmount;
	                this.viewData.total = Math.ceil(deals.length / viewData.lineAmount);
	            }
	        },

	        makeInlineGallery: function makeInlineGallery() {
	            var templates = '';
	            var containerWidth = this.element.width();

	            this.ui.dealList.append('<li></li>');
	            this.element.width(containerWidth + 50);

	            templates += dealInlineGallery_templates.title(this.viewData);
	            this.element.prepend(templates);
	        },

	        setSlick: function setSlick() {
	            this.ui.dealList.slick({
	                arrows: false,
	                dots: false,
	                infinite: false,
	                slidesToShow: 3,
	                slidesToScroll: 2
	            });
	        }
	    };
	    controller.initialize();
	};
	module.exports = DealInlineGallery;

/***/ },
/* 45 */,
/* 46 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"deal-inline-gallery-wrap":"deal-inline-gallery-wrap","deal-inline-gallery-title":"deal-inline-gallery-title","deal-inline-gallery":"deal-inline-gallery","memebox-deal-wrapper":"memebox-deal-wrapper","deal-inline-gallery-navigation":"deal-inline-gallery-navigation","paging":"paging","current":"current","left":"left","right":"right","disabled":"disabled"};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var helper;

	  return "<strong class=\"deal-inline-gallery-title\">"
	    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
	    + "</strong>";
	},"useData":true});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var utility = __webpack_require__(2);

	__webpack_require__(49);

	var DealTooltipFloating = function DealTooltipFloating(element, className, deals, service) {
	    var controller = {
	        element: element,
	        ui: {},

	        lineAmount: null,

	        initialize: function initialize() {
	            utility.uiEnhancements.call(this);
	        }
	    };
	    controller.initialize();
	};

	module.exports = DealTooltipFloating;

/***/ },
/* 49 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 50 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"memebox-deal-list":"memebox-deal-list","memebox-deal-list-line-amount-1":"memebox-deal-list-line-amount-1","memebox-deal-wrapper":"memebox-deal-wrapper","memebox-deal-list-line-amount-2":"memebox-deal-list-line-amount-2","memebox-deal-list-line-amount-3":"memebox-deal-list-line-amount-3","memebox-deal-list-line-amount-4":"memebox-deal-list-line-amount-4"};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    var helper;

	  return "<ul class=\"memebox-deal-list memebox-deal-list-line-amount-"
	    + container.escapeExpression(((helper = (helper = helpers.lineAmount || (depth0 != null ? depth0.lineAmount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"lineAmount","hash":{},"data":data}) : helper)))
	    + "\">\n\n</ul>";
	},"useData":true});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<li class=\"memebox-deal-wrapper\">\n\n</li>";
	},"useData":true});

/***/ },
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
])});;