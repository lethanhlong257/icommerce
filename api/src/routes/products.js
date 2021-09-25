import express from 'express'
import {create} from '../utils/debug'
import {db} from '../services/core-services'
import HttpStatusCodes from 'http-status-codes'

const router = express.Router()

const debug = create('product-controller')
/* GET product listing. */
router.get('/', async function(req, res, next) {
  try {
    const products = await db.Product.findAll({raw: true})

    res.json(products)
  }
  catch (error) {
    debug.error(error)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR')
  }
})

export default router

