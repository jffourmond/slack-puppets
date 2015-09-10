'use strict';

app.service('calculService', ['$http', function ($http) {

    this.posterMessage = function (token, channel, username, iconUrl, text) {

		$http.post('http://51.254.102.153:3000/slack', { 
				token: token, 
				channel: channel, 
				username: username, 
				icon_url: iconUrl,
				text: text			
			 });
    };

   

}]);
