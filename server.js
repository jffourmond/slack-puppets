var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var moment = require('moment');

var app = express();
app.use(bodyParser.json());
app.use(express.static('client')); /* le répertoire qui contient les sources du front */

var PASSWORD = 'TMP_PASSWORD';
var TOKEN = 'TMP_TOKEN';
var SLACK_URL = 'https://slack.com/api/chat.postMessage';

function sendErrorToSlactor(errorMsg, slactorResponse) {
    console.log('ERROR : ' + errorMsg);
    slactorResponse.status(500).send(errorMsg);
}

function postToSlack(slactorRequest, slactorResponse) {
    var body = slactorRequest.body;
    request.post({
        url: SLACK_URL,
        form: {
            token: TOKEN,
            username: body.username,
            channel: body.channel,
            text: body.text,
            icon_url: body.icon_url,
            parse: 'full'
        }
    },
        function (error, slackResponse, bodyString) {
            var status = slackResponse.statusCode;
            var body = JSON.parse(bodyString);
            console.log('Status : ' + status + ' / success : ' + body.ok);
            if (body.ok === false) {
                sendErrorToSlactor(bodyString, slactorResponse);
            } else {
                slactorResponse.send('OK');
            };
        });
}

app.post('/messages', function (slactorRequest, slactorResponse) {
    var body = slactorRequest.body;
    var dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    var ip = slactorRequest.connection.remoteAddress;
    console.log('Message received at %s from IP %s : username = %s, channel = %s and password = %s', dateTime, ip, body.username, body.channel, body.password);

    if (body.password === PASSWORD) {
        postToSlack(slactorRequest, slactorResponse);
    } else {
        sendErrorToSlactor('Mot de passe incorrect', slactorResponse);
    }
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
