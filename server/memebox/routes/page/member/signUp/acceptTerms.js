var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var data = require('../../../../config/index');

router.get('/', function(req, res) {
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/member/signUp/acceptTerms';
    data.config.title = '약관동의';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.component.menu = data.mock.menu;
    data.config.sns = {
        service : 'naver',
        welcomeText: '미미박스 회원이 되기 위한 간단한 과정!'
    };

    res.render('memebox/'+device+'/member/signUp/acceptTerms',data);
});

module.exports = router;