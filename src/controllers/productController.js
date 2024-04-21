const Product = require('../models/Product.js')
const { generateHtml, populateEditForm, printAllProducts, printSingleProduct } = require('../utils/helperFunctions.js')
const { newProductForm, notFound } = require('../utils/htmlTemplates.js')

const ProductController = {
    redirect(req, res) {
        req.originalUrl.includes('api')
            ? res.redirect('/api/products')
            : res.redirect('/shop/products')
    },
    
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
        const apiView = req.originalUrl.includes('api')
        try {
            const product = await Product.create({ ...req.body })
            apiView === false
                ? res.status(201).redirect('/shop/admin')
                : res.status(201).json({ message: 'Product successfully created', product })

        } catch (error) {
            console.log(error);
            apiView === false
                ? res.status(500).send('Error: Could not create product')
                : res.status(500).json({ message: 'Error: Could not create product' })
        }
    },

    filterCategory(req, res) {
        const viewType = req.originalUrl.includes('admin') === true ? 'admin' : 'products'
        res.redirect(`/shop/${viewType}/?category=${encodeURIComponent(req.body.categoryBtn)}`)
    },

    async getProducts(req, res) {
        const adminView = req.originalUrl.includes('admin')
        const apiView = req.originalUrl.includes('api')

        try {
            let products = ''
            req.query.category !== undefined
                ? products = await Product.find({ category: req.query.category })
                : products = await Product.find({})

            const productsHtml = printAllProducts(products, adminView)
            const html = generateHtml(productsHtml, req, adminView)

            apiView === false
                ? res.status(200).send(html)
                : res.status(200).json({ message: `${products.length} Products successfully retrieved`, products })
        }
        catch (error) {
            console.log(error);
            apiView === false
                ? res.status(500).send('Error: Could not get products')
                : res.status(500).json({ message: 'Error: Could not get products' })
        }
    },

    async getProductById(req, res) {
        const adminView = req.originalUrl.includes('admin')
        const apiView = req.originalUrl.includes('api')
        const productId = req.params.productId

        try {
            const product = await Product.findById(productId);
            const productHtml = printSingleProduct(product, productId, adminView)
            const html = generateHtml(productHtml, req, adminView)
            const notFoundHtml = generateHtml(notFound, req, adminView)

            !product
                ? apiView === false
                    ? res.status(404).send(notFoundHtml)
                    : res.status(404).json({ message: 'Product not found' })
                : apiView === false
                    ? res.status(200).send(html)
                    : res.status(200).json({ message: 'Product successfully retrieved', product })

        }
        catch (error) {
            console.log(error);
            apiView === false
                ? res.status(500).send(generateHtml(notFound, req, adminView))
                : res.status(500).json({ message: 'Error: Could not get specified product' })
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
        const apiView = req.originalUrl.includes('api')
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

            if (!storedProduct) { res.status(404).json({ message: 'Product not found' }) }
            apiView === false
                ? res.status(200).redirect(`/shop/admin/${req.params.productId}`)
                : res.status(200).json({ message: 'Product successfully updated', updatedProduct })
        }
        catch (error) {
            console.log(error);
            apiView === false
                ? res.status(500).send('Error: Could not update product')
                : res.status(500).json({ message: 'Error: Could not update product' })
        }
    },

    async deleteProduct(req, res) {
        const apiView = req.originalUrl.includes('api')
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
            if (!deletedProduct) { res.status(404).json({ message: 'Product not found' }) }
            apiView === false
                ? res.status(200).redirect('/shop/admin')
                : res.status(200).json({ message: 'Product successfully deleted', deletedProduct })
        }
        catch (error) {
            console.log(error);
            apiView === false
                ? res.status(500).send('Error: Could not delete product')
                : res.status(500).json({ message: 'Error: Could not delete product' })
        }
    }
}

module.exports = ProductController