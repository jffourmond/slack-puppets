var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.send('Yoooooooo!');
});

app.post('/slack', function (req, res) {
  res.header('Access-Control-Allow-Origin',  '*');
res.send('Slackkk!');

  console.log('url : ' + req.body.token);
  request.post({
    url:     'https://slack.com/api/chat.postMessage',
    form:    {
	token :  req.body.token, 
        username :  req.body.username, 
        channel : req.body.channel,
        text : req.body.text,
        icon_url : req.body.icon_url
    }
  }, 
  function(error, response, body){
   console.log(body);
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
