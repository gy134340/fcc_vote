'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var VoteSchema = new Schema({
	name: String,
	owner: String,
	option: [{
		name: String,
		votes: Number
	}],
	voters:[],	// 每人只能选一次，ip judge
	active: Boolean,
});

module.exports = mongoose.model('Vote', VoteSchema);