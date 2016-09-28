'use strict';

var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var app = express();
var handlebars = require('handlebars');
var ajax = require('./controllers/routes/ajax');

console.log('__dirname = ',__dirname)

//hbs.register/////////////////////////
var blocks = {};

hbs.registerPartials(__dirname + '/views/memebox/layouts');
hbs.registerPartials(__dirname + '/views/memebox/pc');
hbs.registerPartials(__dirname + '/views/common/');
hbs.registerPartials(__dirname + '/public/app/components');

hbs.registerHelper('extend', function(name, context) {
    //console.log('extend-name = ',name);
    //console.log('context = ', context);
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    //console.log('block-name = ',name);
    var val = (blocks[name] || []).join('\n');
    //console.log('block-val = ',val);
    // clear the block
    blocks[name] = [];
    return val;
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

//data.register/////////////////////////

var dealData = require('./controllers/json/deal.json');
var menuData = require('./controllers/json/menu.json');
var dealViewData = require('./controllers/json/dealView_menu.json');

function dealview_API(){
    return {
        "type":"GET",
        "cache":"true",
        "data":dealData,
        "dataType":"json",
        "url":"/dealAPI"
    }
};

//express.register/////////////////////////
app.engine('html', require('hbs').__express);
app.set('views', 'views');
app.set('view engine', 'hbs');
app.use('/dealAPI', ajax);
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname +'/views'));

var main_data = {
    "title": "main",
    "dealViewData":dealViewData,
    "dealview_API": dealview_API(),
    "controller": "memebox/pc/main/main",
    "component":{
        "name" : "menu",
        "data" : menuData
    }
};
app.get('/', function(req, res) {
    res.render('memebox/pc/main/main',main_data);
});
var cart_data = {
    "title": "cart",
    "controller": "memebox/pc/cart/cart"
};
app.get('/cart', function(req, res) {
    res.render('memebox/pc/cart/cart',cart_data);
});

var order_data = {
    "title": "order",
    "controller": "memebox/pc/order/order"
};
app.get('/order', function(req, res) {
    res.render('memebox/pc/order/order',order_data);
});

app.listen(5000);