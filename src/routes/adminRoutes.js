const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

router.get('/admin', ProductController.getProducts)
router.get('/admin/new', ProductController.getNewProductForm)
router.get('/admin/:productId', ProductController.getProductById)
router.get('/admin/:productId/edit', ProductController.getEditProductForm)

router.post('/admin', ProductController.createProduct)
router.post('/admin/category', ProductController.filterCategory)

router.put('/admin/:productId', ProductController.updateProduct)
router.delete('/admin/:productId/delete', ProductController.deleteProduct)

module.exports = router