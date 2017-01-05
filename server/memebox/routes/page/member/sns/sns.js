/**
 * Created by 160727-b on 2017. 1. 5..
 */
var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

router.get('/', function(req, res) {
    var device = req.useragent.isMobile? 'mobile' : 'pc';

    res.render('memebox/'+device+'/member/sns/sns');
});

module.exports = router;