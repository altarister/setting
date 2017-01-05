var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var data = require('../../../config/index');

router.get('/', function(req, res) {
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/search/index';
    data.config.title = '검색 홈';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.component.menu = data.mock.menu;

    res.render('memebox/'+device+'/search/index',data);
});

module.exports = router;