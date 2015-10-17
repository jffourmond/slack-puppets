var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies

app.use(express.static('client'));

app.post('/messages', function (req, res) {

  var body = req.body;
  var dateTime = new Date().toISOString();
  var ip = req.connection.remoteAddress;
  console.log('Message received at %s from IP %s : username = %s and channel = %s', dateTime, ip, body.username, body.channel);
  
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
    console.log('Status : ' + status + ' / success : ' + body.ok);
    if (body.ok === false){
     console.log('ERROR : ' + bodyString);
     res.status(500).send(body.error);
    } else {
     res.send('OK');
    };
  });

});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
