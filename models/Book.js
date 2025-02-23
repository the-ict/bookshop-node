const mongoose = require("mongoose")

const Book = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    category: {
        type: [String],
        require: true
    },
    file: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    sold: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["slider", "market"],
        default: "market"
    },
    author: {
        type: String,
        require: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Book", Book)