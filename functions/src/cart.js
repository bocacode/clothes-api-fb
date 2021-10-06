const {connectDb} = require('./db')

exports.deleteCartItem = (req, res) => {
  const { itemId } = req.params;
  const db = connectDb();
  db.collection('cart')
    .doc(itemId)
    .delete()
    .then(() => res.status(202).send({ message: "deleted" }))
    .catch((err) => res.status(500).send(err));
};