/**
 * Created by 160727-b on 2017. 1. 6..
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var random = 1;//Math.floor(Math.random() * 2);
    var result = {
        status:'success',
        findUser: (random > 0)? true : false,
        message: (random > 0)? '친구추천 성공 ' : '추천인 아이디 또는 코드가 없습니다.'
    };

    console.log('추천 친구가 있는지 체크', result);
    res.send(result);
});

module.exports = router;