var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var data = require('../../../../config/index');

router.post('/', function(req, res) {
    var body = req.body
    console.log('body----------------')
    console.log(body)
    console.log('body----------------')
    // console.log('query---------',JSON.stringify(req.query))
    // console.log('res----------------',res)
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/member/signUp/SignedUp';
    data.config.title = '가입완료';
    data.config.info.device = device;
    data.config.info.service = 'memebox';
    data.component.menu = data.mock.menu;

    res.render('memebox/'+device+'/member/signUp/SignedUp',data);
});

module.exports = router;