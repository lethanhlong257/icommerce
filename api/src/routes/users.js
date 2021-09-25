import express from 'express'
import {create} from '../utils/debug'
import db from '../services/core-services/db'

const router = express.Router();

const debug = create('dev')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  debug.log(await db.Product.findAll());
  res.send('respond with a resource');
});


export default router

