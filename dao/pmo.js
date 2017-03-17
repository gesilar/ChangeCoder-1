var Pmo = require('../models').Pmo;
var _ = require('lodash');

function save(entity, callback) {
  var pmo = new Pmo();
  _.extend(pmo, entity);
  pmo.save(function(err){
    if (err) {
      throw err;
    }
  }).then(callback);
}

module.exports = {
  save: save
};