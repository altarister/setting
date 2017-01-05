/**
 * Created by 160727-b on 2016. 9. 29..
 */
var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var data = require('../../../config/index');

router.get('/', function(req, res) {
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/home/home';
    data.config.title = '홈';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.component.menu = data.mock.menu;

    res.render('memebox/'+device+'/home/home',data);
});

module.exports = router;