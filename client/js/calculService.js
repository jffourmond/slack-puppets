'use strict';

app.service('calculService', ['$http', function ($http) {

    this.posterMessage = function (token, channel, username, iconUrl, text) {
		   var req = {
			 method: 'POST',
			 url: 'http://localhost:3000',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: { 
				token: token, 
				channel: channel, 
				username: username, 
				icon_url: iconUrl,
				text: text			
			 }
			}

		$http.post(req);
    };

   

}]);