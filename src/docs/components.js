module.exports = {
    components: {
        schemas: {
            Product: {
                type: "object",
                properties: {
                    _id: {
                        type: "objectId",
                        description: "Product identification number",
                        example: "65ee309e22363b81ae82281c"
                    },
                    name: {
                        type: "string",
                        description: "Name of the product",
                        example: "Gafas de sol"
                    },
                    description: {
                        type: "string",
                        description: "Product description",
                        example: "Gafas de sol para el verano"
                    },
                    img: {
                        type: "string",
                        description: "Image of the product",
                        example: "gafas-sol.jpg"
                    },
                    category: {
                        type: "string",
                        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
                        description: "Category of the product, it can be 'Camisetas', 'Pantalones', 'Zapatos' or 'Accesorios' ",
                        example: "Accesorios"
                    },
                    size: {
                        type: "string",
                        enum: ['XS', 'S', 'M', 'L', 'XL', 'Unitalla'],
                        description: "Size of the product, it can be 'XS', 'S', 'M', 'L', 'XL' or 'Unitalla'",
                        example: "Unitalla"
                    },
                    price: {
                        type: "number",
                        description: "Price for the product, admits up to 2 decimals",
                        example: "40.15"
                    },
                    createdAt: {
                        type: "date",
                        description: "Specifies the time and date in which the product was created",
                        example: "2024-03-10T22:13:50.935+00:00"
                    },
                    updatedAt: {
                        type: "date",
                        description: "Specifies the time and date in which the product was last modified",
                        example: "2024-03-10T23:07:58.584+00:00"
                    },
                    __v0: {
                        type: "number",
                        description: "Specifies the version of the document",
                        example: "0"
                    }
                }
            },
            swaggerProduct: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "Name of the product",
                        example: "Gafas de sol"
                    },
                    description: {
                        type: "string",
                        description: "Product description",
                        example: "Gafas de sol para el verano"
                    },
                    img: {
                        type: "string",
                        description: "Image of the product",
                        example: "gafas-sol.jpg"
                    },
                    category: {
                        type: "string",
                        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
                        description: "Category of the product, it can be 'Camisetas', 'Pantalones', 'Zapatos' or 'Accesorios' ",
                        example: "Accesorios"
                    },
                    size: {
                        type: "string",
                        enum: ['XS', 'S', 'M', 'L', 'XL', 'Unitalla'],
                        description: "Size of the product, it can be 'XS', 'S', 'M', 'L', 'XL' or 'Unitalla'",
                        example: "Unitalla"
                    },
                    price: {
                        type: "number",
                        description: "Price for the product, admits up to 2 decimals",
                        example: "40.15"
                    }
                }
            }
        }
    }
}