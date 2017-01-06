/**
 * Created by 160727-b on 2017. 1. 6..
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var result = {
        status:'success',
        certificationCompletion: true,
        message: '잘못된 인증 번호를 보내셨습니다.'
    };

    console.log('ajax-get 휴대번호로 받은 문자 확인', result);
    res.send(result);
});

module.exports = router;