function parseJSON(redditjson){

	$('#content').html('');
	var fifth_upvoes 			= 0;
	var output_string             = '';
	var resultsToReturn = 5;

	output_string +='<h2>Results:</h2><p>' + 'The Reddit API returns ' + redditjson['data']['children'].length +  (redditjson['data']['children'].length == 1?' entry':' entries') +  ' for this URL</p>';
	

	output_string +='<table id="table_id"><thead><tr><th>sub</th><th>date</th><th>comments</th><th>score</th><th>link</th></tr></thead><tbody>' ;
	

	for(i=0;i<redditjson['data']['children'].length;i++){

		var subreddit = redditjson['data']['children'][i]['data']['subreddit'],
		post_date = new Date(redditjson['data']['children'][i]['data']['created'] * 1000),
		comments = redditjson['data']['children'][i]['data']['num_comments'],
		upvotes = redditjson['data']['children'][i]['data']['ups'],
		link = redditjson['data']['children'][i]['data']['permalink'];



		output_string +='<td>/r/' + subreddit + '</td>';

		output_string +=' <td nowrap=1> ' + post_date.toString().substring(0,15) + '</td>';

		output_string +=' <td> ' + comments + ' </td>';

		output_string +='<td>' + upvotes + ' </td>' ;

		output_string +='<td><a href="http://reddit.com' + link + '">' + link + '</a> </td></tr>' ;

	}
	output_string +='</tbody></table>' ;

	// put content into the #content div
	$('#content').html(output_string);
}



function getRedditData(theURL){
	$.getScript(
		"http://www.reddit.com/api/info.json?jsonp=parseJSON&url="+theURL
	);
}

