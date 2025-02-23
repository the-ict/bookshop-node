const mongoose = require("mongoose")

const User = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: false
    }
}, { timestamps: true })

module.exports = mongoose.model("User", User)