const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test/index");

// get query
const { updateCouponTransaction } = require("../../../database/queries/payments");

// get models
const User = require("../../../database/models/User");
const InternalTransaction = require("../../../database/models/InternalTransaction");
const Booking = require("../../../database/models/Booking");
const Coupon = require("../../../database/models/Coupon");

describe("Tests for updateCouponTransaction queries", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });

  test("Test updateCouponTransaction", async (done) => {
    const [booking] = await Booking.find({ payedAmount: 0 });

    const { host: hostId, intern: internId } = booking;
    const [intern] = await User.find({ _id: internId });
    const [host] = await User.find({ _id: hostId });
    const [coupon] = await Coupon.find({ usedDays: 5 });

    const amount = coupon.discountRate * 5 * 20;
    const internalTransaction = await InternalTransaction.create({
      user: intern._id,
      from: coupon.organisationAccount,
      to: host.account,
      amount,
      type: "couponTransaction",
    });

    const result = await updateCouponTransaction(
      intern._id, coupon._id, internalTransaction._id, booking._id, 5, amount,
    );

    const [updatedCoupon] = await Coupon.find({ _id: coupon._id });
    const [updatedUser] = await User.find({ _id: intern._id });

    expect(result).toBeDefined();
    expect(updatedCoupon.usedDays).toBe(10);
    // check transactions udedDays
    expect(updatedCoupon.transactions)
      .toEqual(expect.arrayContaining([expect.objectContaining(
        { usedDays: 5 },
      )]));
    // check transaction Id
    expect(updatedCoupon.transactions)
      .toEqual(expect.arrayContaining([expect.objectContaining(
        { transaction: internalTransaction._id },
      )]));
    expect(updatedCoupon.intern.toString()).toBe(intern._id.toString());
    expect(updatedUser.organisation.toString()).toBe(coupon.organisation.toString());
    done();
  });
});
