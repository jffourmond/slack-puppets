var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies

app.use(express.static('client'));

app.post('/messages', function (req, res) {

  var body = req.body;
  console.log('url : ' + body.token);
  request.post({
    url:     'https://slack.com/api/chat.postMessage',
    form:    {
	token :  body.token, 
        username :  body.username, 
        channel : body.channel,
        text : body.text,
        icon_url : body.icon_url, 
        parse : 'full'
    }
  }, 
  function(error, response, bodyString){
    var status = response.statusCode;
    var body = JSON.parse(bodyString);
    console.log('STATUS : ' + status + ' / BODY : ' + body.ok);
    if (body.ok === false){
     console.log('ERROR : ' + bodyString);
     res.status(500).send(body.error);
    } else {
     res.send('OK');
    };
  });

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
