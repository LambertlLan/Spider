var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var qs = require('querystring');

var cnodeUrl = "https://cnodejs.org";

var CNode = function(url) {
    cnodeUrl = url;
}

CNode.prototype = {
    getData: function(res) {
        superagent.get(cnodeUrl)
            .end(function(err, res) {
                //错误处理
                if (err) {
                    return next(err)
                }

                //cheerio解析
                var $ = cheerio.load(res.text);
                var lastPageUrl = $('.pagination li:last-child').find('a').attr('href');
                if (lastPageUrl != undefined) {
                    //获取参数
                    var queryUrl = url.parse(lastPageUrl).query;
                    console.log(queryUrl);
                    //参数转为对象
                    var queryObj = qs.parse(queryUrl);
                    //得到总页数
                    var totalPages = queryObj.page;
                    //获取列表内容
                }else{
                    var totalPages = $('.pagination').attr('current_page');
                }

                var item = {
                    totalPages: '',
                    data: []
                };

                $('#topic_list .topic_title').each(function(index, ele) {
                    var $element = $(ele);
                    var type = $element.siblings('.topiclist-tab').text();
                    item.data.push({
                        title: $element.attr('title'),
                        href: $element.attr('href'),
                        link: url.resolve(cnodeUrl, $element.attr('href')),
                        type: type
                    })
                });
                item.totalPages = totalPages;
                res.render('list', item);
            })
    }
}
module.exports = CNode;