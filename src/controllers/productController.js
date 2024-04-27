const Product = require('../models/Product.js')

const ProductController = {
    redirect(req, res) { res.redirect('/api/v1/products') },

    async createProduct(req, res) {
        try {
            const product = await Product.create({ ...req.body })
            res.status(201).json({ message: 'Product successfully created', result: product })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error: Could not create product' })
        }
    },

    filterCategory(req, res) {
        const viewType = req.originalUrl.includes('admin') === true ? 'admin' : 'products'
        res.redirect(`/${viewType}/?category=${encodeURIComponent(req.body.categoryBtn)}`)
    },

    async getProducts(req, res) {
        try {
            let products = ''
            req.query.category !== undefined
                ? products = await Product.find({ category: req.query.category })
                : products = await Product.find({})

            res.status(200).json({ message: `${products.length} Products successfully retrieved`, result: products })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error: Could not get products' })
        }
    },

    async getProductById(req, res) {
        const productId = req.params.productId
        try {
            const product = await Product.findById(productId);

            !product
                ? res.status(404).json({ message: 'Product not found' })
                : res.status(200).json({ message: 'Product successfully retrieved', result: product })

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error: Could not get specified product' })
        }
    },

    async updateProduct(req, res) {
        try {
            const storedProduct = await Product.findById(req.params.productId)
            const updatedProduct = await Product.findByIdAndUpdate(req.params.productId,
                {
                    name: req.body.name || storedProduct.name,
                    description: req.body.description || storedProduct.description,
                    img: req.body.img || storedProduct.img,
                    category: req.body.category || storedProduct.category,
                    size: req.body.size || storedProduct.size,
                    price: req.body.price || storedProduct.price
                }, { new: true })

            !storedProduct
                ? res.status(404).json({ message: 'Product not found' })
                : res.status(200).json({ message: 'Product successfully updated', result: updatedProduct })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error: Could not update product' })
        }
    },

    async deleteProduct(req, res) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
            !deletedProduct
                ? res.status(404).json({ message: 'Product not found' })
                : res.status(200).json({ message: 'Product successfully deleted', result: deletedProduct })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error: Could not delete product' })
        }
    }
}

module.exports = ProductController