import Stripe from "stripe"

const secretKey = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(secretKey, { apiVersion: "2020-08-27" })

exports.handler = (event, context, callback) => {
  // POSTメソッド以外は拒否
  if (event.httpMethod !== "POST") {
    return callback(null, { statusCode: 405, body: "Method Not Allowed" })
  }

  const data = JSON.parse(event.body)

  if (!data.token || parseInt(data.amount) < 1) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Some required fields were not supplied."
      })
    })
  }

  stripe.charges
  .create({
    amount: parseInt(data.amount),
    currency: "jpy",
    description: "Sample Shop",
    source: data.token
  })
  .then(({ status }) => {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ status })
    })
  })
  .catch(err => {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error: ${err.message}`
      })
    })
  })
}
