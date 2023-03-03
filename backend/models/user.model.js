const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountBalance: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema, 'user')