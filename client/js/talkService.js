'use strict';

app.service('talkService', ['$http', function ($http) {

    this.posterMessage = function (token, channel, username, iconUrl, text) {

		$http.post('http://vps197062.ovh.net:3000/messages', { 
				token: token, 
				channel: channel, 
				username: username, 
				icon_url: iconUrl,
				text: text			
			 });
    };

   

}]);
