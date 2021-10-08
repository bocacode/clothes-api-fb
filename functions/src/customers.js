const { connectDb } = require("./db")

exports.getCustomers = (req, res) => {
  const db = connectDb()
  const { page, num } = req.query
  let query = db.collection('customers').orderBy('created_at','desc')
  if(page > 1) {
    query = query.offset(20 * (page - 1))
  }
  query = (num) ? query.limit(num) : query.limit(20)
  query.get()
    .then(collection => {
      const customers = collection.docs.map(doc => {
        let customer = doc.data()
        customer.id = doc.id
        return customer
      })
      res.send({
        data: customers,
        records: customers.length,
        page: 1,
      })
    })
    .catch(err => res.status(500).send(err))
}
