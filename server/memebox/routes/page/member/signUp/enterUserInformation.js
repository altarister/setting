var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var data = require('../../../../config/index');
var enterUserInformation = require('./enterUserInformation.json');

router.post('/', function(req, res) {
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/member/signUp/enterUserInformation';
    data.config.title = '정보입력';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.component.menu = data.mock.menu;
    data.selectData = enterUserInformation.selectData;

    res.render('memebox/'+device+'/member/signUp/enterUserInformation',data);
});

module.exports = router;

