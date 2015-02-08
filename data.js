var config = require('./config.js')
var mongoose = require('mongoose')
mongoose.connect(config.getDatabaseConnection())

var upsert = function(model, data, f){
  if (!data._id){
    model.create(data, f);
  } else {
    var id = data._id;
    delete data._id;
    model.findOneAndUpdate({_id: id}, data, f);
  }
}

// -- Goats
var Goat = mongoose.model('Goat', {name: String, price: Number});

exports.getGoats = function(res, callback){
  Request.find({}, function(err, goats){
    callback(err, goats, res);
  })
}

exports.updateGoat = function(goat, f){
  upsert(Goat, goat, f);
}
