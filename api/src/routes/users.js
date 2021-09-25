import express from 'express'
import {create} from '../utils/debug'

const router = express.Router();

const debug = create('dev')
/* GET users listing. */
router.get('/', function(req, res, next) {
  debug.log('name', 'do some thin')
  res.send('respond with a resource');
});


export default router

