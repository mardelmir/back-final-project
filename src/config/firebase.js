const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth')
const { getFirestore } = require('firebase/firestore')
const { getStorage } = require('firebase/storage')
require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
}

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const fireDb = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

module.exports = { firebaseApp, auth, fireDb, storage }