// express 一堆文件
var express = require('express');

module.exports = function(app) {
	app.use(express.static( '../../client'));
}