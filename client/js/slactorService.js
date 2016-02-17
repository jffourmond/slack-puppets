'use strict';

app.service('slactorService', ['$http', function ($http) {

    this.posterMessage = function (channel, username, iconUrl, text, password) {

        return $http.post('/messages', {
            channel: channel,
            username: username,
            icon_url: iconUrl,
            text: text,
            password: password
        });
    };



}]);
