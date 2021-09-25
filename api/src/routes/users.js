import express from 'express'
import {create} from '../utils/debug'

const router = express.Router();

const debug = create('dev')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send('respond with a resource');
});


export default router

