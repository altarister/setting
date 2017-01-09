/**
 * Created by 160727-b on 2017. 1. 6..
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var result = {
        status:'success',
        hasNumber: true,
        hideUserId: 'alt*******',
        remainingTime: 30,
        verification: {
            window: 'true',
            url: '/member/verification',
            title: 'verification',
            size: {
                width: 1000,
                height: 690
            }
        }
    };

    console.log('ajax-get 번호인증',result);
    res.send(result);
});

module.exports = router;