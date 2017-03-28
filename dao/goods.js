var Goods = require('../models').Goods;
var _ = require('lodash');

function save(entity, callback) {
  var goods = new Goods();
  _.extend(goods, entity);
  goods.save(function(err){
    if (err) {
      throw err;
    }
  }).then(callback);
}

function getAll(callback) {
  Goods.find(function(err, goods){
    callback(goods);
  });
}

function getByType(findType, callback) {
  Goods.find({type: findType}, function(err, goods){
    callback(goods);
  });
}

module.exports = {
  save: save
};