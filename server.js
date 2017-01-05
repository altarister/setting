'use strict';

var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var app = express();
var useragent = require('express-useragent');
var index = require('./server/memebox/routes/index');
var service = 'memebox';
var bodyParser = require('body-parser');


//hbs.register/////////////////////////
var blocks = {};

hbs.registerPartials(__dirname + '/views/'+service+'/layouts');
hbs.registerPartials(__dirname + '/views/'+service);
hbs.registerPartials(__dirname + '/views/common/');
hbs.registerPartials(__dirname + '/package');

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];

    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    blocks[name] = [];
    return val;
});

var helper = require('./package/handlebars-helpers/json');
hbs.registerHelper('json', function(context) {
    return helper(context);
});

var formatNumber = require('./package/handlebars-helpers/formatNumber');
hbs.registerHelper('formatNumber', function(context) {
    return formatNumber(context);
});


//express.register/////////////////////////
app.engine('html', require('hbs').__express);
app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(useragent.express());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/views'));
app.use(express.static(__dirname +'/package'));



// home //////////////////////////////////////////////////
app.use('/', index.page.home);

// 회원 가입 //////////////////////////////////////////////////
app.use('/member/signUp/howToJoin', index.page.howToJoin);
app.use('/member/signUp/acceptTerms', index.page.acceptTerms);
app.use('/member/signUp/enterUserInformation', index.page.enterUserInformation);
app.use('/member/signUp/SignedUp', index.page.SignedUp);

// 검색 //////////////////////////////////////////////////
app.use('/search/index', index.page.search_index);
app.use('/search/result', index.page.search_result);

//상품 상세 //////////////////////////////////////////////////
app.use('/product', index.page.product);

//장바구니 //////////////////////////////////////////////////
app.use('/cart', index.page.cart);

//주문서 //////////////////////////////////////////////////
app.use('/order', index.page.order);

//ETC //////////////////////////////////////////////////
app.use('/dealAll/dealAll', index.page.dealAll);
app.use('/dealAll/dealAll_export', index.page.dealAll_export);

app.listen(5000);