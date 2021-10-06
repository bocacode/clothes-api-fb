const { connectDb } = require("./db");

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
};

