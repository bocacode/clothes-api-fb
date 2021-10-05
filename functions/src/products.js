const { connectDb } = require('./db')

exports.getAllProducts = (req, res) => {
  const db = connectDb()
  db.collection('clothes').get()
    .then(collection => {
      const clothes = collection.docs.map(doc => {
        let item = doc.data()
        item.id = doc.id
        return item
      })
      res.send(clothes)
    })
    .catch(err => res.status(500).send(err))
}

exports.getProductById = (req, res) => {
  const db = connectDb()
  const { productId } = req.params
  db.collection('clothes').doc(productId).get()
    .then(doc => {
      let item = doc.data()
      item.id = doc.id
      res.send(item)
    })
    .catch(err => res.status(500).send(err))
}

exports.createProduct = (req, res) => {
  // check that all required fields are present
  if(!req.body.sku || !req.body.type || !req.body.price) {
    res.status(401).send({ message: 'Invalid request' })
    return
  }
  // construct new clothing from the body
  let newItem = {
    sku: req.body.sku,
    type: req.body.type,
    price: Number(req.body.price.toFixed(2)),
    graphic: (req.body.graphic) ? true : false,
  }
  if(req.body.sizes) newItem.sizes = req.body.sizes
  if(req.body.brand) newItem.brand = req.body.brand
  if(req.body.color) newItem.color = req.body.color
  if(req.body.style) newItem.style = req.body.style

  const db = connectDb()
  db.collection('clothes').add(newItem)
    .then(docRef => res.status(201).send({ id: docRef.id }))
    .catch(err => res.status(500).send(err))
}

// updateProduct

// deleteProduct

