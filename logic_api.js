var controller = require('./controller');

var express = require('express');
var router = express.Router();

router.post('/savePmo', controller.savePmo);

router.post('/saveGoods', controller.saveGoods);
router.get('/getAllGoods', controller.saveGoods);
router.get('/getGoodsByType', controller.saveGoods);

module.exports = router;