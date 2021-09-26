import express from 'express'
import {create} from '../utils/debug'
import {db} from '../services/core-services'
import HttpStatusCodes from 'http-status-codes'
import searchServiceGrpcClient from '../services/grpc/search-service-grpc-client'

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

router.get('/search', async function (req, res) {
  const {keyword} = req.query
  let result
  try {
    const {value} = await searchServiceGrpcClient.searchProduct(keyword)
    if (value) {
      result = JSON.parse(value)
    }
  }
  catch(error) {
    debug.error(error)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
  }
  
  
  res.json(result)
})

export default router

