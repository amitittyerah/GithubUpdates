function actor_url (data) {
	return '<img class="img" src="' + data.avatar_url + '" height="25" width="25">' + 
	'<a href="' + build_users_url(data.url) + '">' + data.login + '</a>';
}

function repo_url (data) {
	return '<a href="' + build_repos_url(data.url) + '">' + data.name + '</a>'
}

function build_block (item) {
	return '<div class="block">' + item + '</div>';
}

function get_date(activity) {
	return ' ' + moment(activity.created_at, "Y-M-DThh:mm:ssZ").fromNow(); 
}

function build_users_url (url) {
	return url.replace('/api.', '/').replace('/users/', '/');
}

function build_repos_url (url) {
	return url.replace('/api.', '/').replace('/repos/', '/');
}

function build_commit_url (url) {
	return url.replace('/api.', '/').replace('/repos/', '/');
}

$.get('https://api.github.com/users/devscoop/received_events', function (data) {
	var append = '';
	for(var i = 0 ; i < data.length ; i++)
	{
		var activity = data[i];
		if (activity.type === 'IssueCommentEvent')
		{
			append += build_block(actor_url(activity.actor) 
				+ ' commented on ' 
				+ repo_url(activity.repo)
				+ get_date(activity));
		}
		else if (activity.type === 'WatchEvent')
		{
			append += build_block(actor_url(activity.actor) 
				+ ' watching ' 
				+ repo_url(activity.repo)
				+ get_date(activity));
		}
		else if (activity.type === 'PullRequestEvent')
		{
			append += build_block(actor_url(activity.actor) 
				+ ' pulled ' 
				+ repo_url(activity.repo)
				+ get_date(activity));
		}
		else if (activity.type === 'ForkEvents')
		{
			append += build_block(actor_url(activity.actor) 
				+ ' forked ' 
				+ repo_url(activity.repo)
				+ get_date(activity));
		}
		else if (activity.type === 'PushEvent')
		{
			append += build_block(actor_url(activity.actor) 
				+ ' pushed to ' 
				+ repo_url(activity.repo) 
				+ '(<a href="' + build_commit_url(activity.payload.commits[0].url) + '">Commit</a>)'
				+ get_date(activity));
		}
		else if (activity.type === 'CreateEvent')
		{
			append += build_block(actor_url(activity.actor) 
				+ ' created ' 
				+ repo_url(activity.repo) 
				+ get_date(activity));
		}
	}
	$('body').append(append);
	$('a').unbind('click').click(function(item) {
     	chrome.tabs.create({url: $(item.target).attr('href')});
  });
});
