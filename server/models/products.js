const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    stock: Number,
    image: String
})

const ProductModel = mongoose.model("products" , ProductSchema)
module.exports = ProductModel