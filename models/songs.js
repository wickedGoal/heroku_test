var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var booksSchema = new Schema({
  title: String,
  author: String,
  price: Number
});

// Create song schema
let songSchema = mongoose.Schema({
  decade: String,
  artist: String,
  song: String,
  weeksAtOne: Number
});

// Store song documents in a collection called "songs"
//let Song = mongoose.model('songs', songSchema);

module.exports = mongoose.model("songs", songSchema);
