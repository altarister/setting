'use strict';

var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var app = express();
var ajax = require('./server/routes/ajax');
var service = 'memebox';

//hbs.register/////////////////////////



var blocks = {};

hbs.registerPartials(__dirname + '/views/'+service+'/layouts');
hbs.registerPartials(__dirname + '/views/'+service+'/pc');
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

var helper = require('./public/app/common/handlebars-helpers/json');
hbs.registerHelper('json', function(context) {
    return helper(context);
});

var formatNumber = require('./public/app/common/handlebars-helpers/formatNumber');
hbs.registerHelper('formatNumber', function(context) {
    return formatNumber(context);
});

//data.register/////////////////////////
var configData = require('./server/json/config.json');
var dealData = require('./server/json/deal.json');
var menuData = require('./server/json/menu.json');
var dealView_menuData = require('./server/json/dealView_menu.json');
var dealView_APIData = require('./server/json/dealView_API.json');

function dealview_API(){
    return dealView_APIData.data = dealData;
};

var data = {
    "config" : configData,
    "component":{
        "menu" : menuData
    }
};

//express.register/////////////////////////
app.engine('html', require('hbs').__express);
app.set('views', 'views');
app.set('view engine', 'hbs');
app.use('/dealAPI', ajax);
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/views'));

//deal page/////////////////////////
app.get('/deal', function(req, res) {
    data.config.controller = 'memebox/pc/deal/deal';
    data.config.title = 'deal';
    data.config.info.device = 'pc';
    data.config.info.service = 'memebox';
    data.dealViewData = dealView_menuData;
    data.dealview_API = dealview_API();

    res.render('memebox/pc/deal/deal',data);
});

//main page/////////////////////////
app.get('/', function(req, res) {
    data.config.controller = 'memebox/pc/main/main';
    data.config.title = 'main';
    data.config.info.device = 'pc';
    data.config.info.service = 'memebox';
    data.dealViewData = dealView_menuData;
    data.dealview_API = dealview_API();

    res.render('memebox/pc/main/main',data);
});

//cart page/////////////////////////
app.get('/cart', function(req, res) {
    data.config.controller = 'memebox/pc/cart/cart';
    data.config.title = 'cart';
    data.config.info.device = 'pc';
    data.config.info.service = 'memebox';

    res.render('memebox/pc/cart/cart',data);
});

//order page/////////////////////////
app.get('/order', function(req, res) {
    data.config.controller = 'memebox/pc/order/order';
    data.config.title = 'order';
    data.config.info.device = 'pc';
    data.config.info.service = 'memebox';

    res.render('memebox/pc/order/order',data);
});

app.listen(5000);