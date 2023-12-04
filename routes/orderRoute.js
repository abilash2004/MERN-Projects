const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51OI95ZSJL0R5tmmfXuU563vlC6ozEEm49rw4UWue3qVXEBqokFG6b9dExBqyUVVlTd6YOpG9dyoShFEJP01qjsIa00GZis907H');
const Order = require('../models/orderModel');

router.post('/placeorer', async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: subtotal * 100, // Amount in cents
        currency: 'INR',
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip
        },
        transactionId: payment.id,
      });

      await newOrder.save();

      res.json({ message: 'Order placed successfully' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});




router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 })
    res.send(orders)
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
});

router.get("/getallorders", async (req, res) => {

  try {
    const orders = await Order.find({})
    res.send(orders)
  } catch (error) {
    return res.status(400).json({ message: error });
  }

});

router.post("/deliverorder", async (req, res) => {

  const orderid = req.body.orderid
  try {
    const order = await Order.findOne({ _id: orderid })
    order.isDelivered = true
    await order.save()
    res.send('Order Delivered Successfully')
  } catch (error) {

    return res.status(500).json({ message: error });

  }

});



module.exports = router