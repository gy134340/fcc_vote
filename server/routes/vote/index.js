'use strict';

var express = require('express');
var controller = require('./vote.controller');
var auth = require('../../auth');



var Router = express.Router();

Router.get('/', controller.index);		// show all

Router.get('/:id', controller.show);

Router.put('/vote/:id', controller.vote);

Router.post('/', auth.isAuthenticated(), controller.create);

Router.delete('/:id', auth.isAuthenticated(), controller.delete);

// Router.patch('/:id', auth.isAuthenticated(), controller.update);

module.exports = Router;

