const mongoose = require("mongoose");
const moment = require("moment");

const buildDB = require("../../../database/data/test/index");
const { getFirstUnpaidInstallment } = require("../../../helpers/payments");

// get query
const { createInstallments } = require("../../../database/queries/payments");

// get models
const User = require("../../../database/models/User");
const Booking = require("../../../database/models/Booking");

describe("Tests for createInstallments queries", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });

  test("Test createInstallments array", async (done) => {
    const [intern] = await User.find({ role: "intern" });
    const [host] = await User.find({ role: "host" });
    const [booking] = await Booking.find({ status: "confirmed" });

    const installments = [
      { key: 1, amount: 100, dueDate: "2019-09-02T16:54:11.391Z" },
      { key: 2, amount: 99, dueDate: "2019-09-12T16:54:11.391Z" },
      { key: 3, amount: 100, dueDate: "2019-09-24T16:54:11.391Z" },
    ];

    const response = await createInstallments(installments, booking._id, intern._id, host._id);
    const { amount, dueDate } = getFirstUnpaidInstallment(response);

    expect(response).toBeDefined();
    expect(response).toHaveLength(3);
    expect(amount).toBe(100);
    expect(moment(dueDate).isSame(installments[0].dueDate)).toBe(true);
    done();
  });

  test("Test createInstallments object", async (done) => {
    const [intern] = await User.find({ role: "intern" });
    const [host] = await User.find({ role: "host" });
    const [booking] = await Booking.find({ status: "confirmed" });

    const installments = { key: 1, amount: 100, dueDate: "2019-09-02T16:54:11.391Z" };

    const response = await createInstallments(installments, booking._id, intern._id, host._id);
    const { amount, dueDate } = getFirstUnpaidInstallment(response);

    expect(response).toBeDefined();
    expect(response).toHaveLength(1);
    expect(amount).toBe(100);
    expect(moment(dueDate).isSame(installments.dueDate)).toBe(true);
    done();
  });
});
