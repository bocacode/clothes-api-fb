const { connectDb } = require('./db')

exports.deleteCartItem = (req, res) => {
  const { itemId } = req.params;
  const db = connectDb();
  db.collection('cart')
    .doc(itemId)
    .delete()
    .then(() => res.status(202).send({ message: "deleted" }))
    .catch((err) => res.status(500).send(err));
};

exports.createCartItem = (req, res) => {
  if (!req.body.customerId || !req.body.productId || !req.body.qty|| !req.body.totalPrice) {
    res.status(401).send({ message: "Invalid request" });
    return;
  }
  let newItem = {
    customerId: req.body.customerId,
    productId: req.body.productId,
    totalPrice: Number(req.body.totalPrice.toFixed(2)),
    qty: req.body.qty,
  };
  const db = connectDb();
  db.collection("cart")
    .add(newItem)
    .then((docRef) => res.status(201).send({ id: docRef.id }))
    .catch((err) => res.status(500).send(err));
}

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
