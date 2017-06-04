var express = require('express');
var Router = express.Router();
var http = require('http');
var config = require('../../config');
var request = require('request');

Router.get('/', function(req, res) {
	// console.log(req.query.code);
	// console.log('code', req.query.code);
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
             return;
         }
         var obj = JSON.parse(body);
         // res.send(obj.login);
         // console.log('token', obj);
         req.session.username = obj.login;
         req.session.avatar = obj.avatar_url;
         // console.log(req.session.username);
         // res.send(req.session.username);
         // res.send(req.session.avatar);
         res.redirect('/');
      });
  });
});

// Router.get('/callback/', function(req, res) {
// 	console.log(req.query);
// 	res.send('test github');
// });

module.exports = Router;