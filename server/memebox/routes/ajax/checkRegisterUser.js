/**
 * Created by 160727-b on 2017. 1. 6..
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var random = 0;//Math.floor(Math.random() * 2);
    var result = {
        status:'success',
        isRegisterEmail: (random > 0)? true : false,
        message: (random > 0)? 'ajax 중복된 아이디입니다 ' : '등록 가능한 아이디 입니다',
    };

    console.log('이메일 중복 체크', result);
    res.send(result);
});

module.exports = router;