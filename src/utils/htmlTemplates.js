const htmlArray = [`
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>Backend Corner Shop</title>
    </head>
    <body>
        <div class="header-wrapper">
        <header class="header">
        <a class="logo-container" href="/"></a>
`, `
        </header> 
        </div>  
        <main class="main" id="main">
`, `
        </main>
    </body>
</html>
`]

const index = `
<h1>INICIO</h1>
    <p class="question">¿Dónde te gustaría ir?</p>
    <div class="option-container">
        <a class="option" href="/shop/products">Tienda</a>
        <a class="option" href="/api/products">API</a>
        <a class="option" href="/api/api-docs">Documentación API</a>
    </div>`

const newProductForm = `
<h1>Crear producto</h1>
    <div class="newForm-container">
        <form class="form" id="newForm" action="/shop/admin" method="post">
            <label for="nameId">Nombre:</label>
            <input id="nameId" name="name" type="text" required>

            <label for="descriptionId">Descripción:</label>
            <textarea id="descriptionId" name="description"></textarea>

            <label for="priceId">Precio:</label>
            <input id="priceId" name="price" type="number" step="0.01" required>

            <label for="imgId">Imagen:</label>
            <input id="imgId" name="img" type="file" accept="image/*">

            <label for="categoryId">Categoría:</label>
            <select id="categoryId" name="category">
                <option value="Camisetas" name="Camisetas" selected>Camisetas</option>
                <option value="Pantalones" name="Pantalones">Pantalones</option>
                <option value="Zapatos" name="Zapatos">Zapatos</option>
                <option value="Accesorios" name="Accesorios">Accesorios</option>
            </select>

            <label for="sizeId">Talla:</label>
            <select id="sizeId" name="size">
                <option value="XS" name="XS" selected>XS</option>
                <option value="S" name="S">S</option>
                <option value="M" name="M">M</option>
                <option value="L" name="L">L</option>
                <option value="XL" name="XL">XL</option>
                <option value="Unitalla" name="Unitalla">Unitalla</option>
            </select>
            <button class="formBtn" type="submit">Crear</button>
        </form>
        <a class="formBtn cancelNew" href="/shop/admin">Cancelar</a>
    </div>`

const registerForm = ` 
<h1>Registro</h1>
    <form class="form" id="registerForm" action="/shop/register" method="post"">
        <label for="emailId">Email:</label>
        <input type="email" id="emailId" name="email" required>

        <label for="passId">Contraseña:</label>
        <input type="password" id="passId" name="password" required>

        <div class="role">
            <label for="roleId">Administrador</label>
            <input type="checkbox" id="roleId" name="role">
        </div>
        
        <div class="warning"></div>
        <div class="btn-container">
            <button class="formBtn" type="submit">Registrarse</button>
            <a class="formBtn" href="/shop/login">Login</a>
            <a class="formBtn" href="/shop/products">Volver</a>
        </div>
    </form>`

const loginForm = ` 
<h1>Iniciar sesión</h1>
    <form class="form" id="loginForm" action="/shop/login" method="post"">
        <label for="emailId">Email:</label>
        <input type="email" id="emailId" name="email" required>

        <label for="passId">Contraseña:</label>
        <input type="password" id="passId" name="password" required>

        <div class="warning"></div>
        <div class="btn-container">
            <button class="formBtn" type="submit">Login</button>
            <a class="formBtn" href="/shop/register">Registrarse</a>
            <a class="formBtn" href="/shop/products">Volver</a>
        </div>
    </form>`

const notFound = `
<h1>Producto no encontrado</h1>
    <div class="notFound-container">
        <p>Producto no encontrado, introduzca un id de producto válido</p>
        <a class="btn" href="/shop/products">Volver</a>
    </div>`

const unauthorizedUser = `
<h1>Usuario no autorizado</h1>
    <div class="unauthorized-container">
        <h4>Su usuario no tiene permisos de administrador</h4> 
        <p>Si desea acceder al admin, cierre la sesión actual e inicie sesión con una cuenta de administrador</p>
        <div class="auth-options">
            <a class="btn" href="/shop/products">Volver al catálogo de productos</a>
            <form action="/shop/logout" method="post">
                <button class="btn" type="submit">Logout</button>
            </form>
        </div>
    </div>`

const notLoggedIn = `
<h1>Usuario no identificado</h1>
    <div class="unauthorized-container">
        <h4>No se ha detectado inicio de sesión</h4> 
        <p>Si desea acceder al admin, inicie sesión con una cuenta de administrador</p>
        <div class="auth-options">
            <a class="btn" href="/shop/products">Volver al catálogo de productos</a>
            <a class="btn" href="/shop/login">Iniciar sesión</a>
        </div>
    </div>`

module.exports = { htmlArray, index, newProductForm, registerForm, loginForm, notFound, unauthorizedUser, notLoggedIn }