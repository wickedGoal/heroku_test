var Kmles = require("../models/model_kmle");
var Kmle = Kmles.Kmle;
var Question = Kmles.Question;

module.exports = function(app) {
  // GET ALL BOOKS
  app.get("/api/kmles", function(req, res) {
    Kmle.find({})
      .sort({ part_id: 1, "chapter.chap_id": 1 })
      .exec(function(err, kmles) {
        if (err) return res.status(500).send({ error: "database failure" });
        res.json(kmles);
      });
  });

  // GET part_id BOOKs

  app.get("/api/kmles/:part_id", function(req, res) {
    Kmle.find({ part_id: req.params.part_id })
      .sort({ "chapter.chap_id": 1 })
      .exec(function(err, kmles) {
        if (err) return res.status(500).json({ error: err });
        if (!kmles) return res.status(404).json({ error: "Part not found" });
        res.json(kmles);
      });
  });

  // GET part_id BOOKs

  app.get("/api/kmles/:part_id/:chap_id", function(req, res) {
    Kmle.find({
      part_id: req.params.part_id,
      "chapter.chap_id": req.params.chap_id
    }).exec(function(err, kmles) {
      if (err) return res.status(500).json({ error: err });
      if (!kmles) return res.status(404).json({ error: "Part not found" });
      res.json(kmles);
    });
  });

  // GET studied chapters

  app.get("/api/checked", function(req, res) {
    //Kmle.find({ "chapter.logs": { $exists: true } })
    Kmle.find({})
      .sort({ part_id: 1, "chapter.chap_id": 1 })
      .exec(function(err, kmles) {
        if (err) return res.status(500).send({ error: "database failure" });

        output = JSON.parse('{"List":[]}');
        //countChecked=[];
        allChap = 0;
        checkedChap = 0;
        kmles.forEach(function(doc) {
          totalChap = doc.chapter.length;
          allChap = allChap + totalChap;

          doc.chapter = doc.chapter.filter(function(chap) {
            return chap.logs.length > 0;
          });
          //newkmles = newkmles.concat(doc);
          checkedChap = checkedChap + doc.chapter.length;

          var data = JSON.parse(
            '{"' +
              doc.part_id +
              "." +
              doc.part_name +
              '":"' +
              doc.chapter.length +
              "/" +
              totalChap +
              '"}'
          );
          output["List"].push(data);
          //output = output.concat(JSON.parse(data));
        });

        output["Total"] = allChap;
        output["Checked"] = checkedChap;
        output["Remaining"] = allChap - checkedChap;

        console.log(output);
        res.json(output);
      });
  });

  /*
    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', function(req, res){
        Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(404).json({error: 'book not found'});
            res.json(books);
        })
    });
    

    // CREATE BOOK
    app.post('/api/books', function(req, res){
        var book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);

        book.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });
    */

  // UPDATE THE BOOK with new log, req.body = logTime, userId
  app.put("/api/kmles/:part_id/:chap_id", function(req, res) {
    Kmle.updateOne(
      { part_id: req.params.part_id, "chapter.chap_id": req.params.chap_id },
      {
        $push: {
          "chapter.$.logs": { $each: [req.body], $sort: { log_time: 1 } }
        }
      },
      { setDefaultsOnInsert: true }, //Options : insert logTime on default
      function(err, output) {
        if (err) {
          res.status(500).json({ error: "database failure" });
          console.log(output);
          return;
        }
        if (!output.n)
          return res.status(404).json({ error: "Chapter not found" });
        res.json({ message: "Log updated" });
      }
    );
    /* [ ANOTHER WAY TO UPDATE THE BOOK ]
            Book.findById(req.params.book_id, function(err, book){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!book) return res.status(404).json({ error: 'book not found' });
            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;
            book.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated'});
            });
        });
    */
  });

  // DELETE THE  log, req.body = logTime, userId
  app.delete("/api/kmles/:part_id/:chap_id", function(req, res) {
    Kmle.updateOne(
      { part_id: req.params.part_id, "chapter.chap_id": req.params.chap_id },
      {
        $pull: {
          "chapter.$.logs": { _id: req.body._id }
        }
      },
      function(err, output) {
        if (err) {
          res.status(500).json({ error: "database failure" });
          console.log(output);
          return;
        }
        if (!output.n)
          return res.status(404).json({ error: "Chapter not found" });
        res.json({ message: "Log updated" });
      }
    );
  });
  // DELETE BOOK
  /*
    app.delete('/api/kmles/:book_id', function(req, res){
        Book.remove({ _id: req.params.book_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            // ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            //if(!output.result.n) return res.status(404).json({ error: "book not found" });
            //res.json({ message: "book deleted" });
            //

            res.status(204).end();
        })
    });
    */

  // Get Question
  app.get("/api/questions", function(req, res) {
    Question.find({})
      .sort({ part_id: 1, chap_id: 1 })
      .exec(function(err, questions) {
        if (err) return res.status(500).send({ error: "database failure" });
        res.json(questions);
      });
  });

  // Get Question
  app.get("/api/questions/:part_id", function(req, res) {
    Question.find({ part_id: req.params.part_id })
      .sort({ chap_id: 1 })
      .exec(function(err, questions) {
        if (err) return res.status(500).send({ error: "database failure" });
        res.json(questions);
      });
  });

  // Get Question
  app.get("/api/questions/:part_id/:chap_id", function(req, res) {
    Question.find({
      part_id: req.params.part_id,
      chap_id: req.params.chap_id
    }).exec(function(err, questions) {
      if (err) return res.status(500).send({ error: "database failure" });
      res.json(questions);
    });
  });

  // Add Question
  app.post("/api/questions", function(req, res) {
    console.log(req);
    var question = new Question(req.body.data);
    console.log(question);
    /*
    var question = new Question();
    question.part_id = req.body.part_id;
    question.part_name = req.body.part_name;
    question.chap_id = req.body.chap_id;
    question.ChapName = req.body.ChapName;
    question.Question = req.body.Question;
    question.Answer = req.body.Answer;
    question.Comment1 = req.body.Comment1;
    question.Comment2 = req.body.Comment2;
    question.logs = { logTime: Date.now(), userId: req.body.userId };
*/
    question.save(function(err) {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }
      res.json({ result: 1 });
    });
  });

  //Delete Question
  app.delete("/api/questions", function(req, res) {
    Question.deleteOne({ _id: req.body._id }, function(err, output) {
      if (err) return res.status(500).json({ error: "database failure" });

      // ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
      //if(!output.result.n) return res.status(404).json({ error: "book not found" });
      //res.json({ message: "book deleted" });
      //

      res.status(204).end();
    });
  });
};
