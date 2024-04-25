const firebaseApp = require('../config/firebase')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth')
const auth = getAuth(firebaseApp)

const baseEndPoint = 'http://localhost:4321'

const authController = {
    async createAccount(req, res) {
        const { email, password, role } = req.body
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const userRole = role ? 'admin' : 'user'

            // await User.create({ uid: userCredential.user.uid, role: userRole })

            const loginCredential = await signInWithEmailAndPassword(auth, email, password)
            req.session.token = await loginCredential.user.getIdToken()

            userRole == 'admin'
                ? res.status(201).redirect(`${baseEndPoint}/admin`)
                : res.status(201).redirect(`${baseEndPoint}/products`)
        }
        catch (error) {
            console.log(error)
            if (error.code == 'auth/weak-password') {
                res.send({ error: 'Contraseña insegura, genera una nueva contraseña' })
            } else if (error.code == 'auth/email-already-in-use') {
                res.send({ error: 'Email ya registrado' })
            } else {
                res.send({ error: error.message })
            }
        }
    },

    async login(req, res) {
        const { email, password } = req.body
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            // const user = await User.find({ uid: userCredential.user.uid })
            req.session.uid = userCredential.user.uid
            // req.session.role = user[0].role

            // user[0].role == 'admin' ? res.status(201).redirect('/shop/admin') : res.status(201).redirect('/shop/products')
        }
        catch (error) {
            console.log(error)
            if (error.code == 'auth/wrong-password') {
                res.send({ error: 'Contraseña icorrecta, inténtalo de nuevo' })
            } else if (error.code == 'auth/user-not-found') {
                res.send({ error: 'Usuario no registrado' })
            } else {
                res.send({ error: error.message })
            }
        }
    },

    async logout(req, res) {
        await signOut(auth)
        req.session.destroy()
        res.redirect(`${baseEndPoint}/products`)
    }
}

module.exports = authController