var express = require('express');
var config = require('../config');
var Router = express.Router();

// Router.use('/auth/github', require('./github'));
// Router.get('/github', function(req, res) {
// 	console.log(req.query.code);
// 	res.send('test github');
// });

Router.use('/github', require('./github'));

// Router.get('/auth', function(req, res) {
// 	var obj = {};
// 		if (req.session.username) {
// 			obj = {
// 				isAuth: true,
// 				username: req.session.username,
// 				avatar: req.session.avatar
// 			};
// 			res.json(obj);
// 		} else {
// 			obj = {
// 				isAuth: false,
// 			};
// 			res.json(obj);
// 		}
// });

module.exports = Router;