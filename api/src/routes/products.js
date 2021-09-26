import express from 'express'
import {getAllProduct, filterProductCtrl, sortProductCtrl, searchProductCtrl} from '../controller/product'

const router = express.Router()

/* GET product listing. */
router.get('/', getAllProduct)
router.get('/filter', filterProductCtrl)
router.get('/sort', sortProductCtrl)
router.get('/search', searchProductCtrl)

export default router

