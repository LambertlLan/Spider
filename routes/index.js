var express = require('express');
var router = express.Router();
var cnode = require('../spider/cnode');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('list', { title: 'Spider' });
    var requestUrl = "https://cnodejs.org" + req.url;
    var _cnode = new cnode(requestUrl);
    _cnode.getData(res);
});

module.exports = router;