// cool deleted
//const cool = require('cool-ascii-faces')

const express = require("express");
var app = express();
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const kmle = require("./models/model_kmle");

//Connect to MongoDB Server
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function callback() {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

// DEFINE MODEL
//var Books = require('./models/books');

//.use(express.static(path.join(__dirname, 'public')))

//Body-parser substitute: Express's parser (raw, txt parse needs body-parser))
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//React client
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => res.render("client/build/index"));

// [CONFIGURE ROUTER]
var router = require("./routes")(app);

//cool function deleted
//.get('/cool', (req,res) => res.send(cool()))

//show time deleted
//.get('/times', (req, res) => res.send(showTimes()))

// GET ALL BOOKS
/*
.get('/songs', function(req,res){
  Song.find(function(err, songs){
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(songs);
  });
})
*/

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//show time deleted
/*
showTimes = () => {
  let result = ''
  const times = process.env.TIMES || 5
  for (i = 0; i < times; i++) {
    result += i + ' '
  }
  return result;
}
  */
