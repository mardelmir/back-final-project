const { initializeApp } = require('firebase/app');
const firebaseConfig = require('./firebaseConfig.js')

const firebaseApp = initializeApp(firebaseConfig);

module.exports = firebaseApp


// En caso de necesitar la configuración de otra forma para el deploy:
// require('dotenv').config()

// const firebaseConfig = {
//     apiKey: process.env.APIKEY,
//     authDomain: process.env.AUTHDOMAIN,
//     projectId: process.env.PROJECTID,
//     storageBucket: process.env.STORAGEBUCKET,
//     messagingSenderId: process.env.MESSAGINGSENDERID,
//     appId: process.env.APPID
// }