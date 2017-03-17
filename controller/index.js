var pmoDao = require('../dao').pmo;

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

module.exports = {
  savePmo: savePmo
};