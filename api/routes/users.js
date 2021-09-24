const express = require('express');
const router = express.Router();
const {create} = require('../utils/debug');

const debug = create('dev')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
