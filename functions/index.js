const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, deleteCartItem } = require('./src/products')
const { deleteCartItem } = require("./src/orders")

const app = express()
app.use(cors())

app.get('/products/:productId', getProductById)
app.get('/products', getAllProducts)
app.post('/products', createProduct)
app.patch('/products/:productId', updateProduct)
app.delete('/products/:productId', deleteProduct)


app.delete('/orders/:itemId', deleteCartItem)
exports.app = functions.https.onRequest(app)