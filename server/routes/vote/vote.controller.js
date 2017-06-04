var _ = require('lodash');
var Vote = require('./vote.model');

module.exports = {
	auth: function(req, res) {
		var obj = {};
		if (req.session.username) {
			obj = {
				isAuth: true,
				username: req.session.username,
				avatar: req.session.avatar
			};
			res.json(obj);
		} else {
			obj = {
				isAuth: false,
			};
			res.json(obj);
		}
	},
	loginout: function(req, res) {
		req.session.destroy(function(err) {
			var obj;
			obj = {
				isAuth: false,
			};
			res.json(obj);
		});	
	},
	index: function(req, res) {		// for all
		
	},
	show: function(req, res) {		// for single
		var id = req.params.id;
		Vote.findById(id, function(err, doc) {
			if (err) {
				console.log('update err');
				return;
			}
			res.json(doc);
		})
	},
	create: function(req, res) {
		var chart = new Vote(req.body);

		chart.save(function(err, doc) {
			if (err) {
				console.log('create err');
				return;
			}
			res.json(doc);
			console.log(doc);
		});
	},
	delete: function(req, res) {

	},
	update: function(req, res) {
		var id = req.params.id;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		// console.log('id', req.params.id);
		Vote.findById(id, function(err, doc) {
			if (err) {
				console.log('update err');
				return;
			}
			// res.json(doc);
			console.log('doc', doc);
			var sub = doc.option.id(req.body.sub_id);
			var voters = doc.voters;
			if (voters.indexOf(ip) > -1) {
				res.send('ipExists');
				return;
			} else {
				voters.push(ip);
			}
			sub.votes++;
			doc.save(function(err, dd) {
				if (err) {
					console.log('update save err');
					return;
				}
				res.json(dd);
			})
		});
	}
}