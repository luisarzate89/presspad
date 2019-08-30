const mongoose = require("mongoose");
const Coupon = require("../../models/Coupon");

const Account = require("../../models/Account");

const createCoupon = async ({
  organisationAccount,
  organisation,
  internName,
  createdBy,
  discountRate,
  days,
  startDate,
  endDate,
  amount,
  usedDays,
  intern,
}) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const [createdCoupon] = await Coupon.create([{
      organisationAccount,
      organisation,
      internName,
      createdBy,
      discountRate,
      days,
      startDate,
      endDate,
      usedDays,
      intern,
    }], { session });
    await Account.updateOne({
      _id: mongoose.Types.ObjectId(organisationAccount),
    }, {
      $inc: {
        currentBalance: -1 * amount,
        couponsValue: amount,
      },
    });
    await session.commitTransaction();
    await session.endSession();

    return createdCoupon;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = createCoupon;
