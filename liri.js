require("dotenv").config();

var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var action= process.argv[2];

// The switch-case will direct which function gets run.
switch (action) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      thisSong();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }


//  If the "myTweets" function is called...
function myTweets() {
    // var params = process.argv[3];
    var params = {vmjgr: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++){
               console.log(tweets[i].text); 
            }
        }
        else {
            console.log(error);
        }
    })
};

 //If the "thisSong" function is called...
function thisSong(song) {
    var userSong = process.argv[3];
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
            if (!userSong) {
                userSong = "The Sign";
            }
    var song = userSong;

    spotify.search({ type: 'track', query: song }, function(err, data){
        if (err) {
          return console.log('Error occurred: ' + err);
    }
        else {
            var songInfo = data.tracks.items;
				for (var i = 0; i < 5; i++) {
					if (songInfo[i] != undefined) {
                        console.log("_____________________");
                        // Artist(s)
                        console.log("Artist: " + songInfo[i].artists[0].name);
                        // The song's name
                        console.log("Song: " + songInfo[i].name);
                        // A preview link of the song from Spotify
                        console.log("Preview Url: " + songInfo[i].preview_url);
                        // The album that the song is from
						console.log("Album the song is from: " + songInfo[i].album.name); 
						console.log("_____________________");
                    }       
                }
            }           
    });
}

// If the "movieThis" function is called...
function movieThis() {
var response = require("request");
var movie = process.argv[3];
    if(!movie){
    movie = "Mr. Nobody";
}
// We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=56fa192", function( error, response, body) {

  // If there were no errors and the response code was 200 
  if (!error && response.statusCode === 200) {

    // Then we print out:
    console.log("_____________________");
    // * Title of the movie.
    console.log("The movie title is: " + JSON.parse(body).Title);
    // * Year the movie came out.
    console.log("The movie came out on: " + JSON.parse(body).Year);
    // * IMDB Rating of the movie.
    console.log("The movie's IMDB Rating is: " + JSON.parse(body).imdbRating);
    // * Rotten Tomatoes Rating of the movie.
    console.log("The movie's Rotten Tomatoes Rating is: " + JSON.parse(body).tomatoRotten);
    // * Country where the movie was produced.
    console.log("The movie was produced in: " + JSON.parse(body).Country);
    // * Language of the movie.
    console.log("The movie's language: " + JSON.parse(body).Language);
    // * Plot of the movie.
    console.log("The movie's plot is: " + JSON.parse(body).Plot);
    // * Actors in the movie.
    console.log("The movie's actors are: " + JSON.parse(body).Actors);
    console.log("_____________________");

  };
})
};

// If the "do-what-it-says" function is called...
function doWhatItSays() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
});
}
