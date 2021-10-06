const { connectDb } = require("./db");

exports.createCartItem = (req, res) => {
  if (!req.body.orderNum || !req.body.itemsNum || !req.body.totalPrice) {
    res.status(401).send({ message: "Invalid request" });
    return;
  }
  let newItem = {
    sku: Number(req.body.totalPrice.toFixed(2)),
    type: req.body.items,
    orderNum: req.body.orderNum,
  };
  const db = connectDb();
  db.collection("cart")
    .add(newItem)
    .then((docRef) => res.status(201).send({ id: docRef.id }))
    .catch((err) => res.status(500).send(err));
};
