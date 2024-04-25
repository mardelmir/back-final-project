const firebaseApp = require('../config/firebase')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth')
const { getFirestore, collection, doc, setDoc, addDoc, getDoc } = require('firebase/firestore')

const auth = getAuth(firebaseApp)
const fireDb = getFirestore(firebaseApp)
const baseEndPoint = 'http://localhost:4321'

const authController = {
    async createAccount(req, res) {
        const { email, password, role } = req.body
        try {
            // Se crea un nuevo usuario y se inicia sesión
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const loginCredential = await signInWithEmailAndPassword(auth, email, password)

            // Se genera un token para session como medida adicional
            req.session.token = await loginCredential.user.getIdToken()

            // Se añade al usuario en una base de datos de firestore
            const uid = userCredential.user.uid
            const userRole = role ? 'admin' : 'user'
            const userRef = collection(fireDb, 'user')
            await setDoc(doc(userRef, uid), { uid, email, role: userRole })

            // Se redirige usuario al endpoint correspondiente según sus credenciales
            userRole === 'admin'
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
            // Se inicia sesión y se identifica qué tipo de usuario es (estándar o admin)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const uid = userCredential.user.uid
            const userRef = doc(fireDb, 'user', uid)
            const user = (await getDoc(userRef)).data()

            // Se genera session como capa adicional de seguridad
            req.session.uid = userCredential.user.uid
            req.session.role = user.role

            // Se redirige usuario al endpoint correspondiente según sus credenciales
            user.role === 'admin'
                ? res.status(201).redirect(`${baseEndPoint}/admin`)
                : res.status(201).redirect(`${baseEndPoint}/products`)
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