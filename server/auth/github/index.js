var express = require('express');
var Router = express.Router();
var http = require('http');
var config = require('../../config');
var request = require('request');

Router.get('/', function(req, res) {
	// console.log(req.query.code);
	console.log('code', req.query.code);
	var code = req.query.code;
	var client_id = config.github_key;
	var client_secret = config.github_secret;
	var redirect_uri = config.redirect_callback;
	// var url = 'https://github.com/login/oauth/access_token?client_id='+
	// 			client_id + '&client_secret='+
	// 			client_secret +'&code='+
	// 			req.query.code + '&redirect_uri=' +
	// 			redirect_uri;
    var token_option = {
        url: "https://github.com/login/oauth/access_token",
        method: "POST",
        form:{
            code: code,
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri
        }
    };
    request(token_option, function(err, response, body){
      if(err){
          res.send(response);
      }
      //回傳值不是JSON Format,所以要自己用Regular Expression取出
      // var regex = /\=([a-zA-Z0-9]+)\&([a-zA-Z])+\=([a-zA-Z0-9]+)/;
      // var result = response.match(regex);
      // var token = result[0];
      // console.log(JSON.parse(response));
      // var obj = JSON.parse(response);
      console.log(body);

      //拿access_token換使用者資料
      var info_option = {
          url: "https://api.github.com/user?" + body,
          method: "GET",
          headers: {
              "User-Agent": "Awesome-Octocat-App",
              // "Authorization":"token "+ token
          }
      }
      request(info_option, function(err, response, body){
         if(err){
             res.send(err);
         }
         res.send(body);
      });
  });
	// res.set('Content-Type', 'application/json');
	// var token = res.redirect(url);
	// console.log('token', token);
	// var path = '/login/oauth/access_token?client_id='+
	// 			client_id + '&client_secret='+
	// 			client_secret +'&code='+
	// 			req.query.code + '&redirect_uri=' +
	// 			redirect_uri;
	// console.log(url);
	// var options = { 
	// 	host: 'https://github.com', 
	// 	port: 80, 
	// 	path: path, 
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json' 
	// 	}
	// };
	// http.get(url, function(res) {
	// 	res.setEncoding('utf8');
	// 	var raw = '';
	// 	res.on('data', function(chunk) {
	// 		raw += chunk;
	// 	});
	// 	res.on('end', function() {
	// 		console.log('raw', raw);
	// 	});

	// });
	// var request = http.request(options, function(res) {
	// 	res.setEncoding('utf8');

	// 	res.on('data', function (chunk) {
	//         console.log("body: " + chunk);
	//     });
	//     res.on('end',function(chunk){
	//         console.log("body: " + chunk);
	//     })
	// });

	// request.on('error', function(e) {
	// 	console.log('request error' + e);
	// });
	 
	// var request = http.post(url, function(res) {
	// 	console.log('token', res);
	// });
	
	// res.redirect(url);
	// 
	// res.send('test github');
});

// Router.get('/callback/', function(req, res) {
// 	console.log(req.query);
// 	res.send('test github');
// });

module.exports = Router;