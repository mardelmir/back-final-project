const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    img: {
        type: String,
        required: true
    },
    category: {
        gender: {
            type: String,
            enum: ['Man', 'Woman'],
            required: true
        },
        use: {
            type: String,
            enum: ['Performance', 'Lifestyle'],
            required: true
        }
    },
    size: {
        type: String,
        enum: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44'],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product