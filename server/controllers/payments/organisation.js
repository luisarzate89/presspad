const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.stripeSK);
const boom = require("boom");

const { getUserById } = require("../../database/queries/user");
const generatePaymentResponse = require("./generatePaymentResponse");

const { createExternalTransaction } = require("../../database/queries/payments");

const orgPayment = async (req, res, next) => {
  const {
    paymentMethod, paymentIntent, amount, account,
  } = req.body;

  try {
    const { account: orgAccount } = await getUserById(req.user._id, true);

    // check for Authorization
    if (!req.user) return next(boom.forbidden("req.user undefined"));
    if (req.user.role !== "organisation") return next(boom.forbidden("user is not an organisation"));
    if (orgAccount.toString() !== account._id) return next(boom.forbidden("user account is not a match"));

    // start a mongodb session
    const session = await mongoose.startSession();
    // start transaction
    session.startTransaction();

    try {
      // do all transaction queries
      const stripeInfo = paymentMethod || paymentIntent;
      await createExternalTransaction(req.user._id, orgAccount, amount, stripeInfo, "deposite", session);

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
        throw boom.badData("no payment object from the client");
      }
      const response = await generatePaymentResponse(intent);

      // check if payment confirmed then commit transaction
      if (response.success) {
        await session.commitTransaction();
        await session.endSession();
      } else {
        await session.abortTransaction();
        await session.endSession();
      }
      return res.json(response);
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  } catch (error) {
    if (error.statusCode === 402) {
      return next(boom.paymentRequired(error.message));
    }
    return next(boom.badImplementation(error));
  }
};

module.exports = orgPayment;
