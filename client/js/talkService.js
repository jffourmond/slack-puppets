'use strict';

app.service('talkService', ['$http', function ($http) {

    this.posterMessage = function (token, channel, username, iconUrl, text) {

		return $http.post('/messages', { 
				token: token, 
				channel: channel, 
				username: username, 
				icon_url: iconUrl,
				text: text			
			 });
    };

   

}]);
