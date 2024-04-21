const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    uid: String,
    role: String
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

module.exports = User