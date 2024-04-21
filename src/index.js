const express = require('express')
const app = express()
const session = require('express-session')
const methodOverride = require('method-override')
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')
const cors = require('cors')

const dbConnection = require('./config/db')
const productRoutes = require('./routes/index')

require('dotenv').config()
dbConnection()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: require('./config/session') || process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use('/', productRoutes)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))