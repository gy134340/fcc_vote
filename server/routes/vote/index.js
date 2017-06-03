'use strict';

var express = require('express');
var controller = require('./vote.controller');
var auth = require('../../auth/auth');

var Router = express.Router();

Router.get('/', controller.index);		// show all

Router.get('/:id', controller.show);

Router.post('/', auth.isAuthenticated(), controller.create);

Router.delete('/:id', auth.isAuthenticated(), controller.delete);

Router.put('/:id', auth.isAuthenticated(), controller.update);	// 全改

Router.patch('/:id', auth.isAuthenticated(), controller.update);	// 改部分

module.exports = Router;

