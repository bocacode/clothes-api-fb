const { connectDb } = require ("./db")

  exports.updateCart = (req, res) => {
    const db = connectDb()
    const {cartId} = req.params
  
    db.collection("cart").doc(cartId).update(req.body)
      .then(()=> res.status(202).send({message: "updated"}))
      .catch(err => res.status(500).send(err))
  }
