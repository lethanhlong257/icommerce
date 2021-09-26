import {db} from './core-services'
import {create} from '../utils/debug'
const {Op} = require('sequelize');

const debug = create('search')
async function searchProduct(payloadRequest) {
  const {keyword = ''} = payloadRequest
  let keywordFilter = {}
  const result = {
    value: '',
    error: ''
  }

  if (keyword) {
    keywordFilter = {
      [Op.or]: [
        {name: {[Op.iLike]: '%' + keyword + '%'}},
        {branch: {[Op.iLike]: '%' + keyword + '%'}},
        {color: {[Op.iLike]: '%' + keyword + '%'}},
        {description: {[Op.iLike]: '%' + keyword + '%'}}
      ]
    }
  }

  try {
    const products = await db.Product.findAll({
      where: keywordFilter,
      raw: true
    })
    console.log('products', products)
    result.value = JSON.stringify(products)
  }
  catch (error) {
    debug.error('error', error)
    result.error = JSON.stringify(error)
    console.log(error)
  }
  
  return result
}

async function filterProduct(payloadRequest) {
  const {name = '', minPrice = 0, maxPrice = 99999999999, branch = '', color = ''} = payloadRequest
  const criterias = {
    price: {[Op.between]: [minPrice, maxPrice]}
  }
  
  const result = {error: '', value: ''}

  if (name) criterias.name = name
  if (branch) criterias.branch = branch
  if (color) criterias.color = color

  try {
    const products = await db.Product.findAll({
      where: criterias,
      raw: true
    })

    result.value = JSON.stringify(products)
  }
  catch (error) {
    debug.error(error)
    result.error = JSON.stringify(error)
  }
  
  return result
}

export default {
  searchProduct,
  filterProduct
}
