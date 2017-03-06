var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/post', function (req, res) {
    var str = req.query.str;
    saveInDatabase(res, str, function (res) {
        res.redirect('/');

    });
});


function saveInDatabase(res, str, callback) {
    MongoClient.connect(mLabURL, function (err, db) {
        var col = db.collection('park');
        col.findOne(function (err, data) {
            if (data == null) {
                col.insert({ lol: str }, function (err, docs) {
                    if (err) {
                        console.log(err);
                        callback(res);
                    }
                    else {
                        callback(res);
                    }
                });
            }
            else {
                var stri = data.lol;
                col.update({ lol: stri }, { lol: str }, function (err, docs) {
                    if (err) {
                        console.log(err);
                        callback(res);
                    }
                    else {
                        callback(res);
                    }
                });
            }
        });
    });
}


router.get('/', function (req, res) {
    getFromDatabase(function (data) {
        res.render("index",{data:data});
    });
});


function getFromDatabase(callback) {
    MongoClient.connect(mLabURL, function (err, db) {
        var col = db.collection('park');
        col.find().limit(1).toArray(function (err, data) {
            callback(data[0].lol);
        });
    });
}

module.exports = router;
