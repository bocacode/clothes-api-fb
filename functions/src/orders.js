const { connectDb } = require("./db")

exports.getCartItemById = (req, res) => {
    const db = connectDb()
    const { cartItemId } = req.params

    db.collection("orders").doc(cartItemId).get()
    .then((doc) => {
        let item = doc.data()
        item.id = doc.id
        res.send(item)
    })
    .catch((err) => res.status(500).send(err))
}  