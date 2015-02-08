var express = require('express');
var bodyParser = require('body-parser');
var _ = require("./js/underscore-min.js");
var fs = require("fs");
var data = require("./data.js");

var app = express();

app.use('/', express.static(__dirname + '/pages'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/ad', express.static(__dirname + '/images/ad'));

app.use( bodyParser.json() );


app.get('/api/goats', function (req, res) {

  data.getGoats(res, function(err, goats, res){
    if (err){
      res.json({result: false, error: err});
    } else {
      res.json(goats);
    }
  })
})



app.get('/api/getAd', function(req, res) {

  fs.readdir('./images/ad', function(err, f){

    var current = +req.query.current;
    var index = Math.floor(Math.random() * f.length);

    while (current == index){
      index = Math.floor(Math.random() * f.length);
    }
    var path = '/ad/' + f[index];
    res.json({'adPath': path, 'index': index});
  })

});

app.post('/api/goat', function(req, res){
  console.log('inside the app.js function');
  console.log(req.body.goat);

  if (!req.body || !req.body.goat) {
    res.json({success: false});
    return;
  }

  var goat = req.body.goat;

  data.updateGoat(goat, function(err){
    console.log(err);
  })

  res.json({success: true});
})

var server = app.listen(8998, function () {
  console.log('Example app listening on 8998')
})