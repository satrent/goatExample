var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use('/', express.static(__dirname + '/pages'));

app.use( bodyParser.json() );

var goats = [
  {id: 1, name: 'Goat 1', price: "$535.60"},
  {id: 2, name: 'Goat 2', price: "$741.60"},
  {id: 3, name: 'Goat 3', price: "$545.60"},
  {id: 4, name: 'Goat 4', price: "$448.34"}
];

app.get('/api/goats', function (req, res) {
  res.json(goats);
})

app.post('/api/goat', function(req, res){
  if (!req.body || !req.body.goat) {
    res.json({success: false});
    return;
  }

  var goat = req.body.goat;

  for(var i=0; i<goats.length; i++){
    if (goats[i].id == goat.goatId) {
      goats[i].price = goat.newPrice;
    }
  }

  res.json({success: true});
})

var server = app.listen(8998, function () {
  console.log('Example app listening on 8998')
})