
chrome.storage.sync.get({
    username: false,
    password: false
  }, function(items) {
  	if(items.password)
  	{
  		
  		$.get('https://api.github.com/users/defunkt?Authorization=' + items.username + ':' + items.password, function (data) {
  			console.log(data);
  		});

  	}
  });