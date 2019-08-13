const mongoose = require("mongoose");

const Installment = require("../../../database/models/Installment");
const InternalTransaction = require("../../../database/models/InternalTransaction");
const Booking = require("../../../database/models/Booking");
const buildDB = require("../../../database/data/test");

describe("Test Installment schema", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("Installment schema should be defined", async () => {
    expect(Installment).toBeDefined();
  });

  test("should store Installment schema correctly", async (done) => {
    const installments = await Installment.find();
    expect(installments).toHaveLength(4);
    done();
  });

  test("should store a new Installment correctly", async (done) => {
    const bookings = await Booking.find();
    const internalTransaction = await InternalTransaction.findOne({ user: bookings[0].intern });

    const newInstallment = {
      booking: bookings[1]._id,
      intern: bookings[1].intern,
      host: bookings[1].host,
      amount: 400,
      dueDate: Date.now() + 12 * 24 * 60 * 60 * 1000,
      transactions: internalTransaction._id,
    };

    const storednewInstallment = await Installment.create(newInstallment);
    expect(storednewInstallment).toBeDefined();
    expect(storednewInstallment.intern).toBe(bookings[1].intern);
    done();
  });
});
