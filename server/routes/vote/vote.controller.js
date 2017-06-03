var _ = require('lodash');
var Vote = require('./vote.model');

module.exports = {
	index: function(req, res) {		// for all
		res.end('fuck');
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
		// console.log('id', req.params.id);
		Vote.findById(id, function(err, doc) {
			if (err) {
				console.log('update err');
				return;
			}
			// res.json(doc);
			// console.log('doc', doc);
			var sub = doc.option.id(req.body.sub_id);
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