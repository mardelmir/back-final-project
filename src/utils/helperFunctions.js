const { htmlArray, index } = require("./htmlTemplates");
const Product = require('../models/Product')

const generateIndex = (req, res) => {
    const [head, opMain, cloMainHtml] = htmlArray
    const indexHtml = [head, opMain, index, cloMainHtml].join('')
    res.status(200).send(indexHtml)
}

function generateHtml(content, req, adminView) {
    const [head, opMain, cloMainHtml] = htmlArray
    const viewType = adminView === true ? 'admin' : 'products'
    const nav = `
    <nav class="nav" id="nav">
        <a href="/shop/${viewType}">Productos</a>
        <form class="navForm" action="/shop/${viewType}/category" method="post">
            <button type="submit" name="categoryBtn" value="Camisetas">Camisetas</button>
        </form>
        <form class="navForm" action="/shop/${viewType}/category" method="post">
            <button type="submit" name="categoryBtn" value="Pantalones">Pantalones</button>    
        </form>
        <form class="navForm" action="/shop/${viewType}/category" method="post">
            <button type="submit" name="categoryBtn" value="Zapatos">Zapatos</button>
        </form>
        <form class="navForm" action="/shop/${viewType}/category" method="post">
            <button type="submit" name="categoryBtn" value="Accesorios">Accesorios</button>
        </form>
    </nav>`
    let userAction = ''

    if (req.session.uid && req.session.role) {
        adminView === true
            ? userAction = `
            <div class="actions">
                <a href="/shop/admin/new">Crear producto</a>
                <form class="navForm" action="/shop/logout" method="post">
                    <button type="submit">Logout</button>
                </form>
            </div>`
            : userAction = `
            <div class="actions">
                <form class="navForm" action="/shop/logout" method="post">
                    <button type="submit">Logout</button>
                </form>
            </div>`
    } else {
        userAction = `
        <div class="actions">
            <a href="/shop/login">Login</a>
        </div>`
    }
    return [head, nav, userAction, opMain, content, cloMainHtml].join('')
}

const selectedOption = (possibleOptions, storedInfo) => {
    const html = possibleOptions.map(element =>
        element != storedInfo
            ? `<option value="${element}" name="${element}">${element}</option>`
            : `<option value="${element}" name="${element}" selected>${element}</option>`
    )
    return html.join('')
}

async function populateEditForm(productId) {
    try {
        const storedProduct = await Product.findById(productId)
        const categories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'Unitalla'];
        return `
        <h1>Editar producto</h1>
            <form class="form" id="editForm" action="/shop/admin/${productId}?_method=PUT" method="post">
                <label for="nameId">Nombre:</label>
                <input id="nameId" name="name" type="text" placeholder="${storedProduct.name}">

                <label for="descriptionId">Descripción:</label>
                <textarea id="descriptionId" name="description" placeholder="${storedProduct.description}"></textarea>

                <label for="priceId">Precio:</label>
                <input id="priceId" name="price" type="number" step="0.01" placeholder="${storedProduct.price}">

                <label for="imgId">Imagen:</label>
                <input id="imgId" name="img" type="file" accept="image/*">

                <label for="categoryId">Categoría:</label>
                <select id="categoryId" name="category">
                    ${selectedOption(categories, storedProduct.category)}
                </select>

                <label for="sizeId">Talla:</label>
                <select id="sizeId" name="size">
                    ${selectedOption(sizes, storedProduct.size)}
                </select>
                <div class="actions">
                    <button class="formBtn" type="submit">Guardar</button>
                    <button class="formBtn" type="reset">Borrar</button>
                    <a class="formBtn" href="/shop/admin/${productId}">Cancelar</a>
                </div>
            </form>`
    } catch (error) {
        console.log(error);
        throw new Error('Error: Could not populate form', error)
    }
}

function printAllProducts(products, adminView) {
    const viewType = adminView === true ? 'admin' : 'products'
    let html = '';
    for (let product of products) {
        const detailBtn = `<a href="/shop/${viewType}/${product._id}" class="btn">Ver detalle</a>`
        html += `
        <div class="product-card">
            <div class="product-img">
                <img src="/img/${product.img}" alt="${product.name}">
            </div>
            <h2>${product.name}</h2>
            <p>${product.description || ''}</p>
            <h4>${product.price}€</h4>
            <div class="btn-container">
                ${detailBtn}
            </div>
        </div>`
    }
    return html;
}

function printSingleProduct(product, productId, adminView) {
    const viewType = adminView === true ? 'admin' : 'products'
    const returnBtn = `<a href="/shop/${viewType}/" class="btn">Volver</a>` || ''
    const editBtn = adminView === true
        ? `<a href="/shop/admin/${productId}/edit" class="btn">Editar</a>` : ''
    const deleteBtn = adminView === true
        ? `
        <form class="deleteForm" action="/shop/admin/${productId}/delete?_method=DELETE" method="POST">
            <button class="deleteBtn" type="submit">Borrar</button>
        </form>`
        : ''

    return `
        <div class="product-card">
            <div class="product-img">
                <img src="/img/${product.img}" alt="${product.name}">
            </div>
            <h2>${product.name}</h2>
            <p>${product.description || ''}</p>
            <h4>${product.price}€</h4>
            <p>Categoría: ${product.category}</p>
            <p>Talla: ${product.size}</p>
            <div class="btn-container">
                ${returnBtn}
                ${editBtn}
                ${deleteBtn}
            </div>
        </div>`
}

module.exports = { generateHtml, generateIndex, populateEditForm, printAllProducts, printSingleProduct }