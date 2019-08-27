const mongoose = require("mongoose");

const User = require("../../../database/models/User");
const Booking = require("../../../database/models/Booking");
const InternalTransaction = require("../../../database/models/InternalTransaction");
const Coupon = require("../../../database/models/Coupon");
const buildDB = require("../../../database/data/test");

describe("Test Coupon schema", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("Coupon schema should be defined", async () => {
    expect(Booking).toBeDefined();
  });

  test("should store Coupon schema correctly", async (done) => {
    const coupons = await Coupon.find();
    expect(coupons).toHaveLength(2);
    done();
  });

  test("should store a new Coupon correctly", async (done) => {
    const organisationsAdmin = await User.find({ role: "organisation" });
    const booking = await Booking.findOne();
    const internalTransaction = await InternalTransaction.findOne(
      { user: organisationsAdmin._id },
    );

    const coupon = {
      organisation: organisationsAdmin.organisation,
      organisationAccount: organisationsAdmin.account,
      intern: booking.intern,
      internName: "InternName",
      createdBy: organisationsAdmin._id,
      discountRate: 50,
      days: 10,
      usedDays: 5,
      startDate: Date.now() + 5 * 24 * 60 * 60 * 1000, // after 5 days from now
      endDate: Date.now() + 25 * 24 * 60 * 60 * 1000, // after 25 days from now
      transactions: [{
        usedDays: 5,
        booking: booking._id,
        transaction: internalTransaction,
      }],
    };

    const storedCoupon = await Coupon.create(coupon);
    const newCoupons = await Coupon.find();

    expect(newCoupons).toHaveLength(2 + 1);
    expect(storedCoupon).toBeDefined();
    expect(storedCoupon.intern).toBe(booking.intern);
    expect(storedCoupon.transactions).toHaveLength(1);
    // mongodb ID
    expect(storedCoupon.transactions[0]._id).toBeDefined();
    done();
  });
});
