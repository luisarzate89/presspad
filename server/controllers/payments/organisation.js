// const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.stripeSK);
const boom = require("boom");

const generatePaymentResponse = require("./generatePaymentResponse");
// const internTransaction = require("./internTransaction");

const orgPayment = async (req, res, next) => {
  const { paymentMethod, paymentIntent } = req.body;
  const amount = 9;

  // check for Authorization
  if (!req.user) return next(boom.forbidden("req.user undefined"));
  if (req.user.role !== "organisation") return next(boom.forbidden("user is not an organisation"));
  // if (req.user._id.toString() !== bookingInfo.internId) return next(boom.forbidden("user didn't match booking.internId"));

  // confirm stripe payments
  let intent; // to store the stripe info respone then check if it require 3d secure
  if (paymentMethod) {
    intent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      currency: "gbp",
      confirmation_method: "manual",
      confirm: true,
    });
  } else if (paymentIntent) {
    intent = await stripe.paymentIntents.confirm(paymentIntent.id);
  } else {
    throw new Error("no payment object from the client");
  }

  return res.json(generatePaymentResponse(intent));
};

module.exports = orgPayment;
