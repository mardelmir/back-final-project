const Product = require('../models/Product.js')

const ProductController = {
    async createProduct(req, res) {
        try {
            const product = await Product.create({ ...req.body })
            console.log(product)
            res.status(201).json({ message: 'Product successfully created', result: product })

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error: Could not create product' })
        }
    },

    async getProducts(req, res) {
        try {
            const products = await Product.find({})
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
        const { name, description, img, gender, use, size, quantity, price } = req.body
        try {
            const storedProduct = await Product.findById(req.params.productId)
            const updatedProduct = await Product.findByIdAndUpdate(req.params.productId,
                {
                    name: name || storedProduct.name,
                    description: description || storedProduct.description,
                    img: img || storedProduct.img,
                    category: {
                        gender: gender || storedProduct.category.gender,
                        use: use || storedProduct.category.use
                    },
                    size: {
                        [size]: quantity || storedProduct.size
                    },
                    price: price || storedProduct.price
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