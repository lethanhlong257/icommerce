import express from 'express'
import {create} from '../utils/debug'
import {db} from '../services/core-services'
import HttpStatusCodes from 'http-status-codes'
import searchServiceGrpcClient from '../services/grpc/search-service-grpc-client'
import {saveActivity} from '../services/activities'

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

  saveActivity('GET /v1/products', {})
})

router.get('/filter', async function (req, res) {
  const {name, minPrice, maxPrice, branch, color} = req.query

  let result
  const data = {name, minPrice, maxPrice, branch, color}
  try {
    const {value} = await searchServiceGrpcClient.filterProduct({name, minPrice, maxPrice, branch, color})
    if (value) {
      result = JSON.parse(value)
    }

    res.json(result)
  }
  catch(error) {
    debug.error(error)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
  }

  saveActivity('GET /v1/products/filter', data)
})

router.get('/sort', async function (req, res) {
  let {sortBy = 'name', type = 'desc'} = req.query

  const acceptableCriteria = [
    'name', 'price', 'branch', 'color'
  ]

  try {
    if (acceptableCriteria.indexOf(sortBy) === -1) {
      return res.status(HttpStatusCodes.BAD_REQUEST).send('sortBy should be in ' + JSON.stringify(acceptableCriteria))
    }

    if (!type.toLowerCase() === 'desc' || !type.toLowerCase() === 'asc') {
      return res.status(HttpStatusCodes.BAD_REQUEST).send('type should be ASC or DESC')
    }

    const products = await db.Product.findAll({
      order: [[sortBy, type]]
    })

    res.json(products)
  }
  catch (error) {
    debug.error(error)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
  }

  saveActivity('GET /v1/products/sort', {sortBy, type})
})

router.get('/search', async function (req, res) {
  const {keyword} = req.query
  let result
  try {
    const {value} = await searchServiceGrpcClient.searchProduct(keyword)
    if (value) {
      result = JSON.parse(value)
    }

    res.json(result)
  }
  catch(error) {
    debug.error(error)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
  }

  saveActivity('GET /v1/products/search', {keyword})
})

export default router

