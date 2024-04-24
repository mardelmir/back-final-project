const { initializeApp } = require('firebase/app');
require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
};

const firebaseApp = initializeApp(firebaseConfig);

module.exports = firebaseApp

// npm install -g firebase-tools
// firebase login
// firebase init
// firebase deploy