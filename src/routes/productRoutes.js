const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

router.get('/products', ProductController.getProducts)
router.get('/products/:productId', ProductController.getProductById)

module.exports = router