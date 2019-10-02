
var Kmles = require('../models/model_kmle');
var Kmle = Kmles.Kmle;
var Question = Kmles.Question;

module.exports = function(app) {
     // GET ALL BOOKS
    app.get('/api/kmles', function(req,res){
        Kmle.find(function(err, kmles){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(kmles);
        })
    });

    // GET SINGLE BOOK
    
    app.get('/api/kmles/:Part', function(req, res){
        Kmle.findOne({Part: req.params.Part}, function(err, kmles){
            if(err) return res.status(500).json({error: err});
            if(!kmles) return res.status(404).json({error: 'Part not found'});
            res.json(kmles);
        })
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

    // UPDATE THE BOOK with new log
    app.put('/api/kmles/:Part/:Chapter', function(req, res){
        Kmle.update({ Part: req.params.Part, Chapter: req.params.Chapter }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'Chapter not found' });
            res.json( { message: 'Log updated' } );
        })
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

    // DELETE BOOK
    /*
    app.delete('/api/books/:book_id', function(req, res){
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
    app.get('/api/questions', function(req,res){
        Question.find(function(err, questions){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(questions);
        })
    });


    // Add Question
    app.post('/api/questions', function(req, res){
        var question = new Question();
        question.Part = req.body.Part;
        question.PartName = req.body.PartName;
        question.Chapter = req.body.Chapter;
        question.ChapName = req.body.ChapName;
        question.Question = req.body.Question;
        question.Answer = req.body.Answer;
        question.Comment1 = req.body.Comment1;
        question.Comment2 = req.body.Comment2;
        question.Logs = {logTime: Date.now(), userId: req.body.userId};

        question.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        });
    });


}