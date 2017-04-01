var controller = require('./controller');

var express = require('express');
var router = express.Router();

router.post('/savePmo', controller.savePmo);

router.post('/saveGoods', controller.saveGoods);
router.get('/getAllGoods', controller.getAllGoods);
router.get('/getGoodsByType', controller.getGoodsByType);

module.exports = router;