require("dotenv").config();

var fs = require("fs");
var keys = require("keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
