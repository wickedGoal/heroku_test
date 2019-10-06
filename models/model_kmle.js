var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var kmleSchema = new Schema({
  part_id: Number,
  part_name: String,
  chapter: [
    {
      chap_id: Number,
      chap_name: String,
      logs: [
        {
          log_time: { type: Date, default: Date.now },
          user_id: Number
        }
      ]
    }
  ]
});

// Create question schema
let questionSchema = new Schema({
  question: String,
  answer: String,
  part_id: Number,
  part_name: String,
  chap_id: Number,
  chap_name: String,
  comment1: String,
  comment2: String,
  logs: [
    {
      log_time: { type: Date, default: Date.now },
      user_id: Number
    }
  ]
});

// Store song documents in a collection called "songs"

module.exports = {
  Kmle: mongoose.model("Kmle", kmleSchema),
  Question: mongoose.model("Question", questionSchema)
};
