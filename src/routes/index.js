const express = require('express')
const router = express.Router()
// const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const adminRoutes = require('./adminRoutes')
// const checkAuthState = require('../middlewares/authMiddleware')

router.use('/', productRoutes)
// router.use('/', authRoutes)
router.use('/', adminRoutes)

// router.use('/', checkAuthState, adminRoutes)

module.exports = router