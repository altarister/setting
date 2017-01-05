var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var data = require('../../../config/index');

router.get('/', function(req, res) {
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/search/result';
    data.config.title = '검색 결과';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.component.menu = data.mock.menu;

    res.render('memebox/'+device+'/search/result',data);
});

module.exports = router;