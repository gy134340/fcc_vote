'use strict';

var express = require('express');
var router = express.Router();

var auth = require('../../auth');
var controller = require('./home.controller');
var model = require('./home.model');

var checkLogin = auth.checkLogin;

// @todo
router.get('/', checkLogin, controller.index);
router.delete('/:id', checkLogin, controller.destroy);
router.get('/me', checkLogin, controller.me);
router.put('/:id/password', checkLogin, controller.changePassword);
router.put('/:id/:city/:state', checkLogin, controller.update);
router.get('/:id', checkLogin, controller.show);

module.exports = router;