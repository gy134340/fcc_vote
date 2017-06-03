var express = require('express');
var config = require('../config');
var Router = express.Router();

// Router.use('/auth/github', require('./github'));
// Router.get('/github', function(req, res) {
// 	console.log(req.query.code);
// 	res.send('test github');
// });

Router.use('/github', require('./github'));
module.exports = Router;