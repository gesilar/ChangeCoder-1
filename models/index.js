var mongoose = require('mongoose');
var pmo= require('./pmo');
var Goods= require('./goods');

const config = {
    dbconnect: 'mongodb://coder:123@139.196.12.240:27017/changecoder'
}

mongoose.connect(process.env.MONGOLAB_URI || config.dbconnect, function (err) {
  //if (err) throw err;
});

module.exports = {
  Pmo: mongoose.model('Pmo'),
  Goods: mongoose.model('Goods')
};