const functions = require("firebase-functions")
const express = require('express')
const cors = require('cors')
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./src/products')
const { getCartItemById } = require("./src/orders")
const { createCartItem, getAllCartItems, updateCart, deleteCartItem } = require('./src/cart')
const { getCustomers } = require('./src/customers')

const app = express()
app.use(cors())

app.get('/cart', getAllCartItems)
app.post('/cart', createCartItem)
app.patch('/cart/:cartId', updateCart)
app.delete('/cart/:itemId', deleteCartItem)

app.get('/orders/:cartItemId', getCartItemById)

app.get('/products/:productId', getProductById)
app.get('/products', getAllProducts)
app.post('/products', createProduct)
app.patch('/products/:productId', updateProduct)
app.delete('/products/:productId', deleteProduct)

app.get('/customers', getCustomers)

exports.app = functions.https.onRequest(app)
