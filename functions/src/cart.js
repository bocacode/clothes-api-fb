const { connectDb } = require ("./db")

exports.updateCart = (req, res) => {
  const db = connectDb()
  const {cartId} = req.params

  db.collection("cart").doc(cartId).update(req.body)
    .then(()=> res.status(202).send({message: "updated"}))
    .catch(err => res.status(500).send(err))
}

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
