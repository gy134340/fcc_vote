var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');

var app = express();
app.use(express.static(__dirname + '../client'));


/**
 * 路由
 */

// 未登录只能投别人的票，登录后可以管理自己的票
var homeRouter = require('./routes/home');		// all polls cate  进入投票

app.use('/', homeRouter);

// var pollRouter = require('./routes/poll');		// add polls
// app.use('/polls', pollRouter)

app.listen(config.port, function() {
	console.log('the server is ruuning at', config.port);
});