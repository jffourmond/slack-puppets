'use strict';

class SlactorService{

    constructor($http){
      this.$http = $http;
    }

    posterMessage (token, channel, username, iconUrl, text) {

                return this.$http.post('/messages', {
                                token: token,
                                channel: channel,
                                username: username,
                                icon_url: iconUrl,
                                text: text
                         });
    }
}

app.service('SlactorService', ['$http', $http => new SlactorService($http)]);

