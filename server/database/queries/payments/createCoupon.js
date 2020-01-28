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
      reservedAmount: amount,
    }], { session });

    const updatedOrgAccount = await Account.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(organisationAccount),
    }, {
      $inc: {
        currentBalance: -1 * amount,
        couponsValue: amount,
      },
    },
    // options
    {
      session,
      new: true,
      useFindAndModify: false,
    });

    // check if the org account has positive balance
    if (updatedOrgAccount.currentBalance < 0) {
      throw new Error("No Enough money!");
    }

    await session.commitTransaction();
    session.endSession();

    return createdCoupon;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = createCoupon;
