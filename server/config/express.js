// express 一堆文件
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function(app) {
	app.use(express.static('../client'));

	app.use(express.static('../client/assets'));	// 资源文件
	app.use(express.static('../client/views'));   	// @todo 模版文件

	// for session
	app.use(session({
		secret: 'gy134340',
		cookie: { 
			path: '/',
			httpOnly: false,
			maxAge: 1000 * 60 * 60
		},
		resave: false,
  		saveUninitialized: true
	}));

	var jsonParser = bodyParser.json();
	var formParser = bodyParser.urlencoded({ extended: false });
	app.use(formParser);
	app.use(jsonParser);

}