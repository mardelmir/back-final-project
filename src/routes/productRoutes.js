const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

router.get('/', ProductController.redirect)
router.get('/products', ProductController.getProducts)
router.get('/products/:productId', ProductController.getProductById)
router.post('/products/category', ProductController.filterCategory)

module.exports = router