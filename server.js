const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
const PASSWORD = 'TMP_PASSWORD';
const TOKEN = 'TMP_TOKEN';
const SLACK_URL = 'https://slack.com/api/chat.postMessage';

function sendErrorToSlactor(errorMsg, slactorResponse) {
    console.log(`ERROR : ${errorMsg}`);
    slactorResponse.status(500).send(errorMsg);
}

function postToSlack(slactorRequest, slactorResponse) {
    const body = slactorRequest.body;
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
        (error, slackResponse, bodyString) => {
            const status = slackResponse.statusCode;
            const body = JSON.parse(bodyString);
            console.log(`Status : ${status} / success : ${body.ok}`);
            if (body.ok === false) {
                sendErrorToSlactor(bodyString, slactorResponse);
            } else {
                slactorResponse.send('OK');
            };
        });
}

const server = app.listen(3000, () => {
    const serverAddress = server.address();
    const host = serverAddress.address;
    const port = serverAddress.port;
    console.log(`Appli dispo sur le port ${port}`);
});

app.use(bodyParser.json());
app.use(express.static('client')); /* le répertoire qui contient les sources du front */
app.post('/messages', (slactorRequest, slactorResponse) => {
    const body = slactorRequest.body;
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const connection = slactorRequest.connection;
    const ip = slactorRequest.remoteAddress;
    console.log(`Message received at ${dateTime} from IP ${ip} : 
        username = ${body.username}, channel = ${body.channel} and password = ${body.password}`);

    if (body.password === PASSWORD) {
        postToSlack(slactorRequest, slactorResponse);
    } else {
        sendErrorToSlactor('Mot de passe incorrect', slactorResponse);
    }
});

