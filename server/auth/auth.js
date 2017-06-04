'use strict';

var check = {
	checkLogin: function checkLogin(req, res, next) {
		if (!req.session.username) {
			req.flash('error', '未登录'); 
			return res.redirect('/signin');
		}
		next();
	},
	checkNotLogin: function checkNotLogin(req, res, next) {
		if (req.session.username) {
			req.flash('error', '已登录'); 
			return res.redirect('back');//返回之前的页面
		}
		next();
	},
	isAuthenticated: function() {
		
		// app.use req, res, next
		return function(req, res, next) {
			if (req.session.username) {
				return res.redirect('/');
				
			} else {
				return res.redirect('signin');
			}
			next();
		}
	}
};

module.exports = check;
