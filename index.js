const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

const uri = process.env.MONGODB_URI
mongoose.connect(uri);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
  // Create song schema
  let songSchema = mongoose.Schema({
    decade: String,
    artist: String,
    song: String,
    weeksAtOne: Number
  });

  // Store song documents in a collection called "songs"
  let Song = mongoose.model('songs', songSchema);

  // Create seed data
  let seventies = new Song({
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  });

  let eighties = new Song({
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  });

  let nineties = new Song({
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  });

  /*
   * First we'll add a few songs. Nothing is required to create the
   * songs collection; it is created automatically when we insert.
   */

  let list = [seventies, eighties, nineties]

  Song.insertMany(list).then(() => {

    /*
     * Then we need to give Boyz II Men credit for their contribution
     * to the hit "One Sweet Day".
     */

    return Song.update({ song: 'One Sweet Day'}, { $set: { artist: 'Mariah Carey ft. Boyz II Men'} })

  }).then(() => {

    /*
     * Finally we run a query which returns all the hits that spend 10 or
     * more weeks at number 1.
     */

    return Song.find({ weeksAtOne: { $gte: 10} }).sort({ decade: 1})

  }).then(docs => {

    docs.forEach(doc => {
      console.log(
        'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
        ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
      );
    });

  }).catch(err => {

    // Log any errors that are thrown in the Promise chain
    console.log(err)

  })
});

// DEFINE MODEL
var Books = require('./models/books');
let songSchema = mongoose.Schema({
  decade: String,
  artist: String,
  song: String,
  weeksAtOne: Number
});

let Song = mongoose.model('songs', songSchema);


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req,res) => res.send(cool()))
  .get('/times', (req, res) => res.send(showTimes()))

  // GET ALL BOOKS
  .get('/songs', function(req,res){
    Song.find(function(err, songs){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(songs);
    });
  })


  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  showTimes = () => {
    let result = ''
    const times = process.env.TIMES || 5
    for (i = 0; i < times; i++) {
      result += i + ' '
    }
    return result;
  }