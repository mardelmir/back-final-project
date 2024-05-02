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
        type: Map,
        of: Number,
        validate: {
            validator: function (value) {
                // Validate that each key is an allowed size
                const allowedSizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];
                for (let key of value.keys()) {
                    if (!allowedSizes.includes(key)) { return false }
                }
                return true;
            },
            message: props => `Invalid shoe size key: ${[...props.value.keys()]}. Allowed sizes are 35 to 49.`
        },
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema, 'Products')

module.exports = Product