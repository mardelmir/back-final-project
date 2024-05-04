# Documentación: Tienda de ropa
Aplicación web desarrollada en Node.js utilizando Express y Mongoose para crear una tienda de ropa con un catálogo de productos y un admin para el administrador. Los productos incluidos en el catálogo se guardan en una base de datos de mongo en Atlas.

## Índice
  - [Estructura de archivos](#estructura-de-archivos)
  - [Descripción de los archivos](#descripción-de-los-archivos)
    - [Carpeta src](#carpeta-src) 
    - [Carpeta test](#carpeta-test) 
    - [Carpeta public](#carpeta-public) 
  - [Funciones](#funciones)
    - [Funciones del controlador de productos](#funciones-del-controlador-de-productos)
    - [Funciones del controlador de autenticación](#funciones-del-controlador-de-autenticación)
    - [Funciones auxiliares](#funciones-auxiliares)
  - [Endpoints](#endpoints)
    - [Cualquier visitante](#cualquier-visitante)
    - [Tienda / API: usuarios sin identificar o identificados con perfil estándar](#tienda--api-usuarios-sin-identificar-o-identificados-con-perfil-estándar)
    - [Tienda / API: usuarios idetificados con perfil de administrador](#tienda--api-usuarios-identificados-con-perfil-de-administrador)
    - [Tienda: identificación de usuario](#tienda-identificación-de-usuario)
  - [Funcionamiento de la aplicación](#funcionamiento-de-la-aplicación)


## Estructura de archivos

La aplicación 'Tienda de ropa' posee la siguiente estructura de archivos: 

```
.
├── src
│   ├── config
│   │   ├── db.js
│   │   ├── session.js
│   │   └── firebase.js (BONUS) 
│   ├── controllers
│   │   ├── authController.js (BONUS)
│   │   └── productController.js
│   ├── docs (BONUS)
│   │   ├── basicInfo.js
│   │   ├── components.js
│   │   ├── index.js
│   │   └── products.js
│   ├── middlewares (BONUS)
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes
│   │   ├── authRoutes.js (BONUS)
│   │   ├── adminRoutes.js
│   │   ├── index.js
│   │   └── productRoutes.js
│   ├── utils
│   │   ├── helperFunctions.js
│   │   └── htmlTemplates.js
│   └── index.js
├── test (BONUS)
│   └── productController.test.js
├── public
│   ├── styles.css
│   └── img
├── .env
├── package.json
└── README.md (este documento)

```

## Descripción de los archivos

### Carpeta src

Carpeta principal del proyecto. Cada archivo incluido en las subcarpetas contiene la lógica necesaria para realizar las siguientes funciones:

#### Carpeta config
- `config/db.js`: establece la conexion a la base de datos MongoDB mediante Mongoose. Utiliza la dependencia `dotenv` para acceder al archivo `.env` y leer la `MONGO_URI`.

- `config/firebase.js`: contiene la configuración y conexión de firebase.

- `config/session.js`: utiliza los módulos `crypto` y `bcrypt` para generar y encriptar una clave secreta aleatoria para el secreto de la sesión.

#### Carpeta controllers
- `controllers/authController.js`: contiene un controlador con funciones para generar los formularios de registro e inicio de sesión para los usuarios y funciones para realizar el registro (como administrador o usuario), inicio de sesión y cierre de sesión de los usuarios utilizando Firebase Authentication. Incluye el emulador de Firebase Authentication para realizar pruebas a nivel local. Utiliza el modelo `User` para identificar y asignar un rol a cada usuario.

- `controllers/productController.js`: contiene un controlador con funciones que generan los formularios para incluir o moficar un producto, filtrar productos por categoría y responder a solicitudes CRUD (Crear, Leer, Actualizar, Eliminar). Utiliza el modelo `Product` para manejar los productos en la base de datos y devuelve las respuestas en formato HTML o JSON dependiendo de si en la URL encuentra la palabra "shop" o "api" respectivamente.

#### Carpeta docs
- `docs/basicInfo.js`: contiene la especificación OpenAPI para la API de la tienda, utiliza para documentar dicha API con Swagger.

- `docs/components.js`: contiene los esquemas para generar la documentación de la API con Swagger. 

- `docs/index.js`: archivo donde se importa y centraliza la información generada en los demás archivos de la carpeta y desde donde se exportará como un conjunto al index principal de la aplicación.

- `docs/products.js`: documenta cada endpoint de la aplicación.

#### Carpeta middleware
- `middlewares/authMiddlewares.js`: contiene el middleware para comprobar si el usuario está autenticado utilizando Firebase Authentication y `express-session`. Protege las rutas que solo puede manejar un usuario de tipo administrador. Comprueba que el usuario haya iniciado sesión y que su cuenta sea de tipo "admin".

#### Carpeta models
- `models/Product.js`: define el esquema del producto utilizando Mongoose.

- `models/User.js`: defien el esquema del usuario utilizando Mongoose.

#### Carpeta routes
- `routes/authRoutes.js`: contiene las rutas de autenticación de usuario en sesión. La funcionalidad de cada ruta se define mediante las funciones incluidas en el controlador de `authController.js`.

- `routes/adminRoutes.js`: contiene las rutas relacionadas con los productos de la tienda que son accesibles solo para los usuarios con perfil de administrador. La funcionalidad de cada ruta se define mediante las funciones del controlador `productController.js`.

- `routes/index.js`: importa todas las rutas definidas en el resto de archivos de la carpeta y protege las rutas importadas desde `adminRoutes.js` con el middleware de `authMiddleware.js`. Desde aquí se importan todas las rutas al archivo principal de la aplicación.

- `routes/productRoutes.js`: contiene las rutas relacionadas con los productos de la tienda que son accesibles tanto para visitantes sin registrar como para usuarios con perfil user (estándar). La funcionalidad de cada ruta se define mediante las funciones del controlador `productController.js`.

#### Carpeta utils
- `utils/helperFunctions.js`: contiene funciones auxiliares para generar el HTML que se envía como respuesta en las funciones de los controladores.
- `utils/htmlTemplates.js`: contiene fragmentos de HTML almacenado en variables. Estos fragmentos son utilizados por las funciones auxiliares para generar el HTML final que se sirve en las respuestas de las peticiones.

#### Fuera de una subcarpeta

- `index.js`: Archivo principal que inicia el servidor con Express, centraliza todas las acciones definidas en las demás subcarpetas. Utiliza métodos para analizar el cuerpo de las solicitudes que contienen datos en formato JSON y/o de formulario (application/x-www-form-urlencoded) y los hace accesibles mediante el req.body. También gestiona las sesiones de los usuarios, se conecta con la base de datos de MongoDB, define todas las rutas y sirve archivos estáticos (CSS).

### Carpeta test
- `test/productController.test.js`: contiene los tests que aseguran que las funciones utilizadas en esta aplicación funcionan adecuadamente.

### Carpeta public
- `public/styles.css`: contiene los estilos de la aplicación.
- `public/img`: carpeta donde se almacenan las imágenes utilizadas en la web.

### Fuera de una carpeta específica
- `.env`: contiene las variables de entorno: el puerto donde escucha el servidor, la uri de la base de datos y un secreto alternativo para las sesiones.

- `package.json`: contiene las dependencias del proyecto y los script para iniciar el servidor con node ("start": "node src/index.js") y para iniciar el servidor con nodemon ("dev": "nodemon src/index.js").

## Funciones
### Funciones del controlador de productos:

Todas las funciones devuelven la respuesta en HTML o JSON dependiendo de si en la ruta encuentran la palabra "shop" o "api".

- `getNewProductForm`: devuelve el formulario de creación de un nuevo producto. Solo se ejecuta en las rutas "admin".
- `createProduct`: Crea de un nuevo producto en la base de datos. Redirige a "/admin" o devuelve el producto creado en JSON.
- `filterCategroy`: Filtra y muestra los productos según su categoría. 
- `getProducts`: devuelve todos los productos existentes.
- `getProductById`: muestra los detalles de un producto específico por su ID.
- `getEditProductForm`: devuelve un formulario para editar un producto existente. Solo se ejecuta en las rutas "admin".
- `updateProduct`: Actualiza la información de un producto existente por su ID. Solo se ejecuta en las rutas "admin".
- `deleteProduct`: Elimina un producto existente por su ID. Solo se ejecuta en las rutas "admin".

### Funciones del controlador de autenticación:

- `getRegisterForm`: devuelve el formulario de registro de nuevo usuario. Incluye chechbox para indicar el perfil del usuario (user o admin).
- `createAccount`: realiza el registro de un nuevo usuario mediante Firebase Authentication, crea un nuevo usuario en la base de datos especificando su perfil, inicia sesión automáticamente en Firebase y express-session y redirige a `/shop/products` o `/shop/admin` según el perfil del nuevo usuario.
- `getLoginForm`: devuelve el formulario de inicio de sesión de usuario.
- `login`: realiza el incio de sesión de un usuario utilizando Firebase Authentication y express-session y redirige a la ruta correspondiente según el perfil del usuario.
- `logout`: cierra la sesión del usuario actual en Firebase y express-session.

### Funciones auxiliares

- `generateHtml`: genera el HTML que se devuelve en las respuestas al servidor (incluye la generación del navBar).
- `generateIndex`: genera el HTML de la ruta raíz `/`. Inlcuye enlaces para acceder a la tienda (HTML), a la API (JSON) o a la documentación de la API.
- `populateEditForm`: pone como placeholder en el formulario de edición de un producto la información actualmente almacenada de ese producto.
- `printAllProducts` y `printSingleProduct`: genera el HTML de los productos almacenados en la base de datos e incluye un enlace para acceder a la vista detallada del producto (printAllProducts) o para volver (y para editar y borrar en el caso del administrador) a la lista de todos los productos.

## Endpoints

Esta app contiene diferentes endpoints a los que se accede según el perfil del usuario que realiza la petición: cliente (visitante sin identificar o usuario estándar) o administrador.

### Cualquier visitante

- `app.get('/')`: Raíz, da la opción de continuar a la tienda (HTML), a la API (JSON) o a la documentación de la API.

Según la selección del usuario, las siguientes rutas irán precedidas de:
- `/shop/` si selecciona la opción "Tienda".
- `/api/` si selecciona la opción "API".

Según este prefijo, la función correspondiente del controlador devolverá la respuesta en HTML o JSON.

Si selecciona la opción "Documentación API", se redirige al endpoint `/api/api-docs/`, donde se visualiza la documentación de la API con Swagger.

### Tienda / API: usuarios sin identificar o identificados con perfil estándar

- `router.get('/')`: redirecciona a `/products`.
- `router.get('/products', productController.getProducts)`: devuelve todos los productos. Cada producto incluye un enlace para ver sus detalles (HTML).
- `router.get('/products/:productId', productController.getProductById)`: devuelve toda la información almacenada del producto seleccionado (HTML o JSON).
- `router.post('/products/category', ProductController.filterCategory)`: filtra y devuelve los productos según la categoría seleccionada (HTML o JSON).


### Tienda / API: usuarios identificados con perfil de administrador

##### IMPORTANTE: para poder documentar correctamente y hacer operaciones con la API sin errores, las rutas `/api/admin` NO se han protegido, solo es necesario iniciar sesión como administrador en las rutas `/shop/admin`, que son con las que interactua el cliente.

Tras la identificación y autenticación del usuario como administrador los endpoints a los que puede acceder son:

- `router.get('/admin/new', ProductController.getNewProductForm)`: devuelve el formulario para añadir un nuevo producto a la base de datos.
- `router.post('/admin', ProductController.createProduct)`: añade un nuevo producto a la base de datos.
- `router.get('/admin', ProductController.getProducts)`: devuelve todos los productos. Cada producto incluye un enlace para ver sus detalles (HTML).
- `router.post('/admin/category', ProductController.filterCategory)`: filtra y devuelve los productos según la categoría seleccionada (HTML o JSON).
- `router.get('/admin/:productId', ProductController.getProductById)`: devuelve toda la información almacenada del producto seleccionado (HTML o JSON).
- `router.get('/admin/:productId/edit', ProductController.getEditProductForm)`: devuelve el formulario para editar un producto. Este formulario tiene como placeholder la información actualmente guardada de ese producto concreto.
- `router.put('/admin/:productId', ProductController.updateProduct)`: actualiza el producto y redirige a la vista indivudial de ese producto (HTML o JSON).
- `router.delete('/admin/:productId/delete', ProductController.deleteProduct)`: elimina un producto y redirige a `/admin` (HTML) o devuleve el producto eliminado junto con un mensaje (JSON).


### Tienda: identificación de usuario

Endpoints utlizados para ejecutar la lógica de autenticación, que se realiza con `firebase` y `express-session`. Devuelve exclusivamente respuestas en HTML:

- `router.get('/login', authController.getLoginForm)`: devuelve el formulario para realizar el inicio de sesión. Desde aquí se accede también al formulario de registro.
- `router.post('/login', authController.login)`: gestiona el inicio de sesión con el email y la contraseña enviadas en el formulario. Si las credenciales son correctas, se inicia sesión y el usuario pasa a `/admin`, si no se redirige a `/login`.
- `router.get('/register', authController.getRegisterForm)`: devuelve el formulario de registro, donde se indica si el perfil del nuevo usuario es de tipo estándar o de tipo administrador.
- `router.post('/register', authController.createAccount)`: gestiona la creación de un nuevo usuario con el perfil especificado, inicia sesión automáticamente y redirige a `/products` o `/admin` según el tipo de perfil.
- `router.post('/logout', authController.logout)`: cierra la sesión del usuario y redirige a `/products`.


## Funcionamiento de la aplicación

Las dependencias de Node.js utilizadas para la elaboración de esta aplicación son:

- `bcrypt`: librería que proporciona funciones de hash de contraseñas seguras utilizando el algoritmo bcrypt. Es comúnmente utilizada para almacenar contraseñas de forma segura en aplicaciones web y otros sistemas que requieren autenticación.

- `crypto`: módulo nativo de Node.js que permite realizar operaciones criptográficas, como la generación de hashes, cifrado y descifrado de datos, generación de números aleatorios criptográficamente seguros, entre otras.

- `dotenv`: módulo que permite cargar variables de entorno desde un archivo .env en una aplicación Node.js. Esto permite separar la configuración de la aplicación del código fuente y facilita la gestión de variables sensibles como contraseñas y claves de API.

- `express`: entorno de trabajo en el que se ha desarrollado la app y por el cual se ha creado un servidor que escucha por el puerto especificado en las variables de entorno.

- `express-session`: middleware que facilita la gestión de sesiones de usuario en aplicaciones web. Permite almacenar y acceder a datos de sesión en el servidor.

- `firebase`: plataforma de desarrollo de aplicaciones móviles y web proporcionada por Google. La librería Firebase para Node.js permite integrar aplicaciones Node.js con los servicios de Firebase. En este caso, se ha utilizado para realizar la autenticación del usuario/administrador.

- `method-override`: middleware para Express que permite utilizar métodos HTTP como PUT o DELETE en formularios HTML, que normalmente solo admiten GET y POST.

- `mongoose`: librería de  de modelado de objetos MongoDB para Node.js que permite simplificar la definición de modelos y realizar consultas y peticiones a bases de datos alojadas en MongoDB Atlas.

- `nodemon`: herramienta de desarrollo para Node.js que monitoriza cambios en los archivos de un proyecto y reinicia automáticamente la aplicación cuando se detectan cambios.

- `swagger-ui-express`: middleware para express que proporciona una interfaz de usuario generada automáticamente para la documentación de API basada en el estándar OpenAPI. Simplifica la visualización y prueba de API directamente desde el navegador.

- `jest`: framework de pruebas unitarias desarrollado para JavaScript para crear, ejecutar y estructurar tests de funciones. Se han utilizado para probar las funciones de la aplicación. 