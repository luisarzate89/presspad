const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.stripeSK);
const boom = require("boom");

const { getBookingById } = require("../../database/queries/bookings");
const { getCoupons } = require("../../database/queries/coupon");

const generatePaymentResponse = require("./generatePaymentResponse");
const internTransaction = require("./internTransaction");

const { schedulePaymentReminders } = require("./../../services/mailing");

const {
  getDiscountDays, calculatePrice,
  createInstallments, compareInstallments, getFirstUnpaidInstallment,
} = require("../../helpers/payments");

const internPayment = async (req, res, next) => {
  const {
    paymentMethod, paymentIntent, paymentInfo, couponInfo, bookingId,
  } = req.body;

  try {
    const [booking] = await getBookingById(bookingId, "intern");
    // check for Authorization
    if (!req.user) return next(boom.forbidden("req.user undefined"));
    if (req.user.role !== "intern") return next(boom.forbidden("user is not an Intern"));
    if (req.user._id.toString() !== booking.intern.toString()) return next(boom.forbidden("user didn't match booking.internId"));

    // check if the booking is confirmed
    if (booking.status !== "confirmed") return next(boom.badData("booking is not confirmed"));

    let amount;
    let couponDiscount = 0;
    let couponDiscountDays = 0;
    let couponOrganisationAccount;
    let couponId;

    // User ask to create new installments
    if (Array.isArray(paymentInfo) || !paymentInfo._id) {
    // check for old installments
      if (booking.installments[0]) return next(boom.badData("booking already have installments"));

      // Coupon used
      if (couponInfo.couponCode) {
        const [coupon] = await getCoupons({ code: couponInfo.couponCode }).exec();

        // get coupon discount days that maches the booking dates
        const { discountDays } = getDiscountDays({
          bookingStart: booking.startDate,
          bookingEnd: booking.endDate,
          couponStart: coupon.startDate,
          couponEnd: coupon.endDate,
          usedDays: coupon.usedDays,
        });

        // Validate discount days
        if (discountDays !== couponInfo.discountDays) return next(boom.badData("wrong coupon Info"));

        // Calculate coupon discount amount
        couponDiscount = calculatePrice(discountDays) * coupon.discountRate / 100;

        // Validate discount amount
        if (couponDiscount !== couponInfo.couponDiscount) return next(boom.badData("wrong coupon Info"));

        couponDiscountDays = discountDays;
        couponOrganisationAccount = coupon.organisationAccount;
        couponId = coupon._id;
      }

      // calculate net booking price
      const netPrice = booking.price - couponDiscount;

      // calculate installments and compare them
      let newInstallments;
      // if 3 installments
      if (Array.isArray(paymentInfo)) {
        newInstallments = createInstallments(netPrice, booking.startDate, booking.endDate, false);
        // eslint-disable-next-line prefer-destructuring
        amount = newInstallments[0].amount;
      } else {
        // if paying upfront
        newInstallments = createInstallments(netPrice, booking.startDate, booking.endDate, true);
        // eslint-disable-next-line prefer-destructuring
        amount = newInstallments.amount;
      }

      if (!compareInstallments(paymentInfo, newInstallments)) return next(boom.badData("wrong installments info"));
    } else {
      // old installment
      const firstUnpaidInstallment = getFirstUnpaidInstallment(booking.installments);

      // eslint-disable-next-line prefer-destructuring
      amount = firstUnpaidInstallment.amount;

      if (paymentInfo._id.toString() !== firstUnpaidInstallment._id.toString()) return next(boom.badData("bad installment info"));
      if (paymentInfo.amount !== firstUnpaidInstallment.amount) return next(boom.badData("bad amount info"));
    }

    // start a mongodb session
    const session = await mongoose.startSession();
    // start transaction
    await session.startTransaction();

    // do all db transaction before confirming stripe payment
    const stripeInfo = paymentMethod || paymentIntent;
    const coupon = {
      couponDiscount, couponDiscountDays, couponOrganisationAccount, couponId,
    };
    try {
      let _schedulePaymentReminders = Promise.resolve();
      if (Array.isArray(paymentInfo) || !paymentInfo._id) {
        // create payments reminders
        _schedulePaymentReminders = schedulePaymentReminders({
          bookingId,
          endDate: booking.endDate,
          internId: booking.intern,
          session,
        });
      }
      // do all transaction queries
      await Promise.all([
        internTransaction(session, paymentInfo, booking, stripeInfo, amount, coupon),
        _schedulePaymentReminders,
      ]);

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

module.exports = internPayment;
