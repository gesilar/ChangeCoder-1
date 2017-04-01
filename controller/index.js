var pmoDao = require('../dao').pmo;
var goodsDao = require('../dao').goods;

function savePmo(req, res, next) {
    entity = {
      name: req.body.name,
      company: req.body.company,
      tel: req.body.tel,
      person: req.body.person,
      partname: req.body.partname,
      type: req.body.type
    };
    pmoDao.save(entity, function(result){
      res.render('success.html');
    });
}

function saveGoods(req, res, next) {
    entity = {
      type: req.body.type,
      brand: req.body.brand,
      name: req.body.name,
      spec: req.body.spec,
      purchasePrice: req.body.purchasePrice,
      supplyPrice: req.body.supplyPrice,
      recommendedPrice: req.body.recommendedPrice,
      taobaoPrice: req.body.taobaoPrice,
      remark: req.body.remark,
      purchaseLocation: req.body.purchaseLocation,
    };
    goodsDao.save(entity, function(result){
      res.render('success.html');
    });
}

function getAllGoods(req, res, next) {
    goodsDao.getAll(function(result){
      res.json({data: result});
    });
}

function getGoodsByType(req, res, next) {
    var type = req.query.type;
    goodsDao.getByType(type, function(result){
      res.json({data: result});
    });
}


module.exports = {
  savePmo: savePmo,
  saveGoods: saveGoods,
  getAllGoods: getAllGoods,
  getGoodsByType: getGoodsByType
};