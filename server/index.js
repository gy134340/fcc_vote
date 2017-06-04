var express = require('express');
var mongoose = require('mongoose');

var path = require('path');

var favicon = require('serve-favicon');

var config = require('./config/index');

var app = express();
mongoose.connect(config.mongodb);
mongoose.connection.on('error', function(err) {
	console.error('mongodb connection error:' + err);
	process.exit(1);
});

require('./config/express')(app);

// app.use(express.static( '../client'));
// routes
require('./routes')(app);



app.listen(config.port, function() {
	console.log('the server is running at:' + config.port);
});