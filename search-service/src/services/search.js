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

export default {
  searchProduct
}
