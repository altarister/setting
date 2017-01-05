/**
 * Created by 160727-b on 2016. 9. 29..
 */
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
    console.log('main.js')
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/main/main';
    data.config.title = '홈';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.component.menu = menuData;
    res.render('memebox/'+device+'/main/main',data);
});

module.exports = router;