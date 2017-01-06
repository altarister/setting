/**
 * Created by 160727-b on 2017. 1. 5..
 */
var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var data = require('../../../../config/index');

router.post('/', function(req, res) {
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/member/sns/popupClose';
    data.config.title = '가입방법';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.success = req.body.success;
    if(req.body.success === 'ok'){
        data.msg = '성공';
    }else{
        data.msg = '실패';
    }

    res.render('memebox/'+device+'/member/sns/popupClose',data);
});

module.exports = router;