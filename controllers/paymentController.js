const sha256 = require('js-sha256')
const jwt = require('jwt-then')
const Payment = require('../models/Payment')
const Razorpay = require('razorpay')

var instance = new Razorpay({
  key_id: 'rzp_test_QaTqBDlFm9Jso6',
  key_secret: '3drUoQENogIrtZdEDA8A9Pmm',
});

exports.create = async (req, res) => {
  //console.log("create order id request",req.body)
  const { amount } = req.body
  const order = await instance.orders.create({
    amount: amount,
    currency: "INR",
    receipt: `re1`,
  });
  //   var options = {
  //     amount: 50000,  // amount in the smallest currency unit
  //     currency: "INR",
  //     receipt: "rcpt1"
  //   };
  //   var orderresp 
  //  var neworder = instance.orders.create(options, function(err, order) {
  //     orderresp = order
  //     console.log(orderresp);
  //   });
  //console.log(order.id)
  res.json({ orderId: order.id });
}

exports.verify = async (req, res) => {
  const { razorpay_payment_id, razorpay_signature, order_id } = req.body

  //console.log(order_id,'sign',razorpay_signature)
  let body = order_id + "|" + razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', '3drUoQENogIrtZdEDA8A9Pmm')
    .update(body.toString())
    .digest('hex');
  //console.log("sig received " ,razorpay_signature);
  //console.log("sig generated " ,expectedSignature);
  var response = { "signatureIsValid": "false" }
  if (expectedSignature === razorpay_signature)
    response = { "signatureIsValid": "true" }
  res.send(response);
}
