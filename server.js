'use strict';

let express = require('express');
let request = require('request');
let bodyParser = require('body-parser');
let moment = require('moment');

let app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(express.static('client'));

app.post('/messages', function (req, res) {

  let body = req.body;
  let dateTime = moment().format('YYYY-MM-DD HH:mm:ss');;
  let ip = req.connection.remoteAddress;
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
    let status = response.statusCode;
    let body = JSON.parse(bodyString);
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
  let host = server.address().address;
  let port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
