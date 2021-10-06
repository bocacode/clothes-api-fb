const { connectDb } = require('./db')

exports.getAllCartItems = (req, res) => {
  const db = connectDb()
  db.collection('cart').get()
  .then(collection => {
    const allCartItems = collection.docs.map(doc => {
      let cartItem = doc.data()
      cartItem.id = doc.id
      return cartItem
    })
    res.send(allCartItems)
  })
}