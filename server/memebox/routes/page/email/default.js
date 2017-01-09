/**
 * Created by 160727-b on 2016. 9. 29..
 */
var express = require('express');
var useragent = require('express-useragent');
var router = express.Router();

router.get('/', function(req, res) {

    res.render('memebox/templates/email/template');
});

module.exports = router;