const { connectDb } = require("./db")

exports.getCustomers = async (req, res) => {
  const db = connectDb()
  const { page, num } = req.query
  const queryLimit = num || 20
  db.collection('customers').get()
    .then(collection => collection.size)
    .then(numCustomers => {
      let query = db.collection('customers').orderBy('created_at','desc')
      if(page > 1) {
        query = query.offset(20 * (page - 1))
      }
      query = query.limit(queryLimit)
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
            page: page || 1,
            totalPage: Math.ceil(numCustomers / queryLimit),
          })
        })
    })
    .catch(err => res.status(500).send(err))
}
