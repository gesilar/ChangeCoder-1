var pmo = require('./controller');

var express = require('express');
var router = express.Router();

router.post('/savePmo', pmo.savePmo);

module.exports = router;