var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var data = require('../../../../config/index');
var howToJoin = require('./howToJoin.json');

router.get('/', function(req, res) {
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/member/signUp/howToJoin';
    data.config.title = '가입방법';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.component.menu = data.mock.menu;
    data.sns = howToJoin;

    res.render('memebox/'+device+'/member/signUp/howToJoin',data);
});

module.exports = router;