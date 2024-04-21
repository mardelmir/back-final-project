const firebaseApp = require('../config/firebase')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth')
const { } = require('firebase/auth')
const auth = getAuth(firebaseApp)

const { generateHtml } = require('../utils/helperFunctions')
const { registerForm, loginForm } = require('../utils/htmlTemplates')
const User = require('../models/User')

const authController = {
    getRegisterForm(req, res) {
        try { res.status(200).send(generateHtml(registerForm, req)) }
        catch (error) {
            console.log(error)
            res.status(500).send('Error: Could not get New Product Form')
        }
    },

    async createAccount(req, res) {
        const { email, password, role } = req.body
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const userRole = role === 'on' ? 'admin' : 'user'
            await User.create({ uid: userCredential.user.uid, role: userRole })

            const loginCredential = await signInWithEmailAndPassword(auth, email, password)
            req.session.token = await loginCredential.user.getIdToken()

            userRole == 'admin' ? res.status(201).redirect('/shop/admin') : res.status(201).redirect('/shop/products')
        }
        catch (error) {
            console.log(error)
            if (error.code == 'auth/weak-password') {
                const warning = registerForm.replace(`<div class="warning"></div>`, `<div class="warning">Contraseña insegura, genera una nueva contraseña</div>`)
                res.send(generateHtml(warning, req))
            } else if (error.code == 'auth/email-already-in-use') {
                const err = registerForm.replace(`<div class="warning"></div>`, `<div class="warning">Email ya registrado</div>`)
                res.send(generateHtml(err, req))
            } else {
                const err = registerForm.replace(`<div class="warning"></div>`, `<div class="warning">${error.message}</div>`)
                res.send(generateHtml(err, req))
            }
        }
    },

    getLoginForm(req, res) {
        try { res.status(200).send(generateHtml(loginForm, req)) }
        catch (error) {
            console.log(error)
            res.status(500).send('Error: Could not get New Product Form')
        }
    },

    async login(req, res) {
        const { email, password } = req.body
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = await User.find({ uid: userCredential.user.uid })
            req.session.uid = userCredential.user.uid
            req.session.role = user[0].role

            user[0].role == 'admin' ? res.status(201).redirect('/shop/admin') : res.status(201).redirect('/shop/products')
        }
        catch (error) {
            console.log(error)
            if (error.code == 'auth/wrong-password') {
                const warning = loginForm.replace(`<div class="warning"></div>`, `<div class="warning">Contraseña icorrecta, inténtalo de nuevo</div>`)
                res.send(generateHtml(warning, req))
            } else if (error.code == 'auth/user-not-found') {
                const warning = loginForm.replace(`<div class="warning"></div>`, `<div class="warning">Usuario no registrado</div>`)
                res.send(generateHtml(warning, req))
            }
            else {
                const err = loginForm.replace(`<div class="warning"></div>`, `<div class="warning">${error.message}</div>`)
                res.send(generateHtml(err, req))
            }
        }
    },

    async logout(req, res) {
        await signOut(auth)
        req.session.destroy()
        res.redirect('/shop/products')
    }
}

module.exports = authController