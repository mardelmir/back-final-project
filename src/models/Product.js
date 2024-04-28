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
                // Validar que cada clave en el Map sea una talla permitida
                const allowedSizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];
                for (let key of value.keys()) {
                    if (!allowedSizes.includes(key)) {
                        return false;
                    }
                }
                return true;
            },
            message: props => `Invalid shoe size keys: ${[...props.value.keys()]}. Allowed sizes are 35 to 49.`
        },
        required: true
    },

    // size: {
    //     type: Map,  // Usamos un Map para almacenar las tallas y cantidades
    //     of: Number,  // El valor de cada entrada en el Map será un número, que representa la cantidad
    //     validate: {
    //       validator: function (value) {
    //         // Validar que cada clave en el Map sea una talla permitida
    //         const allowedSizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49'];
    //         for (let key of value.keys()) {
    //           if (!allowedSizes.includes(key)) {
    //             return false;
    //           }
    //         }
    //         return true;
    //       },
    //       message: props => `Invalid shoe size keys: ${[...props.value.keys()]}. Allowed sizes are 35 to 49.`
    //     }
    // },

    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema, 'Products')

module.exports = Product