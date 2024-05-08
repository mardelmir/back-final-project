const firebaseApp = require('../config/firebase')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth')
const { getFirestore, collection, doc, setDoc, getDoc, Timestamp } = require('firebase/firestore')

const auth = getAuth(firebaseApp)
const fireDb = getFirestore(firebaseApp)

const authController = {
    async createAccount(req, res) {
        const { email, password, role } = req.body
        try {
            // Create new user and add user to firestore database
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const uid = userCredential.user.uid
            const userRole = role ? 'admin' : 'user'
            const userRef = collection(fireDb, 'user')
            await setDoc(doc(userRef, uid), {
                uid,
                registrationDate: Timestamp.fromDate(new Date()),
                role: userRole,
                email,
                orders: []
            })
            
            // Log in user and recover user info
            const loginCredential = await signInWithEmailAndPassword(auth, email, password)
            const loginRef = doc(fireDb, 'user', uid)
            const loginUser = (await getDoc(loginRef)).data()

            // Generate session as an added security measure
            req.session.uid = uid
            req.session.token = await loginCredential.user.getIdToken()
            req.session.role = userRole

            res.status(201).json({ 
                uid, 
                token: req.session.token, 
                role: userRole,
                orders: loginUser.orders
             })
        }
        catch (error) {
            console.log(error)
            if (error.code == 'auth/weak-password') {
                res.json({ error: 'Contraseña insegura, genera una nueva contraseña' })
            } else if (error.code == 'auth/email-already-in-use') {
                res.json({ error: 'Email ya registrado' })
            } else {
                res.json({ error: error.message })
            }
        }
    },

    async login(req, res) {
        const { email, password } = req.body
        try {
            // Log in and user identification as standard or admin type
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const uid = userCredential.user.uid
            const userRef = doc(fireDb, 'user', uid)
            const user = (await getDoc(userRef)).data()

            // Generate session as an added security measure
            req.session.uid = uid
            req.session.token = await userCredential.user.getIdToken()
            req.session.role = user.role

            res.status(200).json({ 
                uid, 
                token: req.session.token, 
                role: user.role,
                orders: user.orders
             })
        }
        catch (error) {
            console.log(error)
            if (error.code == 'auth/wrong-password') {
                res.json({ error: 'Contraseña icorrecta, inténtalo de nuevo' })
            } else if (error.code == 'auth/user-not-found') {
                res.json({ error: 'Usuario no registrado' })
            } else {
                res.json({ error: error.message })
            }
        }
    },

    async logout(req, res) {
        await signOut(auth)
        req.session.destroy()
        res.status(200).json({ message: 'Successful logout' })
    }
}

module.exports = authController
