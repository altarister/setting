var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

var data = require('../../../config/index');

router.get('/', function(req, res) {
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    data.config.controller = 'memebox/'+device+'/dealAll/dealAll';
    data.config.title = 'js 딜 모두 보기';
    data.config.info.device = device;
    data.config.info.service = 'memebox';

    res.render('memebox/'+device+'/dealAll/dealAll_export',data);
});

module.exports = router;