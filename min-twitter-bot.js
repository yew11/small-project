console.log("The bot is starting")

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

//How to Search from twitter
searchIt(); 
function searchIt() {
	var params = { 
		q: '@Google', //search key word
		count: 3    //how many tweets would you want to be displayed  
	}; 

	T.get('search/tweets', params, gotData);

	function gotData(err, data, response) {
		if (err) {
			console.log("oops, something went wrong");
		} else {
			var tweets = data.statuses;
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
			}
		}	
	}; 
}
//setting up a user stream
var stream = T.stream('user');

//When followed
stream.on('follow', followed);
function followed(event) {
	var name = event.source.name;
	var screenName = event.source.screen_name;
	tweetIt('@'+screenName + ' Thanks for following')

}
// How to POST on twitter

 tweetIt();
 //setInterval(tweetIt, 1000*20); 

 function tweetIt(txt) {
		//
	//var ran = Math.floor(Math.random() * 100);
	var params = {
		status: txt 
	}

	T.post('statuses/update', params, twitted);

	function twitted(err, data, response) {
		if (err) {
			console.log("Something is wrong");
		} else {
			console.log('It worked');
		}
	}
}



