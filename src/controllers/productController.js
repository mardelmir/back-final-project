const Product = require('../models/Product.js')
const { generateHtml, populateEditForm, printAllProducts, printSingleProduct } = require('../utils/helperFunctions.js')
const { newProductForm, notFound } = require('../utils/htmlTemplates.js')

const ProductController = {
    redirect(req, res) { res.redirect('/products') },

    getNewProductForm(req, res) {
        const adminView = req.originalUrl.includes('admin')
        const apiView = req.originalUrl.includes('api')
        try {
            const html = generateHtml(newProductForm, req, adminView)
            apiView === false
                ? res.status(200).send(html)
                : res.status(200).json({ message: 'New Product Form successfully retrieved', html: html })

        } catch (error) {
            console.log(error);
            apiView === false
                ? res.status(500).send('Error: Could not get New Product Form')
                : res.status(500).json({ message: 'Error: Could not get New Product Form' })
        }
    },

    async createProduct(req, res) {
        try {
            const product = await Product.create({ ...req.body })
            res.status(201).json({ message: 'Product successfully created', product })

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

            res.status(200).json({ message: `${products.length} Products successfully retrieved`, products })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error: Could not get products' })
        }
    },

    async getProductById(req, res) {
        const adminView = req.originalUrl.includes('admin')
        const productId = req.params.productId

        try {
            const product = await Product.findById(productId);
            const productHtml = printSingleProduct(product, productId, adminView)
            const html = generateHtml(productHtml, req, adminView)
            const notFoundHtml = generateHtml(notFound, req, adminView)

            !product
                ? res.status(404).json({ message: 'Product not found' })
                : res.status(200).json({ message: 'Product successfully retrieved', product })

        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error: Could not get specified product' })
        }
    },

    async getEditProductForm(req, res) {
        const adminView = req.originalUrl.includes('admin')
        const apiView = req.originalUrl.includes('api')
        try {
            const html = generateHtml(await populateEditForm(req.params.productId), req, adminView)
            apiView === false
                ? res.status(200).send(html)
                : res.status(200).json({ message: 'Edit Product Form successfully retrieved', html: html })

        } catch (error) {
            console.log(error);
            apiView === false
                ? res.status(500).send('Error: Could not get Edit Product Form')
                : res.status(500).json({ message: 'Error: Could not get Edit Product Form' })
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
                : res.status(200).json({ message: 'Product successfully updated', updatedProduct })
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
                : res.status(200).json({ message: 'Product successfully deleted', deletedProduct })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error: Could not delete product' })
        }
    }
}

module.exports = ProductController