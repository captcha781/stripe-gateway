const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(
  "sk_test_51Lx3z7SHTl9j1RT533oL7dxKypdXJZlrIjs91GGoWmnNsiM3tw2kGa6QRqo0qvRTuwKSqjR0gVW2J6MyLy1ukOs3001MPYF8j6"
);

exports.register = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = new User({ email, password });

    await data.save();

    return res.json({ success: true, message: "Account created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.login = expressAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });
    if (userData.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
    return res.json({
      success: true,
      message: "Successfully logged in...",
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.info = expressAsyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ auth: false, userId: "", user: {} });
    }

    const id = req.user._id;
    const user = await User.findById(id);

    return res.json({ auth: true, userId: id, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.getPaymentIntent = expressAsyncHandler(async (req, res) => {
  try {
    let { deposit } = req.body;
    deposit = parseInt(deposit) * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: deposit,
      currency: "inr",
    //   automatic_payment_methods: {
    //     enabled: true,
    //   },
      payment_method_types: ['card'],
    });

    return res.json({clientSecret: paymentIntent.client_secret})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.confirmPayment = expressAsyncHandler(async (req, res) => {
    try {
        let clientSecret = req.body.clientSecret
        let intent = await stripe.paymentIntents.retrieve(clientSecret)
        console.log(intent);
        if(intent.status === 'succeeded') {
          let user = await User.findById(req.user._id)
          user.accountBalance = parseInt(user.accountBalance) + (parseInt(intent.amount)/100)
          await user.save()
          return res.json({success: true, message: 'Payment Successful'})
        } else {
          return res.json({success: false, message: 'Payment Not Successful'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }
})
