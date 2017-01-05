var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var menuData = require('../json/menu.json');
var configData = require('../json/config.json');

var data = {
    "config" : configData,
    "component" : {}
};

router.get('/', function(req, res) {

    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/cart/cart';
    data.config.title = '장바구니';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.component.menu = menuData;

    console.log('cart.js', configData)
    res.render('memebox/'+device+'/cart/cart',data);
});

module.exports = router;