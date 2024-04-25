const { initializeApp } = require('firebase/app');
const firebaseConfig = require('./firebaseConfig.js')

const firebaseApp = initializeApp(firebaseConfig);

module.exports = firebaseApp

// npm install -g firebase-tools
// firebase login
// firebase init
// firebase deploy