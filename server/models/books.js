const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: String,
    name: String,
    price: Number,
    pages: Number
})

const BookModel = mongoose.model("books" , BookSchema)
module.exports = BookModel