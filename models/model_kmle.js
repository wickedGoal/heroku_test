var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var kmleSchema = new Schema({
  Part: Number,
  PartName:String,
  Chapter: Number,
  ChapName: String,
  Logs: [{logTime:{type:Date, default:Date.Now}, userId:Number}]
});


// Create song schema
let questionSchema = new Schema({
  Question: String,
  Answer: String,
  Part: Number,
  PartName:String,
  Chapter: Number,
  ChapName: String,
  Comment1: String,
  Comment2: String,
  Logs: [{logTime:{type:Date, default:Date.Now}, userId:Number}]
});

// Store song documents in a collection called "songs"

module.exports = {
  Kmle : mongoose.model("Kmle", kmleSchema),
  Question: mongoose.model("Question", questionSchema)
}
