var mongoose = require('mongoose');
var pmo= require('./pmo');

const config = {
    dbconnect: 'mongodb://139.196.12.240:27017/changecoder'
}

mongoose.connect(process.env.MONGOLAB_URI || config.dbconnect, function (err) {
  //if (err) throw err;
});

module.exports = {
  Pmo: mongoose.model('Pmo')
};